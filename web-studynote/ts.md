# ts 笔记 <Badge type="warning" text="doing" />

## 是什么

- 给 js 增加类型校验，是 js 的超集扩展。

## 为什么创造 ts？

- js 是弱类型语言，没有类型校验，类型不清晰，页面报错，甚至发布上线后才报错，很不安全。

## 参考资料

- 视频：https://www.bilibili.com/list/watchlater?oid=337697099&bvid=BV1wR4y1377K&spm_id_from=333.1007.top_right_bar_window_view_later.content.click&p=20

## 特性

## namespace 命名空间

- 定义一个作用域，防止变量污染全局，也可用来区分不同作用域，不互相影响

```ts
namespace h5 {
  // 命名空间定义的方法，还需暴露出去，才能用
  export const callPhone = (msg: string) => {
    console.log("h5打电话", msg);
  };
}
namespace android {
  const callPhone = (msg: string, num: number) => {
    console.log("安卓打电话", msg, num);
  };
  const scanCode = (code: number) => {
    console.log("扫码", code);
  };
  export { callPhone, scanCode };
}
namespace ios {}
namespace mini {}

// 使用
h5.callPhone("h5 命名空间的 callPhone");
android.scanCode("android 命名空间的 scanCode");
```

## 模块解析

### 是什么

- js 模块化的落地。将 js 分成不同模块，通过互相引入，来互相配合实现功能。

### 为什么

- 背景：js 越来越复杂，功能越来越多，一个 js 文件巨长，找东西困难，十分难维护。
- 将一个 js 根据不同功能模块分成若干 js 文件，互相引入即可解决问题
- 那么互相导入导出的规范是什么呢？请看下方：

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
  import("A.js").then((res) => {
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

## .d.ts 声明文件

## mixin 混入

- 合并多个对象的属性
- ？？？？？？？？

## Decorator 装饰器
