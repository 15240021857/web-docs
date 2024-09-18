# 个人博客文档 <Badge type="tip" text="done" />

- 个人前端经验总结文档，也是个人的作品
- Github pages: https://15240021857.github.io/web-docs/

## 为什么做个人博客

- 前端知识非常多，而且技术不断更新，用文档的形式，将前端知识系统的沉淀并记录下来，方便记忆。

## 怎么做个人博客

- 通过 vitepress 作为文档主体，用 github-pages 作为静态页面部署工具，实现线上部署。

### 具体实现

- 根据 VitePress 官方部署指南操作 https://vitepress.dev/zh/guide/deploy#platform-guides
- 遇到坑了：
  - 1.deploy.yml 中 配置文件中的 pnpm 方式下的构建 会报没有指明 pnpm version 的错
    - 解决：需指明 pnpm version 即可
  - 2.deploy.yml 中 当前vitepress@1.3.4，打包后 dist 目录 path 是.vitepress/dist，而不是 docs/.vitepress/dist,需根据项目自行修改。

```yml
- name: pnpm set
  uses: pnpm/action-setup@v3 # 如果使用 pnpm，请取消注释
  with:
    version: 8
```
