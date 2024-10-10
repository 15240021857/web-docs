# 模块化

## 是什么

- js 模块化的落地。将 js 分成不同模块，通过互相引入，来互相配合实现功能，而不是把所有js写到一个文件里。

## 解决什么问题？

- 背景：js 越来越复杂，功能越来越多，一个 js 文件巨长，找东西困难，十分难维护。
- 将一个 js 根据不同功能模块分成若干 js 文件，互相引入即可解决问题
- 那么互相导入导出的规范是什么呢？请看下方：

## 怎么做？
### commonJs 模块规范 -> nodejs

- 导出：exports/module.exports
- 导入：require

### AMD -> requireJs

- 导出：define
- 导入：require

### CMD -> seaJs -> 国产

- 导出：define
- 导入：require 作为 define 的参数，可调用导入其他 js 模块

### UMD 规范 ->是 AMD 和 commonJs 的糅合

- 兼容 commonJs、AMD 规范

### ESM 规范

即 ES Module

- 导出：import
- 导入：export

特性

- 只能顶层引入
- 动态引入需用函数形式

```js
if (true) {
  import("A.js").then(res => {
    console.log("动态引入了A.js");
  });
}
```

```js
// A.js
export const a = 1
export const callPhone = () => {

}
export default const b = {
    name: 'xiaowu',
    age: 18
}
// index.js
import b, {a, callPhone} from 'A.js'
// 支持as别名，防止跟当前js变量重名
import b, {a as aAlias, callPhone} from 'A.js'
// 导入A.js所有暴露的模块
import * as allProps from 'A.js'

```

### node.js 的模块化规范

- 支持 common.js
- 新版本支持 ESM - 此处和浏览器达成统一
