# node.js <Badge type="danger" text="will do" />

## 是什么

是 javascript, 运行在服务端，由 V8 引擎驱动？

## node.js 能做什么

- 搭建后台静态资源服务器，将前端包作为静态资源去发到线上，供所有人访问。
- 搭建后台 api 接口服务，如增删改查等。
- npm，全称是 Node Package Manager。是 javascript 世界的包管理工具仓库，也是 node.js 的默认包管理工具仓库。将造好的轮子发布到 npm 供所有人使用。
- BFF，全称 Backend For Frontend, 即为前端服务的后端。
- 开启前端服务：为 webpack/vite 等搭建前端开发服务器。
- 代码优化：代码转化，混淆压缩等支持，如 babel，terser-pligin 等
- 跨平台支持：协助代码编译转换，将 vue、uniapp 等框架代码，通过虚拟 dom，ast 等技术，编译成不同终端设备支持的代码，如小程序，安卓，ios，桌面端等。

## 有什么优点？

## 有什么缺点？不能做什么？

## npm

### package.json

- package-lock.json
  - 锁定版本：当 lock.json 的某个包版本符合 package.json 中该包版本规则，那么就按 lock.json 中该包锁的版本来；但是若 lock.json 的某个包版本不符合 package.json 的该包版本规则，则以 package.json 为准去下载该包，并生成新的 lock.json。
  - 做包缓存
  - package-lock.json 只在 npm 时起作用，当使用 yarn，或 cnpm 等其他命令时无效。
- yarn-lock.json
  - 锁定版本: 同上
  - 做包缓存: 同上
  - yarn-lock.json 只在 yarn 时起作用

## BFF

### 什么是 BFF？

- Backends For Frontends, 服务于前端的后端
- https://cloud.tencent.com/developer/article/2352452

### 能做什么？不能做什么？

## MYSQL

- 表语句
  - 查询
    - 查询列 SELECT id,name FROM `user`
    - 查询所有列 SELECT \* FORM `user`
    - 排序 SELECT \* FORM `user` ORDER BY [id 列名] [DESC 降序 ASC 升序]
    - 分页 SELECT \* FORM `user` LIMIT 0,3 从第 0 行开始，查 3 条
    - 条件查询 SELECT \* FORM `user` WHERE name='小吴'
    - 联合查询 WHERE name='小吴' AND age<=20
      - WHERE name='小吴' OR age<=22
    - 模糊查询 WHERE name LIKE '%满%';
      - '满'字前后有字符都满足
      - '*吴%'，*是占位字符，此处是代表一个
  - 新增
    - 新增一个 INSERT INTO user(`name`, `age`,`hobby`) VALUES('xiaowu', 20, 'music')
    - 新增多个：逗号隔开即可 VALUES('xiaowu', 20, 'music'),('xiaowu2', 20, 'music')
  - 编辑
    - 编辑一个 UPDATE `user`

## 部署

### PM2

## 大文件上传

### 文件上传

## 文件下载

## 强缓存、协商缓存
