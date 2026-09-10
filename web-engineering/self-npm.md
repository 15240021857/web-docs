# 建设 NPM 私仓 - Verdaccio

## 是什么
- `Verdaccio` 是一个轻量级的私有 npm 仓库，目前在 GitHub 上有 17.7k Star。它不需要数据库，开箱即用，内置了自己的小型存储引擎，同时支持代理其他 registry（比如 npmjs.org），在拉取依赖时自动缓存下载的包。

> NPM: https://www.npmjs.com/package/verdaccio

## 为什么
- 对于需要在公司内部使用 npm 包管理、又不想把代码推到公网的团队来说，`Verdaccio` 是一个直接可用的方案。

## 它能做什么
- 私有包管理
  - 在公司内部搭建私有 npm 仓库，发布和使用内部包的方式与公共 npm 完全一致。不需要额外的数据库，Verdaccio 自带轻量存储。

- 缓存公共 registry
  - 多台服务器安装依赖时，Verdaccio 可以作为中间层缓存 npmjs.org 的包。每个包每个版本只从上游拉取一次，后续请求直接走本地缓存。即使上游暂时不可用，缓存中的包仍然可用。

- 串联多个 registry
  - 组织内部有多个 registry 时，Verdaccio 的 uplinks 功能可以把它们串联起来，从一个统一的入口获取包，不用每台机器都配置多个源

## 怎么建设和部署
```bash
# 1. 确认 node 版本
node -v   # 要 18+

# 2. 装
npm i -g verdaccio

# 3. 改配置，允许外网访问
# 在 ~/.config/verdaccio/config.yaml 加一行：
# listen: 0.0.0.0:4873

# 4. 跑起来
verdaccio
```

## 如何使用

```bash
```