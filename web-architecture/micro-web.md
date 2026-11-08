# 微前端架构 <Badge type="warning" text="doing" />

- 微前端是一种多个团队通过独立维护和部署项目的方式，聚合到一起 共同构建一个 web 应用的技术方法和策略。

## 为什么需要？

- 因为可以将巨石应用的某个模块，分出来让其他团队独立维护和部署，避免了巨石应用，迭代非常慢，功能之间互相影响，互相连累阻塞的问题。

## 怎么实现？

## 乾坤 qiankun

- 基于 single-spa 的微前端方案

### 特点

- html entry 相比 js entry 极大降低了子应用改造成本
- 完备的 js, css 沙箱隔离。js 沙箱通过 snapshot、proxy 等隔离，css 沙箱通过 strictStyle、等进行隔离。

## 无界 wujie

- 基于 WebComponent 容器 + iframe 


## qiankun 和 wujie的坑具体例子

| 框架 | 坑的类型 | 典型案例 | 复现路径 |
|---|---|---|---|
| **wujie** | shadowDOM 弹窗定位 | el-select/tooltip/date-picker 位置错位 | popper.js 2.0 递归到 `window.visualViewport`，shadowRoot 上没有 |
| **wujie** | 跨 realm instanceof 失效 | wangEditor 无法编辑、第三方库判断 `instanceof MouseEvent` 恒 false | JS 在 iframe realm，DOM 在主应用 realm，构造函数是两套 |
| **wujie** | 事件 retargeting | 异步回调里 `e.target` 变成 wujie-app 容器 | shadowDOM 事件冒泡后 host 替换 target |
| **wujie** | 第三方包全局变量丢失 | `var xxx` 定义的变量无法挂到 window 上，其他脚本拿不到 | wujie 把脚本包在闭包里执行，顶层 var 留在闭包作用域 |
| **wujie** | 字体丢失 | iconfont、自定义 @font-face 不生效 | shadow 内部不加载 @font-face |
| **qiankun** | 快照沙箱逃逸 | 子应用 `eval("window.foo = 'leaked'")` 后主应用 window.foo 立即可见 | 快照沙箱只 diff 顶层属性增删，无法拦截 eval/with 的作用域逃逸 |
| **qiankun** | 闭包持有原始 window | 子应用卸载后 `setInterval(() => window.xxx)` 还在跑，污染主应用 | Proxy 拦截不到闭包里已捕获的原生 window 引用 |
| **qiankun** | 原型链污染 | 子应用改 `Object.prototype.toString` 影响所有应用 | 快照不追踪原型链变更 |
| **qiankun** | 多实例路由穿透 | 隐藏的子应用还响应 popstate，React Router basename 不匹配重新渲染丢状态 | `document.defaultView` 拿到的 window 绕过了 Proxy（document 未被代理） |
| **qiankun** | publicPath 404 | 动态 import 的 JS/CSS、字体、图片在主应用域名下 404 | 子应用构建时 publicPath 是 `/`，被主应用加载后相对路径指向主应用域名 |
| **qiankun** | live publicPath 失效 | webpack 5 的 `publicPath: "auto"` 运行时定位不准 | qiankun 把 script 转成 fetch 加载，破坏了浏览器对 script src 的路径解析 |
| **qiankun** | 样式泄漏 | 子应用切换后主应用样式被污染 | CSS 以 `<style>` 形式直接插入主文档 head，卸载时若漏删就残留 |
**两类坑的根本差异**：wujie 的坑源于"隔离得太彻底"——JS 和 DOM 被人为拆到两个 realm，所有依赖 `instanceof`、`getSelection`、`e.target`、DOM 归属判断的代码都可能翻车，本质是**浏览器标准行为在跨 realm 场景的副作用**；qiankun 的坑源于"隔离得不彻底"——Proxy 沙箱只能拦截显式的 `window.xxx` 读写，对 eval、闭包、原型链、document 引用、`new Function` 这类"隐式越界通道"无能为力，本质是**模拟沙箱的边界天然不完备**。wujie 的官方文档里这些问题都是"已知限制 + 给 workaround"，qiankun 的官方 FAQ 里这些也是"已知场景 + 给配置方案"，两边都没有银弹，只是坑的方向完全不同。


## micro-app

## single-spa

## webpack5 模块联邦

## EMP - 基于 模块联邦
