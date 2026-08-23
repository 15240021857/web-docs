# Javascript <Badge type="warning" text="doing" />

## 是什么

- Javascript 简称 JS, 是动态脚步语言，是解释型的。支持基于原型编程，并且支持面向对象、声明式、函数式编程范式。也被用到了很多非浏览器环境中，如 node.js 后端、跨平台。

  - **解释型语言**
    - V8 执行 js 过程：
      - js 代码 ->【解析器 parser】-> AST -> 【解释器 Ignition】 -> 字节码(边解释边执行) -> 机器码【底层 CPU 指令】-> 交给 CPU 执行
      - 这种运行时编译代码的技术称为 JIT(即时编译)，极大提高 js 执行性能
## 为什么是单线程？
1. 设计之初，不想因为多线程导致的复杂度增加。
2. 单线程可以避免线程避免 dom的竞态问题、死锁等。
   - 多个线程同时操作一个dom，会导致dom状态冲突，页面诡异bug
   - 死锁: 多线程直接互相等待对方资源，导致程序无法继续执行
## **发展历史**

- **1995**：—｜开发出来，起初叫 LiveScript，后改名 JavaScript
- **1997**：—｜制定 ECMA 最初标准
- **2012**：**ES5**｜所有浏览器支持 ECMAScript 5.1（ES5），旧浏览器至少支持 ES3
- **2015-06-17**：**ES6** (ES2015)｜let/const、箭头函数、模板字符串、解构、默认参数/rest/spread、Promise、class、ESM模块、Symbol、Map/Set/WeakMap/WeakSet、for...of、生成器、Proxy、Reflect
- **2016**：**ES7** (ES2016)｜includes、指数运算符 **
- **2017**：**ES8** (ES2017)｜async/await、Object.values/entries、padStart/padEnd
- **2018**：**ES9** (ES2018)｜异步迭代(for await...of)、对象 rest/spread、Promise.finally
- **2019**：**ES10** (ES2019)｜flat/flatMap、fromEntries、稳定排序
- **2020**：**ES11** (ES2020)｜?.、??、BigInt、动态 import、allSettled
- **2021**：**ES12** (ES2021)｜replaceAll、Promise.any、数字分隔符、逻辑赋值
- **2022**：**ES13** (ES2022)｜私有字段 #、顶层 await、at(-1)
- **2023**：**ES14** (ES2023)｜toSorted/toReversed、findLast
- **2024**：**ES15** (ES2024)｜groupBy、Promise.withResolvers、正则 /v
- **2025**：**ES16** (ES2025)｜Iterator helpers、Set 代数方法、Promise.try
- **2026**：**ES17** (ES2026, Stage 4)｜Array.fromAsync、Uint8Array 编解码

## 架构组成

- ECMAScript, js 的基本语法和对象
  - ES6: https://www.runoob.com/w3cnote/es6-concise-tutorial.html

```js
浏览器运行环境
│
├── ECMAScript（JS 语言核心）
│   ├── Promise / async / await
│   ├── Array / Object / Map
│   └── 语法 & 执行模型
│
└── Web API（浏览器标准能力全集）
    │
    ├── DOM API ⭐ 与文档交互
    │   ├── document / Element / Node
    │   ├── Event / EventTarget
    │   └── Range / Selection
    │
    ├── BOM API ⭐ 与浏览器交互
    │   ├── window / navigator
    │   ├── location / history / screen
    │   ├── timers（setTimeout / setInterval）
    │   └── matchMedia
    │
    ├── 存储 API
    │   ├── localStorage / sessionStorage
    │   ├── Cookies / IndexedDB
    │   ├── Cache API / OPFS
    │   └── File / FileReader
    │
    ├── 网络与通信
    │   ├── Fetch / XHR / Ajax
    │   ├── WebSocket / WebRTC
    │   └── Beacon / SSE
    │
    ├── 并发与性能
    │   ├── Web Worker
    │   ├── Service Worker
    │   └── WebAssembly
    │
    ├── 观测与调度 API
    │   ├── IntersectionObserver
    │   ├── ResizeObserver / MutationObserver
    │   ├── PerformanceObserver
    │   └── requestIdleCallback
    │
    ├── 渲染与动画调度 
    │   ├── requestAnimationFrame（帧同步）
    │   ├── cancelAnimationFrame
    │   ├── Web Animations API
    │   └── ScrollTimeline / ViewTimeline（新标准）
    │
    ├── 设备与系统能力
    │   ├── Bluetooth / USB
    │   ├── Geolocation / Sensors
    │   ├── Notification / Clipboard
    │   └── MediaDevices
    │
    ├── 文件与交互
    │   ├── Drag & Drop
    │   ├── Fullscreen
    │   └── Pointer / Touch
    │
    └── 图形 / 多媒体
        ├── Canvas / WebGL
        ├── Web Audio
        └── Media Stream
```

