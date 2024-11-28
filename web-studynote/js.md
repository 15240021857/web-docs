# Javascript <Badge type="warning" text="doing" />

## 是什么

- js 是网页的动作，就像人走路，手摆动，嘴微笑，眨眼睛，是让网页动起来。
- Javascript 简称 JS, 是动态脚步语言，是解释型的。支持基于原型编程，并且支持面向对象、声明式、函数式编程范式。也被用到了很多非浏览器环境中，如 node.js 后端、跨平台。

  - 解释型语言
    - V8 执行 js 过程：
      - js 代码 ->【解析器 parser】-> AST -> 【解释器 Ignition】 -> 字节码(边解释边执行) -> 机器码【底层 CPU 指令】-> 交给 CPU 执行
      - 这种运行时编译代码的技术称为 JIT(即时编译)，极大提高 js 执行性能

- 发展历史
  - 1995 年被开发出来，起初叫 LiveScript, 后来因为创造时受之启发，也想蹭 Java 热度改名 Javascript
  - 1997 年制定 ECMA 最初标准。
  - 2012 年所有浏览器都支持 ECMAScript5.1, 即 ES5. 旧版本浏览器至少支持 ES3
  - 2015 年 6 月 17 日，ECMA 国际组织正式发布了 ECMA2015, 即 ES6

## 解决什么问题？

- 在 js 创造出来之前，网页是静态的，只能看文章和新闻等，没有如轮播图、没有数据可视化，没有交互效果，发送请求会刷新页面，很不友好。
- 有了 js 之后，它可以让你的网页动起来。如根据 ajax 请求动态获取数据更新页面，地图交互，2D/3D 动画等。

## 组成

- ECMAScript, js 的基本语法和对象
  - ES6: https://www.runoob.com/w3cnote/es6-concise-tutorial.html
- DOM, 与文档交互的方法和接口
- BOM, 与浏览器交互的方法和接口

```text
js 字典：

- 1：https://www.runoob.com/jsref/jsref-obj-array.html
- 2：https://www.runoob.com/js/js-tutorial.html

es6 字典：https://www.runoob.com/w3cnote/es6-map-set.html
```

## 特性

### 堆、栈、指针

### 运行机制

### 单线程、异步

### 垃圾回收、内存泄漏

内存泄漏

- https://juejin.cn/post/7232127712642547770?searchId=202410281749094035F7A0BC6F470C61A6#heading-7
- https://juejin.cn/post/7260815743661899813
- https://juejin.cn/post/6914092198170460168

如何排查
如何解决

### this 指向

两种情况：

1. 不在函数中的 this，看环境，node 指向空对象{}，浏览器指向 window
2. 函数中的 this,每个 function 函数都有一个特殊变量 this,它在函数被调用时被创建

函数调用的四种方式

1. new 类名()创建实例时，this 指向实例
2. 函数作为对象属性时，this 指向该对象
3. call/apply/bind 调用函数时，this 指向传入的对象
4. 函数单独调用时，this 指向 window, 严格模式下，this 指向 undefined

```js
const a = {
  name: "xw",
  fun1() {
    console.log(this.name); // xw
  },
  fun2: () => {
    console.log(this); // 箭头函数没有自己的this，此处指向外部的window
    console.log(this.name); // undefined
  },
  fun3() {
    setTimeout(() => {
      console.log(this.name); // xw
    });
  },
  fun4() {
    setTimeout(function () {
      console.log(this); // function函数内部this指向window
      console.log(this.name); // undefined
    });
  },
};
```

## DOM

### 页面显示隐藏 visibilitychange

解决问题：当浏览器新增、切换标签页时触发 页面的显示、隐藏

```js
document.addEventListener("visibilitychange", function () {
  if (document.hidden) {
    // 当前标签页被切换到后台
    console.log("标签页被切换到后台");
  } else {
    // 当前标签页被切换到前台
    console.log("标签页被切换到前台");
  }
});
```

## BOM

## 设计模式

- 浅谈前端出现率高的设计模式
  - https://mp.weixin.qq.com/s/qWZBvTF_nEBX87B4b4Xn5w
  - 创建型：
    - 构造器模式：通过类实例化，去创造多个对象，而不是一个个去创建
    - 工厂模式：工厂类只关心根据业务创建哪个对象的实例，不关心类的实现，类的具体实现，交给子类。例如：工厂类中判断男员工就 new Man(), 女员工就 new Woman().
      - 优点：结构清晰，业务和对象内容解耦，好维护。
    - 单例模式：复用已创建的对象，而不是每次都创建新的。
  - 结构型：
    - 装饰器模式：通过装饰器类包裹对象实例，且不改动原对象内部方法，对其进行改造和装饰，从而增加一些功能。
    - 代理模式：通过代理类包裹对象实例，为实例做专门的事，例如，为 user 实例，判断 user 是否登录，若登录，则进行跳转首页等操作，若未登录，则跳回登录页。
    - 适配器模式：将不符合用户期望的接口，通过 Adapter 适配器函数或类包裹，在内部调用时改造，对外暴露符合用户期望的接口。
  - 行为型：
    - 观察者模式：当一个属性变化，会通知所有的观察着调用 update 函数。
    - 发布订阅模式：订阅者通过 eventCenter 订阅某个事件，当发布者触发某个事件，订阅者就会监听到，并调用函数。
    - 策略模式

### 发布订阅

### 观察者

### 单例

- 是什么？复用实例，减少消耗
- 解决什么问题？

### 工厂模式

### 装饰器模式

## es6

### 数组迭代方法

- for-of 和 foreach
  - https://blog.csdn.net/Ed7zgeE9X/article/details/140711380

## 函数式编程

### 函数柯里化

#### 是什么？

- 将多参函数转换成单参函数，通过多次调用的形式传入每个参数。
- 形如 fn(a,b,c) 转换成 fn(a)(b)(c)

#### 为什么？ 解决什么问题？

- 1.简化传参、复用函数
  - 判断类型的函数

```js
// 普通多参类型
const typeofTest = (type, val) => {
    return typeof val === type
}
typeofTest(null, null) // true
typeofTest(string, 'xiaowu') // true
----------------------------------------------------------
// 柯里化单参
const typeofTest2 = (type) => {
    return (val) => {
        return typeof val === type
    }
}
// 定义函数，复用typeofTest
const isNull = typeofTest2(null)
const isString = typeofTest2(string)
// 使用
isNull(null) // true
isNull(1) // false
isString('xiaowu') // true
```

## 多 Tab 页面数据同步

- 参考:https://mp.weixin.qq.com/s/HaerhlTwnEkudPgp7gENFw

### 是什么？

- 一个页面，在浏览器中打开多个 tab，需要数据同步时
- 如，localStorage、sessionStorage?如何在多 tab 间同步变化

### 解决什么问题？

- 场景：当你打开多个购物车结算页面，多个 tab 页如果需要同步商品数量和总价，就算要用到

### 怎么做？

- 轮询去查请求、查 storage 本地存储，性能差
- 监听 storage, 仅其他 tab 页监听，本页接收不到
- 自定义事件 Event, CustomEvent, createEvent()
- MessageChannel
- boardCastChannel
- ...

## js 去处理文件、二进制数据、数据转换

- 参考：https://mp.weixin.qq.com/s/MTce8DjP1jxQ7IqXp8PgpA
- file、FileReader、Blob、Arraybuffer, base64, Object URL 和 DataURL
