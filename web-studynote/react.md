# react 笔记 <Badge type="warning" text="doing" />

## 是什么？一句话描述一下

react 是构建用户界面的 js 库，和 vue 一样。我们只需关注数据，专注业务代码，界面渲染交给 react。

## 解决什么问题？

跟 vue 相同，解决 js 和 jq 既要操作数据，又要操作 dom，导致的性能开销大，心智负担大的问题。

## 核心？

- 数据驱动视图
- 组件化开发
- 单向数据流
- 函数式编程?
- jsx
  - 在 js 中写 html 代码

## 跟 vue 的不同

## 参考资料

- 视频版：https://www.bilibili.com/video/BV1mcpPeMETt/?spm_id_from=333.999.0.0&vd_source=0a9cf58dffb3a15fec3f7d7d77eea1df
- 文字版：https://message163.github.io/react-docs/

## 发展和演变

## 开始学习！

## 先了解 babel

### babel 是什么？

- 是一个 js 编译器，将源代码转换成目标代码
- 过程 源代码 -> AST -> transform -> generate

### babel 解决什么问题？

- 因为 react 内部已做好 jsx 编译 ，编译原理跟 babel 类似

### babel 核心

- 语法转换：将新版本语法转为旧版本语法，如 es6 转 es5
- Polyfill: 通过加入额外代码，使旧版本浏览器支持 es6+ 新特性
- JSX: 将 jsx 语法编译成浏览器认识的普通 js 语法
- 插件：babel 自定义插件

### babel 核心包

- @babel/parser 将源代码解析成 AST
- @babel/traverse 接收 AST，进行转换
- @babel/generator 将转换后的 AST, 生成最终代码
- @babel/core babel 核心库，融合很多转换方法

## 再了解 SWC

### 是什么？

- 可以跟 babel 一样编译代码，也可以像 webpack 一样去打包代码

### 解决什么问题？

- 语法转换 es6->es5，polyfill 新特性支持
- SWC 支持简易打包，可单独使用，支持压缩、优化，将多个模块打包成一个 ==比较鸡肋，仅支持 cjs 模块化
- 天然支持 typescript
- 支持编译 React + JSX 语法
- 核心是快！SWC 比 babel 编译要快。
  - 快多少？单线程比 babel 快 20 倍，四核机器比 babel 快 70 倍
  - 为什么快？SWC 是 Rust 语言编写的，Rust 是编译型语言，直接转成机器码【CPU 底层指令】运行。而 js 需要通过 V8 解释成字节码 ，再通过 JIT 去优化编译，变成机器码等复杂流程，才能运行。

### 怎么用？

- @swc/core: 通过@swc/core
  - 通过文档，去调用 const code = swc.transformFileSync('xx.js', {...},target: 'es5')
- @swc/cli: 通过命令行 去调用
- swc-loader: 通过 webpack 的 loader 去调用
- 简易打包 了解即可 鸡肋
  - 暂仅支持 cjs, 不支持 esm

## 虚拟 DOM (Virtual DOM)

### 是什么？

- VDOM 是用 Js 对象去描述 DOM 结构，它不是直接操作浏览器 dom，而是将 dom 更新 首先在 VDOM 中进行，再高效的以最小的开销去渲染到真实 DOM。

### 解决什么问题？

1. 减少性能开销。直接操作 dom 是昂贵的，特别是大数据量 dom 更新，VDOM 通过 diff 算法去复用节点，以最小的开销去更新 dom。
2. 实现跨平台。VDOM 与平台无关，通过 VDOM 可生成其他平台的代码。如 RN 生成 android/ios 端代码，uniapp 生成小程序/h5/app 端的代码等等
