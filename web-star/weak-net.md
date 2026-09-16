# 前端弱网断网处理方案

## 是什么
WebSocket 长连接、AI 流式输出、大文件上传​ 在弱网/断网场景下，用户操作，如物联网固件包升级重试、AI流式输出中断显示正在重连、大文件断网后点继续上传等。

## 解决什么问题
给用户所在弱网断/网环境兜底，即使出现异常，等到网络恢复，仍然能继续操作，如大文件已经传了95MB了，接着上传5MB就能完成，而不是再全量重新上传100MB。

## 方案设计原则
1. **状态可感知**
- online / offline
- 心跳检测
- 网络质量（RTT / 丢包）
2. **失败可恢复**
- 自动重连
- 指数退避
- 最大重试次数
3. **过程可续传**
- 上传：分片 + 断点续传
- 流式输出：缓存 + 重放 / 续传 cursor
4. **用户无感知 or 可控**
- 不频繁弹错误
- 显示“正在重连…”
5. **统一抽象**
- 把 WebSocket / SSE / Fetch 都封装成「可恢复通道」

## websocket 断线重连，弱网提示

### 原理
```text
setInterval（每 5s）:
  │
  ├── 发 ping
  ├── missedPongs++        ← 每发一次 +1
  │
  ▼
onmessage 收到 pong:
  ├── missedPongs = 0      ← 收到就归零 ✅
  ├── clearHeartbeatTimeout()
  │
  ▼
没收到 pong（超时）:
  ├── missedPongs >= 2 ?
  │     └── emit('weaknet')
  └── ws.close() → 触发 onclose → 重连
```
### 代码
```ts
class ReconnectWebSocket {
  private url: string
  private ws?: WebSocket

  private retryCount = 0
  private readonly maxRetry = 10
  private reconnecting = false

  private heartbeatTimer?: number
  private readonly heartbeatInterval = 5000

  constructor(url: string) {
    this.url = url
    this.connect()
  }

  /* ================= 连接 ================= */
  private connect() {
    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('✅ WebSocket connected')
      this.retryCount = 0
      this.startHeartbeat()
    }

    this.ws.onmessage = () => {
      // 收到任意消息，说明网络正常
      this.resetHeartbeat()
    }

    this.ws.onclose = (event) => {
      console.warn('⚠️ WebSocket closed', event.code)
      this.stopHeartbeat()

      // 正常关闭，不再重连
      if (event.code === 1000) return

      this.tryReconnect()
    }

    this.ws.onerror = () => {
      this.ws?.close()
    }
  }

  /* ================= 重连 ================= */
  private tryReconnect() {
    if (this.reconnecting) return
    if (this.retryCount >= this.maxRetry) {
      console.error('❌ Max retry reached')
      return
    }

    this.reconnecting = true
    this.retryCount++

    const delay = Math.min(1000 * 2 ** this.retryCount, 30000)

    console.log(`🔄 Reconnecting in ${delay}ms (${this.retryCount})`)

    setTimeout(() => {
      this.reconnecting = false
      this.connect()
    }, delay)
  }

  /* ================= 心跳 ================= */
  private startHeartbeat() {
    this.heartbeatTimer = window.setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send('ping')
      }
    }, this.heartbeatInterval)
  }

  private resetHeartbeat() {
    this.stopHeartbeat()
    this.startHeartbeat()
  }

  private stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer)
      this.heartbeatTimer = undefined
    }
  }

  /* ================= 主动关闭 ================= */
  public close() {
    this.stopHeartbeat()
    this.ws?.close(1000)
  }
}
```
<!-- 监听ws（自定义）事件 -->
```ts
const ws = new ReconnectWebSocket('wss://your.url')

ws.on('open',          () => console.log('连接成功'))
ws.on('offline',       (code) => console.log('断线，准备重连'))
ws.on('weaknet',       (missed) => console.log(`弱网，丢了 ${missed} 个心跳`))
ws.on('reconnecting',  (attempt, delay) => console.log(`第 ${attempt} 次重连，${delay}ms 后`))
ws.on('giveup',        (attempt) => console.log('放弃重连'))

// 组件卸载时一行清理
const off = ws.on('message', handleMsg)
off() // 或 ws.off('message', handleMsg)
```

## AI流式输出的断线重连，断点续传

一般有三种，SSE、Fetch + readStreamable、 websocket

### SSE + AI 流式，最干净的写法
优势：浏览器自动带当前流式索引 `last-event-id`，让后端处理支持续传

⚠️ 限制：
- 只能 GET
- 不适合复杂鉴权
- 断线后不能带业务状态

**前端**
```js
const es = new EventSource('/api/chat/stream?sessionId=xxx')

es.onmessage = (event) => {
  const msg = JSON.parse(event.data)
  // 追加到页面
  appendText(msg.content)
}

es.onerror = () => {
  // 浏览器会自动重连，带 Last-Event-ID
  showToast('连接断开，重连中...')
}
```

**服务端**
```js
app.get('/api/chat/stream', async (req, res) => {
  const sessionId = req.query.sessionId
  const lastId = req.headers['last-event-id']

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')

  // 从缓存或生成器取
  const generator = getOrCreateGenerator(sessionId)
  let index = lastId ? parseInt(lastId) : 0

  for await (const token of generator) {
    if (index >= generator.startIndex) {
      res.write(`id: ${index}\n`)
      res.write(`data: ${JSON.stringify({ content: token })}\n\n`)
    }
    index++
  }
})
```

### Fetch 断线重连要自己写

断了会进入`catch`进行重连, 但需自己维护`X-From-Index`给后端处理
```js
async function fetchStream(url: string, fromIndex: number) {
  const res = await fetch(url, {
    headers: {
      'X-From-Index': String(fromIndex), // 自己带断点
    },
  })

  const reader = res.body!.getReader()
  let index = fromIndex

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      const text = new TextDecoder().decode(value)
      index += text.length
      // ... 处理
    }
  } catch {
    // 断了 → 重连 → 带上 fromIndex
    setTimeout(() => fetchStream(url, index), 1000)
  }
}
```
### 大文件上传，断点续传
可参考 [大文件上传SDK封装](../web-star/bigfile-upload.md)
- 通过文件hash获取已上传分片，接着上传剩下的分片