```text
js 字典：

- 1：https://www.runoob.com/jsref/jsref-obj-array.html
- 2：https://www.runoob.com/js/js-tutorial.html

es6 字典：https://www.runoob.com/w3cnote/es6-map-set.html
```

## 经典实用技术知识

### 事件循环
**背景**
因为js设计出来就是单线程，遇到串行等待任务会阻塞js主线程，所以需要事件循环来处理异步任务
- **是什么？**
  - js执行，先执行同步代码
  - 遇到异步任务，微任务放微任务队列，宏任务放宏任务队列
  - 同步代码清空
  - 清空微任务队列
  - 浏览器有空就去 渲染UI
  - 再执行下一个宏任务
  - 如此循环下去
- **简单总结**
  - 执行script代码(宏任务) > 同步代码清空 > 微队列清空 > 有空闲就渲染UI > 循环下去...
- **宏任务 & 微任务**
  - 宏任务：script, setTimeout/setInterval, dom回调，网络回调， I/O回调等
  - 微任务：Promise, async /await, MutationObserver，queueMicrotask等
  - UI渲染，RAF不属于这两个任务，它是浏览器的渲染任务
- **nodejs 事件循环**
  - 微任务优先级 process.nextTick > Promise.then (是每个阶段的清道夫)
  - nodejs 宏任务6个阶段：（不断轮询去执行，这样循环下去）
     - 1.times(setTimeout/setInterval) > 2.xx >3.xx > 4.poll(I/O回调) > 5.check(setImmediate) > 6. close callback

### 类型判断
- 基本类型Number, String, Boolean, Undefined, Symbol,  用typeof
- null 用 val === null判断，因为 typeof null = object
- 内置类型 用instanceof 或 Object.prototype.toString.call()，能判断很多类型，但不支持自定义class
- 自定义class 用instanceof， 如果没定义[Symbol.toStringTag]，Object.prototype.toString.call() 会返回 [object Object]
- isObject() 即非null 引用类型 val !== null && typeof val === 'object', 这里不包含纯对象{}
- isPlainObject 即纯{}或new Object()或自定义class Object.prototype.toString.call() 会返回 [object Object]
- 数组 Array.isArray()
- isPromise() vue内部用鸭子类型，isObject(val) && isFunction(val.then) && isFunction(val.catch)
  - isFunction(val) 用typeof val === 'function'
  - isObject(val) 用val !== null && typeof val === 'object'
- isRef, isReactive, isVNode js中难判断，在vue中会有类型标记，如__v_isRef, __v_isReactive, __v_isVNode

### es6+ Promise & async /await
- 讲的很清楚：https://blog.csdn.net/luo1831251387/article/details/115643059?spm=1001.2014.3001.5501
- 方法：
  - Promise.resolve(), Promise.reject(), Promise.catch(),   Promise.all(), Promise.race(), Promise.allSettled(), Promise.any()等
  - Promise.race() 竞争，第一个完成【无论resolve,reject】，就返回
  - Promise.any() 竞争，有一个成功，就返回；若没有成功的，所有失败，才返回
