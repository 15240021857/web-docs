# 大文件上传 SDK 封装

## 是什么
项目中遇到大文件10M~1GB+的，传统上传，遇到断网弱网，重传大文件让人非常头疼，所以必须分片上传。
大文件分片上传核心功能包括：
- 分片
- 计算大文件哈希
- 并发上传
- 断点续传
- 秒传
- 分片合并
- 异常重试
- 进度计算
- 暂停/恢复
- 取消

## 为什么封装
SDK封装：分片上传代码几百行，不好复用和维护，需要封装！

## 怎么封装
架构设计：采用 SDK核心层 + useHooks逻辑层 + 组件调用层 三层分层架构
1. SDK核心层：内部封装大文件上传核心代码，对外提供 **上传，暂停/恢复，取消** 函数
    - 分片
    - 计算大文件哈希
    - 并发上传
    - 断点续传
    - 秒传
    - 分片合并
    - 异常重试
    - 暂停/恢复
    - 取消
2. useLargeFileUpload hooks逻辑层: 处理用户操作交互，维护响应式数据
    - 用户点击上传，创建SDK实例 监听进度、success、fail
    - 调用 instance.startUpload(file)
    - 点暂停，调用instance.pause()
    - 点恢复，调用instance.resume()
    - 点取消，调用instance.cancel()
3. UI组件层：
    - 负责UI展示，
    - 调用 useLargeFileUpload()，拿到响应式数据
    - 使用响应式数据，绑定事件

## 对外 SDK 设计
```js
const uploader = new Uploader({
    chunkSize: 5 * 1024 * 1024,
    concurrent: 3,
    retryNum: 2,
    onProgress,
    onSuccess,
    onFail
})

uploader.startUpload(file)
uploader.pause()
uploader.resume()
uploader.cancel()
```
## 代码实现
**Uploader.ts**
```ts
export interface UploaderOptions {
  chunkSize?: number
  concurrency?: number
  retries?: number
  onProgress?: (progress: number) => void
  onSuccess?: () => void
  onError?: (err: Error) => void
}

interface Chunk {
  index: number
  blob: Blob
  hash: string
}

export class Uploader {
  private chunkSize: number
  private concurrency: number
  private retries: number
  private onProgress?: (progress: number) => void
  private onSuccess?: () => void
  private onError?: (err: Error) => void

  private aborted = false
  private paused = false
  private uploadedCount = 0
  private chunks: Chunk[] = []

  constructor(options: UploaderOptions = {}) {
    this.chunkSize = options.chunkSize ?? 5 * 1024 * 1024
    this.concurrency = options.concurrency ?? 3
    this.retries = options.retries ?? 2
    this.onProgress = options.onProgress
    this.onSuccess = options.onSuccess
    this.onError = options.onError
  }

  async upload(file: File) {
    this.aborted = false
    this.paused = false
    this.uploadedCount = 0

    const fileHash = await this.computeFileHash(file)
    this.chunks = this.createChunks(file)

    await this.uploadChunks(fileHash)
    await this.mergeRequest(fileHash, file.name)

    this.onSuccess?.()
  }

  pause() {
    this.paused = true
  }

  resume() {
    this.paused = false
    this.uploadChunks('')
  }

  cancel() {
    this.aborted = true
  }

  private createChunks(file: File): Chunk[] {
    const chunks: Chunk[] = []
    let start = 0
    let index = 0

    while (start < file.size) {
      const blob = file.slice(start, start + this.chunkSize)
      chunks.push({
        index,
        blob,
        hash: `${index}`
      })
      start += this.chunkSize
      index++
    }

    return chunks
  }

  private async uploadChunks(fileHash: string) {
    return new Promise<void>((resolve, reject) => {
      let index = 0
      let active = 0

      const next = async () => {
        if (this.aborted) return reject(new Error('upload cancelled'))

        while (this.paused) {
          await new Promise(r => setTimeout(r, 200))
        }

        if (index >= this.chunks.length) {
          if (active === 0) resolve()
          return
        }

        const chunk = this.chunks[index++]
        active++

        let retry = 0
        const send = async () => {
          try {
            const formData = new FormData()
            formData.append('chunk', chunk.blob)
            formData.append('hash', chunk.hash)
            formData.append('fileHash', fileHash)

            await fetch('/api/upload/chunk', {
              method: 'POST',
              body: formData
            })

            this.uploadedCount++
            this.onProgress?.(
              Math.floor((this.uploadedCount / this.chunks.length) * 100)
            )

            active--
            next()
          } catch (err) {
            if (retry < this.retries) {
              retry++
              send()
            } else {
              reject(err)
            }
          }
        }

        send()
      }

      for (let i = 0; i < this.concurrency; i++) {
        next()
      }
    })
  }

  private async mergeRequest(fileHash: string, fileName: string) {
    await fetch('/api/upload/merge', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fileHash,
        fileName
      })
    })
  }

  private computeFileHash(file: File): Promise<string> {
    return new Promise(resolve => {
      // 实际项目用 spark-md5
      resolve(file.name + file.size)
    })
  }
}
```

**hooks/useUpload.ts**
```ts
import { ref } from 'vue'
import { Uploader } from './uploader'

export function useUpload() {
  const progress = ref(0)
  const uploading = ref(false)
  const error = ref<Error | null>(null)

  let uploader: Uploader | null = null

  const startUpload = (file: File) => {
    uploading.value = true
    error.value = null

    uploader = new Uploader({
      onProgress(p) {
        progress.value = p
      },
      onSuccess() {
        uploading.value = false
      },
      onError(err) {
        error.value = err
        uploading.value = false
      }
    })

    uploader.upload(file)
  }

  const pause = () => uploader?.pause()
  const resume = () => uploader?.resume()
  const cancel = () => uploader?.cancel()

  return {
    progress,
    uploading,
    error,
    startUpload,
    pause,
    resume,
    cancel
  }
}
```
**components/LargeFileUploader.vue**
```vue
<template>
  <input type="file" @change="onChange" />

  <button @click="startUpload(file!)" :disabled="uploading">
    上传
  </button>

  <button @click="pause">暂停</button>
  <button @click="resume">继续</button>

  <p>进度：{{ progress }}%</p>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUpload } from './useUpload'

const file = ref<File | null>(null)
const { progress, uploading, startUpload, pause, resume } = useUpload()

const onChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  if (target.files) {
    file.value = target.files[0]
  }
}
</script>
```
## 企业级项目还会补这些
✅ 秒传（hash 校验）
✅ 已上传分片查询
✅ 切片 hash（spark-md5）
✅ 错误分类（网络 / 服务端）
✅ 上传队列
✅ Web Worker 计算 hash
✅ 可取消请求（AbortController）

