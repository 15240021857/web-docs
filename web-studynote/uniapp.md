# uniapp 笔记 <Badge type="warning" text="doing" />

## 是什么
- uniapp 是一个跨平台的移动应用开发框架，基于 vue 语法和组件库，支持在 H5、小程序、App(android, ios) 等平台上运行。

## 为什么创造 uniapp？为什么用 uniapp？
- 一套代码，多端运行，开发成本低，开发效率高。

## 有什么优点？能做什么？
- 优点：一套代码，多端运行，开发成本低，开发效率高。
- 能做什么：开发移动应用，如 H5、小程序、App(android, ios) 等。

## 有什么缺点？不能做什么？
- 缺点：
  1. 混合App,及App-vue 性能上不如原生应用丝滑。如动画，长列表等
  2. App-Uvue 可开发App原生应用，但现在可能生态还不够完善 
- 混合app-webview 不能做App复杂原生功能, 性能问题

## 跨端原理
- 编译时：uniapp 通过ast解析vue模板，完成标签，路由，配置的预处理，生成各端对应模板和配置，如wxml,wxss,pages.json等，业务js基本保持不变。
- 运行时：基于vue生成的VDOM做diff，再调用runtime-updater抹平各端api差异。如小程序的setData更新页面, H5/App-vue操作web dom, app-uvue映射渲染成原生控件。
