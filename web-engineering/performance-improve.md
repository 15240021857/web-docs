# 性能优化 <Badge type="warning" text="doing" />

## 是什么？

## 为什么？

## 什么是好的性能优化？

- 看具体性能指标，用数据说话。

## 怎么做

## 开发环境-编译时

### 缩小范围

- include/exclude

### 多核优势

- thread-loader

### 缓存

- cache-loader
- dll-plugin 将不常变动的 js 文件缓存起来 -旧版 webpack 缓存
- webpack5-fileSystem: 将不常变动的 js 文件缓存起来，提高构建效率

## 生产环境-运行时

### 加载

- 体积小

  - webpack-bundle-analyse 去分析哪些 js 文件体积大
  - import()动态按需加载，即使用时再加载，如 xlsx, lodash, echarts
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
        // A.js 4s后动态按需引入xlsx， 但名称不是xlsxTest, 而是上面的xlsx2
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

- 网络

  - CDN

- 缓存
  - 强缓存
  - 协商缓存
  - memory cache
  - disk cache

### 渲染

- css
