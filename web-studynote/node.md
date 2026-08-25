# node.js <Badge type="danger" text="will do" />

## 是什么

是 javascript, 运行在服务端，由 V8 引擎驱动？

## 架构组成
- 核心api
  - 内置模块：fs,path,http,net,crypto, stream,os,child_process等
  - 事件循环：libuv(c++)，异步IO, 网络，定时器等
  - JS执行：V8 引擎，负责执行 javascript 代码。
  - C++底层模块：操作系统调用，如读取硬件等 

## node.js 能做什么

- 搭建后台静态资源服务器，将前端包作为静态资源去发到线上，供所有人访问。
- 搭建后台 api 接口服务，如增删改查等。
- npm，全称是 Node Package Manager。是 javascript 世界的包管理工具仓库，也是 node.js 的默认包管理工具仓库。将造好的轮子发布到 npm 供所有人使用。
- SSR，服务端渲染
- BFF，全称 Backend For Frontend, 即为前端服务的后端。
- 开发代码脚手架
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

### 选型结论
1. **Koa2 最适合这种轻量 BFF** ✅
   - 中间件模型简洁，async/await 原生友好，没有 Express 回调地狱；
   - 足够做：鉴权透传、http 代理转发、返回数据过滤、统一异常处理；
   - 包体积小，启动快，部署简单；
2. Express：也可以，但是老的回调写法多，异步错误处理容易漏，写`async`路由必须自己捕获异常；
3. Node 原生 http：**不推荐**，要自己写路由、解析 query、body、header，轮子太多，容易出 bug。
4. NestJS：适合 BFF 后续要加大量内部业务、定时任务、内部数据库、复杂守卫；如果你 BFF 未来 1 年内不会膨胀，完全没必要上。

> BFF 本质：**薄转发层，无本地数据库，权限全部来自 Java 后端**，这一类叫「代理型 BFF」，Koa/Express 完全 hold 住。

```js
sim-bff/
├── .env                #环境变量，Java后端地址
├── package.json
├── src
│   ├── app.js          #入口
│   ├── router
│   │   └── sim.router.js  #sim卡相关bff接口
│   ├── service
│   │   └── java-backend.service.js #封装所有调用Java的http请求
│   ├── middleware
│   │   ├── error-handler.js #全局错误捕获
│   │   └── token-propagate.js #透传token工具
│   └── utils
│       └── data-filter.js #核心工具：行过滤、字段过滤函数
└── Dockerfile
```
**src/service/java-backend.service.js**
```js
const axios = require('axios');
require('dotenv').config();

const javaClient = axios.create({
  baseURL: process.env.JAVA_API_BASEURL,
  timeout: Number(process.env.JAVA_TIMEOUT)
})

// 获取当前用户权限信息
async function getUserPermission(token){
  const res = await javaClient.get('/api/user/currentInfo',{
    headers:{
      Authorization: token
    }
  })
  return res.data; // {roles, allowFields, dataScope}
}

// 获取SIM原始列表（Java做分页、行过滤）
async function getRawSimList(token, queryParams){
  const res = await javaClient.get('/api/sim/rawList',{
    headers:{ Authorization: token },
    params: queryParams
  })
  return res.data;
}

// 透传post写操作给java
async function forwardSimUpdate(token, body){
  const res = await javaClient.post('/api/sim/update', body,{
    headers:{ Authorization: token }
  })
  return res.data;
}

module.exports = {
  getUserPermission,
  getRawSimList,
  forwardSimUpdate
}

```

**src/router/sim.router.js**
```js
const Router = require('@koa/router');
const router = new Router({prefix:'/bff/sim'});
const javaService = require('../service/java-backend.service');
const { filterSimList } = require('../utils/data-filter');

// sim卡列表接口
router.get('/list', async ctx=>{
  const token = ctx.headers.authorization;
  if(!token){
    ctx.throw(401, '缺少token');
  }
  // 1、调用Java拿用户权限
  const perm = await javaService.getUserPermission(token);
  // 2、调用Java拿原始SIM分页列表，Java完成数据库分页+行级数据权限过滤
  const rawPageData = await javaService.getRawSimList(token, ctx.query);
  // 3、BFF仅做字段裁剪
  const filteredRecords = filterSimList(rawPageData.records, perm.allowFields);

  ctx.body = {
    total: rawPageData.total,
    records: filteredRecords
  }
})

// 修改SIM状态，直接透传
router.post('/update', async ctx=>{
  const token = ctx.headers.authorization;
  const body = ctx.request.body;
  ctx.body = await javaService.forwardSimUpdate(token, body);
})

module.exports = router;

```

**src/middleware/error-handler.js**
```js
module.exports = async (ctx, next)=>{
  try{
    await next();
  }catch(err){
    ctx.status = err.status || 500;
    ctx.body = {
      code: err.status || -1,
      msg: err.message || '服务异常'
    }
  }
}
```
**src/app.js**
```js
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const errorHandler = require('./middleware/error-handler');
const simRouter = require('./router/sim.router');
require('dotenv').config();

const app = new Koa();

app.use(logger());
app.use(errorHandler);
app.use(bodyParser());

//注册路由
app.use(simRouter.routes()).use(simRouter.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
  console.log(`BFF service run on port ${PORT}`);
})
```

### BFF部署
- nginx 部署 用PM2 管理进程，实现高可用
  - /java/xx 为 java 接口路径 转发到8080
  - /bff/xx 为 BFF 接口路径 转发到3000
- 部署到容器化环境，如 docker, k8s 等
- 部署到云服务器，如阿里云，腾讯云...

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
  - 新增 INSERT INTO
    - 新增一个 INSERT INTO user(`name`, `age`,`hobby`) VALUES('xiaowu', 20, 'music')
    - 新增多个：逗号隔开即可 VALUES('xiaowu', 20, 'music'),('xiaowu2', 20, 'music')
  - 编辑 UPDATE SET
    - 编辑一个 UPDATE `user` SET name='xiaowu',age=20 WHERE id=1
  - 删除 DELETE
    - 单删：DELETE FROM `user` WHERE id=1
    - 批量：DELETE FROM `user` WHERE id IN(1,2,3)

## RESTful API

- RESTful API 是一种 API 设计风格，是一种设计风格，而不是标准。
- RESTful API 设计规范
  - URL 中使用名词，不使用动词
  - URL 使用小写字母
  - URL 使用连字符 - 而不是下划线 \_
  - URL 尽量使用复数形式
  - URL 使用 RESTful 风格的动词，如 GET、POST、PUT、DELETE 等
  - URL 使用 RESTful 风格的参数，如 ?page=1&size=10
- 原则：对单个资源的操作，id 建议放在路径中，如 /users/1；对多个资源的操作，id 建议放在参数中。

## 部署

### nginx 部署

- 前端项目
  - 购买云服务器【阿里云，腾讯云...】
  - 打包前端
  - 上传到服务器
    - xshell 连接服务器
    - xftp 上传前端 dist 文件到/root/www 下
  - 安装 nginx
    - cd /etc 下
    - nginx： yum install nginx
    - 配置 nginx： vim /etc/nginx/nginx.conf
      - 按 INSERT 键进入编辑模式
      - 将用户名修改为 root
      - location / {
        root /root/www;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
        }
      - 按 ESC 键退出编辑模式，按:wq 保存退出
      - 重启 nginx： systemctl restart nginx
      - 访问云服务器外网 ip 加端口即可访问

### PM2

## 大文件上传

### 文件上传

## 文件下载

## 强缓存、协商缓存
