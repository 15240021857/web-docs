# js/ts 配置 <Badge type="warning" text="doing" />

## 解决什么问题？

- 合理配置 jsconfig/tsconfig.json, 可以帮助编辑器，提供更好的代码提示、路径提示、导航跳转等。

- 参考：https://zhuanlan.zhihu.com/p/697132807

## jsconfig.json

```json
// jsconfig.json配置
{
  "compilerOptions": {
    "baseUrl": "./", // 基础目录
    "paths": {
      // 基础目录下的路径 映射
      "@/*": ["src/*"]
    },
    "target": "ESNEXT", // 按指定js版本解析
    "module": "esm", // 按指定js模块化解析 commonJs, amd, cmd, esm, umd
    "moduleResolution": "node" // 模块解析规则，node从相对路径里找模块；classic从node_modules里找模块
  }
}
```

## tsconfig.json

```json
// tsconfig.json配置
```
