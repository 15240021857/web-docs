# 微前端架构

- 微前端是一种多个团队通过独立维护和部署项目的方式，聚合到一起 共同构建一个 web 应用的技术方法和策略。

# 为什么需要微前端？

- 因为可以将巨石应用的某个模块，分出来让其他团队独立维护和部署，避免了巨石应用，迭代非常慢，功能之间互相影响，互相连累阻塞的问题。

# 怎么实现微前端？

## 乾坤 qiankun

- 基于 single-spa 的微前端方案

### 特点

- html entry 相比 js entry 极大降低了子应用改造成本
- 完备的 js, css 沙箱隔离。js 沙箱通过 snapshot、proxy 等隔离，css 沙箱通过 strictStyle、等进行隔离。

## 无界 wujie

-
- 基于 WebComponent 容器 + iframe 沙箱

## micro-app

## single-spa

## webpack5 模块联邦

## EMP - 基于 模块联邦
