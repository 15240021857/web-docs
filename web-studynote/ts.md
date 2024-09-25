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

- ts 文件中，第三方库没有 d.ts，是会报错的。axios 自带 d.ts，但 express 需要手动安装@types/express,才有类型提示，才会不报错
- ts 必须要有声明文件，否则报错，这也是 ts 没大面积流行的原因 ？？？现在没有报错了？？？

### 手写.d.ts

```ts
// 可以手写express.d.ts
declare module express {
  interface App {
    use(path: string, router: any): void;
    listen(port: number, cb?: () => void): void;
  }
  interface Router {
    get(path: string, cb: (req: any, res: any) => void): void;
  }
  interface Express {
    (): App;
    Router(): Router;
  }
  const express: Express;
  export default express;
}

declare var a: number;

declare function cb(param: string) {};
declare class Vue {}
declare enum C {
  a = 1,
}
declare namespace IOS {}
```

## mixin 混入

- 合并多个对象的属性,可利用 interface

```ts
interface A {
  name: string;
}
interface B {
  age: number;
}

let a: A = { name: "xiaowu" };
let b: B = { age: 17 };
let c = { ...A, ...B }; // c类型 {name: string, age: number}
let d = Object.assign({}, A, B); // d类型 A&B
```

- ？？？？？？？？

## Decorator 装饰器

## Set, Map, WeakSet, WeakMap

### Set

- Set 具有唯一性，引用类型除外
- Set 有迭代器，所以可使用遍历方法 keys、valueentries、for-of、forEach 等
- Set 方法有 add/delete/has/size/clear 集合大小
- Set 和 Array 区别
  - set 的值不重复，arr 可重复
  - set 的值无序，arr 有序
  - set 不可索引取值， arr 可以

```ts
const mySet: Set<number> = [1, 2, 3, 3, 3, 3, 4, 5];
console.log(mySet); // 1,2,3,4,5
mySet.size(); // 5
const arr = Array.from(mySet); // [1,2,3,4,5]
```

## Map

- Map 是键值对存储，有序排列，而 object 无序
- key 可以是引用类型，而 object 的 key 不可以
- 有迭代器，可调迭代器方法
- 自带方法：set, get, delete,has,clear

```ts
const obj = { name: "xiaowu" };
const myMap: Map<object, string> = new Map();
myMap.set(obj, "值");
myMap.get(obj); // 值
```

## WeakSet

- 值只能是引用类型，当该对象不被其他引用时，该对象将被垃圾回收
- WeakSet 不支持遍历，因为 GC 垃圾回收不稳定。
- 方法有：add, delete, has

## WeakMap

- 键 key 只能是引用类型
- 弱引用，当对象引用次数为 0 时，键值对会被垃圾回收。
- WeakMap 不支持迭代，因为 GC 回收不稳定，所以 WeakMap 值不稳定
- 方法有：get, set, delete, has

```ts
let obj = { name: "xiaowu" }; // 1次
let obj2 = obj; // 2次
const myWeakmap = new WeakMap();
myWeakmap.set(obj, 17);
obj = null; // -1次 = 1
obj2 = null; // -1次 = 0
setTimeout(() => {
  // 因为GC回收时间至少需要200ms, 但不稳定
  console.log(myWeakmap); // 有时有，有时没有[{ name: "xiaowu" }: 17]
  console.log(myWeakmap.get(obj)); //有时undefined, 有时17
}, 500);
```

## 类型守卫

## 协变、逆变、双向协变

### 协变

- 两对象赋值，ts 允许对象类型多的赋给少的，需要覆盖

```ts
interface A {
  name: string;
  age: number;
}
interface B {
  name: string;
  age: number;
  sex: number;
}
const a: A = {
  name: "xiaowu",
  age: 17,
};
const b: B = {
  name: "huazai",
  age: 17,
  sex: 0,
};
a = b; // 协变
```

### 逆变

- 两函数赋值，ts 允许形参类型少的赋给多的，最终执行参数少的函数

```ts
const funA = (param: A) => {};
const funB = (param: B) => {};
```

### 双向协变

- ts2.0 之前 支持不论类型是否覆盖都能赋值，ts2.0 之后，觉得这样不安全，增加了配置选项，默认关闭，也建议关闭双向协变。

## 实战例子

### Storage 存储有效期

- 解决 localStorage 无法设置有效期的问题，模仿 cookie 设置有效期
- 利用存储时的时间戳，与获取时的时间戳，比较得出是否过期
- 没过期就正常获取，过期就删除掉

```ts
// Storage构造器 类型
interface IStorage {
  set: () => void;
  get: () => void;
  remove: () => void;
  clear: () => void;
}
// 过期枚举类型
enum EnumExpire {
  permanent = "permanent", // 永久
  expire = "__expire__", // 有过期时间
}
// 存的数据格式 T是实际的数据类型
interface IValue<T> {
  data: T;
  [EnumExpire.expire]: EnumExpire.permanent | number; // 就相当于"__expire__: 永久或时间戳"
}
// 取时值的类型
interface IResult<T> {
  message: string;
  data: T;
}
// localStorage 模仿 cookie 设置有效期
class Storage implements IStorage {
  set<T>(key: string, value: T, expire: EnumExpire = EnumExpire.permanent) {
    localStorage.setItem(
      key,
      JSON.stringify({
        data: value,
        [EnumExpire.expire]: expire,
      })
    );
  }
  get<T>(key: string): IResult<T | null> {
    const value: IValue<T> = JSON.parse(localStorage.getItem(key));
    const { data } = value;
    const now = new Date().getTime();
    if (typeof value[EnumExpire.expire] === number && value[EnumExpire.expire] > now) {
      // 没过期
      return {
        message: "没过期",
        data,
      };
    } else if (value[EnumExpire.expire] === EnumExpire.permanent) {
      // 永久
      return {
        message: "永久",
        data,
      };
    } else {
      // 已过期
      this.remove(key);
      return {
        message: "已过期",
        data: null,
      };
    }
  }
  remove(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}

const storage = new Storage();
// 存data,有效期是1个小时
storage.set<string>("name", { data: "xiaowu", expire: new Date().getTime() + 1 * 60 * 60 * 1000 });
const data: string = storage.get<string>("name");
console.log("拿到存储值啦", data);
storage.remove("name");
storage.clear();
```
