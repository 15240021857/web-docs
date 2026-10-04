# AI 应用

> 学习实践中，敬请期待！

## SSE

- 优势：
  - 实时性高，能够实时推送数据给客户端
  - 断线重连
- 劣势：
  - 只能 GET，无法 POST传递token - 可自定义SSE
    - 解决：封装自定义SSE，MySSE 利用fetch readableStream 传递token
  - 不支持IE - 可自定义SSE
    - 解决：也是封装自定义SSE，后端不用动，仍然用SSE的header
