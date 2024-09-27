# 性能优化 <Badge type="warning" text="doing" />

## 是什么？

- 开发时、webpack/vite 编译构建时：
  - 从开发效率出发，为了让前端服务启动更快，热更新更快，打包构建更快。
  - 做到按需编译，不需要的不编译，合理利用多核并行构建，提升编译速度;合理利用缓存，提升二次编译速度。
- 上线后、运行时、访问页面时：
  - 从用户体验出发，提升页面加载速度，提升页面切换、操作、动画、交互的流畅度
  - 做到当前需要的优先加载，以后需要的空闲时加载，不需要的不加载等等。
  - 网络的性能优化：如请求缓存，promise 并发控制，不需要的请求可取消等等
  - 减少用户等待焦虑：骨架屏、交互反馈、防抖节流等

## 解决什么问题？

- 开发时
  - 开发效率慢：前端服务启动慢，热更新更慢，打包构建更慢
- 生产运行时
  - 用户体验差，页面白屏时间长、加载慢，页面切换、操作、动画、交互卡顿
  - 包体积过大，下载非常慢
  - 全项目的 js，都在首页下载，导致首页慢，白屏时间长
  - 发版之后，又得全量的下载所有新资源，如 新的 js,css,img 等，耗时，耗带宽，页面又慢
  - 随着项目越来越复杂，资源越来越多，页面会越来越慢
  - ...

为了解决上述问题，所以前端性能优化是势在必行！

## 什么是好的性能优化？

- 从用户体验出发，看具体性能指标，用数据说话。

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
  - 会造成项目报错？？
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
    - 去掉注释、空格、console、debugger
    - 压缩、缩短变量和函数名
    - 预计算，将能计算的函数执行，拿到结果
  - css 压缩：cssnano
    - 去掉注释、空格、去掉无用 css
    - 合并选择器、压缩颜色值
    - 简化 css 代码
  - GZip 压缩
    - 前端打包 GZip
    - Nginx GZip 网络压缩
  - 图片压缩
    - imagemin-webpack-plugin
    - 转成 webp
    - 利用 picture、source、img 标签，针对不同设备加载不同清晰度、不同尺寸的图片，img 标签兼容低版本浏览器

- 网络

  - CDN
  - 请求缓存【一定时间内复用请求结果】，promise 并发控制，不需要的请求可取消等等

- 缓存
  - 强缓存
  - 协商缓存
  - memory cache
  - disk cache

### 渲染

- css
  - 抽单独 css 文件，比放在 js 中加载更快。通过 mini-css-extract-plugin
  - css 放在 head 中优先加载
- html
- js 阻塞

  - 普通 js 引入放在 body 最下方，防止阻塞 dom 加载，而加了 async、defer 的 js 不阻塞 dom，可放在 head 中引入
  - js 异步加载 async、defer

  ```vue
  <!-- 使js异步下载，下载完毕就执行，适合与dom无关的js -->
  <script src="xx.js" async />
  <!-- 使js异步下载，等dom加载完毕才执行，适合与dom有关的js -->
  <script src="xx.js" defer />
  ```

  - js 预加载 preload、prefetch

    ```vue
    <!-- 优先加载，适合加载当前页面的js等资源 -->
    <link src="xx.js" ref="preload" />
    <!-- 空闲时加载到缓存中，适合其他页面的js，等切到该页时直接从disk cache中获取，从而加快速度 -->
    <link src="xx.js" ref="prefetch" />
    ```

  - 参考：https://blog.csdn.net/huangpb123/article/details/84170557

## 用户体验

- 骨架屏
  - 减少白屏时间，减少用户等待焦虑
- 节流防抖
  - 减少频繁操作，造成页面卡顿
