# vue 笔记 <Badge type="warning" text="doing" />

## 是什么？

vue 是构建用户界面的 js 库，我们只需关注数据，专注业务代码，vue 帮我们渲染界面。

## 解决什么问题？

- 传统的原生 js、jQuery 方式，需要操作数据，同时还需要频繁地操作 dom 去展示界面
  - 频繁操作 dom，节点全量替换会造成大量的重排重绘，性能消耗大，页面卡顿生硬
  - 操作 dom，js 代码多，心智负担大
- vue 的 MVVM 思想，数据响应式能做到数据驱动视图，只需操作数据，界面自动更新
  - vue 的 diff 算法，帮我们以最小的开销去按需更新 dom，性能消耗小，页面流畅
  - 无需操作 dom，心智负担小

## 核心

- 响应式原理，双向数据绑定
- diff 算法，以最小的开销去更新 dom
- 组件化开发，将一个大界面，根据功能拆分成独立的小组件，去单独开发和维护。
  - 结构清晰：大组件可能被分成清晰明了的三部分，如头部导航、侧边菜单、中间主体内容。
  - 维护组件代码一目了然，而不是在一个巨石页面中大海捞针。
- 渐进式上手，vue 模版基于 html 标签结构，易上手，可 script 引入，可 npm 导入，可中途使用，可支持 vue 文件
- ...

## vue3 迁移指南

- 知道如何迁移，则知道 vue3 和 vue2 的不同，以及提升
- https://v3-migration.vuejs.org/zh/

## vue2 为什么选择重构成 vue3？

- 因为 vue2 中期才加入 Flow 的类型检查, 类型覆盖并不完整，而 Flow 本身又破坏性更新频繁，工具链支持不理想。
- 所以 vue3 的类型检查用 typescript 重写。
- vite 会替代 webpack 吗？完全取代应该不可能，vite 的目标不是替代 webpack。
  - webpack 有巨大的存量
  - webpack 有些是 vite 不打算覆盖的功能（如模块联邦 module federation）
  - webpack 的复杂度和性能代价，对于大部分的中小型应用并无必要

## vue3 相对于 vue2 的新特性

- 组合式 api
- setup 语法糖
- 来自 @vue/runtime-core 的 createRenderer API 用来创建自定义渲染函数 https://cn.vuejs.org/api/custom-renderer
  - 其中的 renderToString、renderToStream 方法用于将 vue 应用实例转为字符串或流，方便网络传输，用于 SSR

## Vue3 的奇迹之旅，从 3.0“海贼王”到 3.4“灌篮高手”

- 从争议到巅峰
- 从什么地方来，到什么地方去
- 参考资料：https://www.bilibili.com/read/cv29773657/
- Vue 从一开始就有一个简单的使命：成为一个让任何人都能快速学习的平易近人的框架。

## 正题

- 以下是一些知识点

## new Vue() 和 vue3 的 createApp()

- new Vue()是 vue2 创建应用实例的实例化方法。
- createApp(App) 是 vue3 创建应用实例的方法。

### createApp 做了什么？

简单一句话概括：createApp 就是根据传入的根组件，解析并创建新的应用实例，包含设置响应式数据、虚拟 dom、渲染函数等，最终返回应用实例，调用 mount 方法挂载到页面上。

1. 解析根实例，解析模版，脚步，样式
2. 创建应用实例，根据根组件创建一个新的实例，包含核心功能，如响应式数据，虚拟 dom，渲染函数等
3. 配置应用实例，通过 use,component 等方式添加全局方法，属性，指令，插件等
4. 返回应用实例，挂载实例并启动应用

### new Vue 之后做了什么？

## 虚拟 dom & diff 算法

### 虚拟 dom

- 直接操作 dom 是什么昂贵的，所以先操作虚拟 dom，以最小开销去更新 dom

### diff 算法

## vue 组件生命周期

### 特别使用

父组件监听子组件生命周期，两种方式

1. 在 child.vue 的 mounted(){}中去 this.$emit 抛出事件，供父组件使用
2. 在 parent.vue 调<child @hook:mounted="onChildMounted"/>时,通过@hook 去监听

## $attrs & $listeners & $slots 透传

- 参考：https://blog.csdn.net/qq_63358859/article/details/133699476
- 参考：https://blog.csdn.net/a123456234/article/details/142032876

### 禁用 Attributes 继承

是什么？

- inheritAttrs: false

## v-model 组件传参之双向绑定

- 父子组件通常的 prop 传值，是单向数据流，会导致子组件内部无法改变 prop 值，需要通过$emit 去通知父组件改值，这很麻烦。那么如何让父子组件都需更改值的变量，实现双向绑定呢？
  用 v-model!
- vue2 的 model 选项，用于自定义 v-model 的:value :input 的字段名
  - ```js
      model: {prop: myValue, event: myEvent}
    ```