- async 函数 返回Promise
  - await 后面接Promise，会返回Promise的resolve成功值；
    - 若接其他值，会直接返回该值，例如'123'

### 闭包、事件委托

### 上传，大文件上传及预览
- 前端
  1. 先算文件大小，小文件<50MB 直传，大文件>50MB用分片上传
  2. 先算出文件的md5/sha256值，是文件唯一标识，用于文件校验，重命名，秒传等
  3. 后端判断md5值是否存在，若文件已存在，则直接返回文件路径，实现秒传
  4. 若存在分片，则返回分片列表，前端根据分片列表，去分片上传，或断点续传
  5. 分片上传完毕，调用合并分片接口，完成后返回文件路径


### 虚拟滚动


### 浅拷贝，深拷贝和循环引用
- 浅拷贝：
  - 基本类型：直接赋值
  - 引用类型：赋值的是引用地址，不是引用本身
- 深拷贝：
  - 基本类型：直接赋值
  - 引用类型：递归赋值
    - 递归赋值，将源对象的所有属性，包括引用类型的属性，都赋值给新对象
    - 注意：递归赋值遇到循环引用，会无限递归，导致栈溢出
      - 解决方法：用 weakMap 解决，weakMap 是弱引用的map，当源对象key销毁，weakMap的value也会被销毁。
      - 过程：
        - 在递归赋值属性前，将源对象和新对象的引用地址存到 weakMap 中
        - 递归赋值属性时，先判断源对象是否在 weakMap 中，若在，直接返回新对象的引用地址，避免无限递归。
```js
const deepClone = (obj, cache = new WeakMap()) => {
  if(obj === null || typeof obj !== 'object') {
    return obj
  }
  // 处理Date, RegExp， Map.Set，Function等特殊类型
  if(obj instanceof Date) {
    return new Date(obj.getTime())
  }
  if(obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags)
  }
  if(obj instanceof Map) {
    return new Map(obj)
  }
  if(obj instanceof Set) {
    return new Set(obj)
  }
  if(obj instanceof Function) {
    return obj
  }
  // 如果cache中有obj, 就把刚刚对应创建的新对象返回
  if(cache.has(obj)) {
    return cache.get(obj)
  }
  // 如果cache中没有obj, 就创建一个新的对象
  let newObj = Array.isArray(obj) ? [] : {};
  cache.set(obj, newObj)
  obj.forEach((item,key) => {
    newObj[key] = deepClone(item, cache);
  })
  return newObj
}

// 使用
const obj = {
  name: 'xw',
  age: 18
}
// 循环引用
obj.important = obj
const cloneObj = deepClone(obj)
console.log(cloneObj)
console.log(cloneObj.important)
```

### 性能优化指标

### 用raf优化动画
```js
let startY = 0;
let currentY = 0;
let rafId = null;

header.addEventListener('pointerdown', e => {
  startY = e.clientY;
});

document.addEventListener('pointermove', e => {
  currentY = e.clientY - startY;

  if (!rafId) {
    rafId = requestAnimationFrame(() => {
      panel.style.transform = `translateY(${currentY}px)`;
      rafId = null;
    });
  }
});

document.addEventListener('pointerup', () => {
  cancelAnimationFrame(rafId);
  rafId = null;
  // 回弹 / 关闭逻辑
});
```
- 触摸或拖拽体验明显更丝滑
- 一帧最多只执行一次
- 这是最低成本的高收益优化

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
- 注意哪些：
  1. 合理使用闭包，不用了，要及时释放内存
  2. dom事件监听，删除dom之前要卸载事件监听
  3. vue/react 组件卸载时，要清除事件监听，延时器等
  4. URL.createObjectURL() 创建的 url，要及时revokeObjectURL()
  5. resizeObserver，intersectionObserver， mutationObserver 等，要及时卸载

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
