# html,css 基础

- 是什么？
  - html 是网页的结构，是骨架，肌肉，眼睛，鼻子，耳朵等器官。
  - css 是网页的样式，是衣服和装饰，皮肤以及化妆品等修饰。

## html

- 字典：https://www.runoob.com/tags/ref-av-dom.html

### html 语义化

### a11y

## css

- 字典：https://www.runoob.com/css/css-tutorial.html

### css 模块化

解决什么问题？

- 解决不同页面模块 css 变量命名重复的问题
- css 变量语义化的问题
- 解决复用和维护的问题

BEM 架构

- Block 块区域:用"-"连接；Element 元素:用"\_\_" Modifier 修饰：用"--"
- 如 el-button--primary、el-input\_\_inner
- 资料：https://blog.csdn.net/YUELEI118/article/details/141296821

### css 响应式设计

解决什么问题？

- 一套代码适配不同屏幕的设备，表现一致的问题

- rem 和 vw
- 页面缩放 transform:scale(xx)

### :root 根选择器

能干嘛？
定义根元素的变量，供全局使用

```css
/* public.css */
:root {
  --main-font-color: #666;
}

.title {
  color: --main-font-color;
}
```

```js
// js动态改变
document.documentElement.style.setProperty("--main-font-color", "#333");
```

配合 vueUse 去实现，动态改变
