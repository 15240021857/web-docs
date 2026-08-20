# Electron

- 是什么？
  - 是做桌面端的跨平台应用的库
- 为什么？解决什么问题？
  - 用 web 技术去开发桌面端应用，如 vue, html, css, js
  - 跨平台，一套代码可打包运行在 windows, MacOs, Lincus

## 架构组成
- 主进程
  - 入口: main.js, app内唯一
  - 组成：nodejs完整运行时api + electron 主进程api(app, browserWindow, ipcMain等)
  - 职责：窗口管理，app事件处理，ipcMain通信，系统弹窗，托盘，菜单，调用子进程等
- 渲染进程(默认沙盒模式)
  - 入口：index.html （vue/react的入口文件）
  - 组成：html, css, js(dom/bom/webapi)等，不包含nodejs
  - 职责：渲染页面，用户交互，与主进程通信(ipcRenderer)

## 技术选型 Electron VS Tauri
- Electron
  - 组成：Chromium + Node.js + Electron API
  - 打包：捆绑完整Chromium + 完整Node.js运行api 安装包80M
  - 优势：Nodejs上手友好，跨平台，生态完善
  - 劣势：安装包体积大
- Tauri
  - 组成： rust + js(调用rust桥阶层的api)
  - 打包： 安装包 5-15M
  - 优势：跨平台，安装包体积小
  - 劣势：底层和桥阶层用rust写，上手难，另外生态还不完善
- 结论
  - 选择electron，因为跨平台，生态完善，上手友好,只是安装包体积大，还能接受。