# 性能优化 <Badge type="warning" text="doing" />

## 是什么？

## 为什么？

## 什么是好的性能优化？

- 看具体性能指标，用数据说话。

## 怎么做

- 可参考：https://juejin.cn/post/7078491632605069348
- webpack 迁移 vite: https://juejin.cn/post/7129128214735093791

## 开发环境-编译时

### 缩小范围

- include/exclude

### 并行构建

- thread-loader/ happy-pack

### 缓存

- 加快二次构建，直接复用，针对补偿变动的文件，提高构建效率
- cache-loader
- dll-plugin -旧版 webpack4 以下 缓存
- hard-source-webpack-plugin 构建缓存
  - dev: 75s -> 25s
  - prod:
- webpack5-fileSystem

## 生产环境-运行时

### 加载

- 体积小

  - webpack-bundle-analyse 去分析哪些 js 文件体积大
  - splitChunks 代码分割，或者叫拆包
    - 背景：一个入口模块，体积日渐庞大，一个文件如 10M，下载很久，阻塞 js 渲染页面，白屏时间很长，每次发版后还得重新下载一遍新的 js，用户体验极差。
    - 拆包优势
      - 1.splitChunks 拆出公共模块 common、不常改变的第三方包 vendor，二次访问直接用缓存，速度极快
      - 2.路由懒加载拆出每个路由页面的业务代码，访问时再下载 js
        - 配合魔法注释，webpackPreload 去优先加载首页代码，减少首屏白屏时间
        - 配合魔法注释，webpackPrefetch 在浏览器空闲时下载其他页面代码，减少其他页面进入时的加载时间
  - import()动态按需加载，即用时再加载，如 xlsx, lodash, echarts
    - 配合魔法注释 magic comments, 但优先级低于代码分割 splitChunks
    - 减少首页包体积，因为不用就不下载了，多好~
    ```js
        // 代码分割代码
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    minSize: 0,
                    minChunks: 1,
                    test: /[\\/]node_modules[\\/]/,
                    priority: 2
                },
                // 把xlsx单独提出来，方便动态引入
                xlsx2: {
                    name: 'xlsx2',
                    minSize: 0,
                    minChunks: 1,
                    test: /[\\/]xlsx[\\/]/,
                    priority: 3
                }
            }
        }
        // A.js 4s后动态按需引入xlsx， 但异步块名称是上面的xlsx2，不是xlsxTest
        setTimeout(() => {
            import(
                /*webpackChunkName: "xlsxTest"*/
                'xlsx'
            ).then(res => {
                console.log('xlsx version==', res?.version)
            })
        },4000)
    ```
  - js 压缩：terser-plugin
  - css 压缩：cssnano
  - GZip 压缩
    - 前端打包 GZip
    - Nginx GZip 网络压缩
  - 图片压缩
    - imagemin-webpack-plugin
    - 转成 webp
    - 利用 picture、source、img 标签，针对不同设备加载不同清晰度、不同尺寸的图片，img 标签兼容低版本浏览器

- 网络

  - CDN

- 缓存
  - 强缓存
  - 协商缓存
  - memory cache
  - disk cache

### 渲染

- css
