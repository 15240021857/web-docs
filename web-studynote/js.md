# Javascript <Badge type="warning" text="doing" />

## 是什么

- Javascript 简称 JS, 是动态脚步语言，是解释型的。支持基于原型编程，并且支持面向对象、声明式、函数式编程范式。也被用到了很多非浏览器环境中，如 node.js 后端、跨平台。

  - 解释型语言
    - V8 执行 js 过程：
      - js 代码 ->【解析器 parser】-> AST -> 【解释器 Ignition】 -> 字节码(边解释边执行)
      - 这种运行时编译代码的技术称为 JIT(即时编译)，极大提高 js 执行性能

- 发展历史
  - 1995 年被开发出来，起初叫 LiveScript, 后来因为创造时受之启发，也想蹭 Java 热度改名 Javascript
  - 1997 年制定 ECMA 最初标准。
  - 2012 年所有浏览器都支持 ECMAScript5.1, 即 ES5. 旧版本浏览器至少支持 ES3
  - 2015 年 6 月 17 日，ECMA 国际组织正式发布了 ECMA2015, 即 ES6

## 为什么创造 js？解决什么问题？

- 在 js 创造出来之前，网页是什么样的？
- 让你的网页动起来。如根据 ajax 请求动态获取数据更新页面，地图交互，2D/3D 动画等。

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

### 发布订阅

### 观察者

### 单例

### 工厂模式

### 装饰器模式

## es6

### 数组迭代方法

- for-of 和 foreach

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

- 2.解决向已定义的函数，另追加参数，如 el-input/el-select 的 change 事件函数。
  - e 形参 是 el-select 自带的参数，但我们自己想传入参数怎么办呢？

```js
// 不带参
 <el-select @change="changeFun">
 {/* 带参 */}
 <el-select @change="changeFunMyParam($event, myParam)">
 {/* 带参 - 柯里化 */}
 <el-select @change="changeFunMyWrap(myParam)">
 <script>
    {/* 常规用法 - 不带参 */}
    const changeFun = (e) => {
        console.log(e)
    }
    {/* 带参数 */}
    const changeFunMyParam = (e, param) => {
        console.log(e,param)
    }
    {/* 带参数 - 柯里化 */}
    const changeFunMyWrap = (param) => {
        return (e) => {
            console.log(e,param)
        }
    }

</script>
```
