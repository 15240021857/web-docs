# vue 笔记 <Badge type="warning" text="doing" />

## vue3 迁移指南

- 知道如何迁移，则知道 vue3 和 vue2 的不同，以及提升
- https://v3-migration.vuejs.org/zh/

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

## VueUse

### 是什么？

- VueUse 是专门为 Vue 打造的工具库。提供了监听浏览器元素各种行为、和浏览器提供的蓝牙、定位、摄像头、连接游戏手柄等能力。适用于 vue2(???)和 vue3。
  （这个描述非常简洁到位，说了是什么，说了能做什么，提供了什么功能，适合什么！）
- 参考资料：https://juejin.cn/post/7313979304512831539

## 正题

- 以下是一些知识点

## 组件双向绑定

- 父子组件通常的 prop 传值，是单向数据流，会导致子组件内部无法改变 prop 值，需要通过$emit 去通知父组件改值，这很麻烦。那么如何让父子组件都需更改值的变量，实现双向绑定呢？
  用 v-model!

```vue
// vue2.x----------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent model.sync="modelParent"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script>
export default {
  props: {
    model: {
      type: string
    }
  },
  methods: {
    updateFun() {
      this.$emit('update:model','vue2.x在子组件改变prop值，实现父子组件数据双向绑定！')
    }
  }
}
</script>

// vue3.4之前---------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent v-model="model"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script setup>
defineProps({
  model: {
    type: string
  }
})
const emit = defineEmits(['update:model'])
const updateFun = () => {
  emit('update:model', '我是子组件，可在这改变prop值')
}
</script>

// vue3.4之后------------------------------
// 父组件调用 parent.vue
<template>
  <myComponent v-model="model"><myComponent/>
</template>
// 子组件定义 myComponent.vue
<script setup>
const model = defineModel()
model.value = '我是子组件，我直接更改了model，实现双向绑定'
</script>

```

## slot 透传

- 父组件向子组件传递 slot 插槽

## 父组件获取子组件 ref