```vue
// vue2.x----------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent :visible.sync="modelParent"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script>
export default {
  props: {
    visible: {
      type: Boolean
    }
  },
  methods: {
    updateFun() {
      this.$emit('update:visible','vue2.x在子组件改变prop值，实现父子组件数据双向绑定！')
    }
  }
}
</script>

// vue3.4之前---------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent v-model="visible"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script setup>
defineProps({
  visible: {
    type: Boolean
  }
})
const emit = defineEmits(['update:visible'])
const updateFun = () => {
  emit('update:visible', '我是子组件，可在这改变prop值')
}
</script>

// vue3.4之后------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent
  v-model="visible"
  v-model:visible2="visible2"
  v-model:visible3="visible3"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script setup>
const visible = defineModel()
visible.value = '我是子组件，我直接更改了model，实现双向绑定'
const visible2 = defineModel('visible2')
const visible3 = defineModel('visible3')
</script>

```

## slot 插槽

### 透传

- 父组件向子组件传递 slot 插槽
- 作用域插槽: 父组件在给子组件写插槽内容时，能用到子组件传来的数据

Vue2.6.0 以前 用 slot、slot-scoped

```vue
<!-- 子组件Child.vue -->
<template>
  <el-input v-model="xx">
    <template slot="prefix">
      <slot
        name="prefix"
        :data="{ name: 'xiaowu', age: 17 }"
      ></slot>
    </template>
  </el-input>
</template>
<!-- 父组件Parent.vue -->
<template>
  <Child>
    <div
      slot="prefix"
      slot-scope="{ name, age }"
    >
      <span>{{ name + " - " + age }}</span>
    </div>
  </Child>
</template>
```

Vue2.6.0 以后，用 v-slot 或#, 废弃 slot、slot-scoped

```vue
<!-- 子组件Child.vue -->
<template>
  <el-input v-model="xx">
    <template #prefix>
      <slot
        name="prefix"
        :data="{ name: 'xiaowu', age: 17 }"
      ></slot>
    </template>
  </el-input>
</template>
<!-- 父组件Parent.vue -->
<template>
  <Child>
    <div #prefix="{ name, age }">
      <span>{{ name + " - " + age }}</span>
    </div>
  </Child>
</template>
```

Vue3 用 v-slot 或#, 同 Vue2.6.0 以后

```vue
<!-- 子组件Child.vue -->
<template>
  <el-input v-model="xx">
    <template v-slot:prefix>
      <slot
        name="prefix"
        :data="{ name: 'xiaowu', age: 17 }"
      ></slot>
    </template>
  </el-input>
</template>
<!-- 父组件Parent.vue -->
<template>
  <Child>
    <div v-slot:prefix="{ name, age }">
      <span>{{ name + " - " + age }}</span>
    </div>
  </Child>
</template>
```

## 父组件获取子组件的 ref

## mixins 与 hooks 复用功能代码：

### 解决什么问题？

- 当一个功能被反复用到，你肯定想复用，但它的代码，又包含在 data,methods,mounted,watch 等选项中，怎么办？怎么抽离呢？这时，vue2 想到用 mixins, vue3 则用了 hooks。

### mixins

- 是什么？将 vue2 的各个选项，糅合到组件选项中，进行使用。组件选项优先于 mixins 选项。
- 属性选项如 data,methods 会覆盖
- 函数选项如 mounted 生命周期类的，会合并执行
- 参考：https://blog.csdn.net/Share_Li_98/article/details/125987983

### hooks

- 是什么？将 vue3 的一个功能的组合式 api 封装到函数里，并返回响应式数据，方法等，供组件使用和调用。组合式 api 包括 ref,reactive,mounted,watch,computed 等。
- hooks 与 mixins 对比
  - hooks 优势：hooks 这种显式的返回数据、方法的方式，比 mixins 明显更直观。
  - mixins 缺陷：而 mixins 使用时对调用者来说是黑盒，会带来意外的变量，方法的覆盖等问题。
- 适用场景：业务功能抽离、工具功能抽离等
  - 业务功能如表格分页多选，记住其他页的勾选项、扫码获取设备信息等
  - 工具功能如防抖节流、mutationObserver/resizeObserver 等各种 observer 的封装

## VueUse - hooks 工具钩子

### 是什么？

- VueUse 是专门为 Vue 打造的工具库。提供了监听浏览器元素各种行为、和浏览器提供的蓝牙、定位、摄像头、连接游戏手柄等能力。适用于 vue2(???)和 vue3。
  （这个描述非常简洁到位，说了是什么，说了能做什么，提供了什么功能，适合什么！）
- 参考资料：https://juejin.cn/post/7313979304512831539

### vue 组件间通信

- 父子：props / defineProps
- 父子：$emit / defineEmits
- 父子：$attrs / useAttrs
  - $listeners/useListeners
  - $slots/useSlots
    - 普通插槽：传 html 结构
    - 作用域插槽: 传 html 结构 + 数据
- 父子：$parent/$children + defineExpose
- 父子：子组件 ref + defineExpose
  - 可调子组件方法，从而传参
  <!-- - $root + defineExpose??? -->
- 父子：v-model 双向绑定
  - vue2: v-model + .sync
  - vue3: v-model + v-model:xxx
- 爷孙：provide/inject
- 任意：发布订阅
  - vue2: eventBus
  - vue3: mitt
  - 自定义事件 new Event()
- 任意：Vuex / pinia
