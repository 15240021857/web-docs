# node 博客

## 是什么？

- 用 node 服务搭建的博客后台接口项目

## 解决什么问题？

- 为博客管理后台提高 API 接口
- 完整开发后台项目，作为经验

## 技术架构

- 后端
  - node
  - express
- 数据库
  - mysql
  - sequelize -orm: 用到啥，查文档即可
- 容器
  - docker

## 步骤

## 学习

### 传参方式

- 查询参数
  - 如接口地址 http://127.0.0.1:3000/admin/article?title=文章10&content=文章太精彩
    - !获取参数：req.query
- 请求体参数
  - api: http://127.0.0.1:3000/admin/article
  - POST 请求 x-www-form-encodedUrl data: {title: "文章 10", content: "文章真是太精彩了"}
  - !获取参数： req.body
- 动态参数
  - api http://127.0.0.1:3000/admin/article/10
  - 路由参数：一般出现在详情页
  - !获取参数：req.params

### 模糊查询

- SQL 语句: SELECT \* FROM Articles WHERE like "%文章 10%"：
  - 意思是 "文章 10" 两个%号 前后允许任意字符。
- SQL Orm 语法：

```js
  - import {Op} from "sqlitexxx"
  - const condition = "\{ title: \{ \[Op.like\]: `\%\$\{req.query.title\}\%` \}\}"
  - const articles = Article.findAll(condition)
```

### 分页

- SQL 语句： SELECT \* from Articles WHERE LIMIT 0, 10
  - 意思是 分页查找文章，从第 0 条开始，查 10 条
- SQL Orm 语法：

```js
  - const {currentPage, pageSize} = req.query
  - const conditions = {
    title: "\{ \[Op.like]: `\%\$\{req.query.title\}\%` \}",
    offset: (currentPage - 1)\*pageSize,
    limit: pageSize
    }
  - const {count, rows} = Arcitles.findAndCountAll(conditions)
```

### 参数白名单过滤

- 防止用户传了 意外的变量如 id， payStatus 字段 意外的改变了数据库数据，造成损失
- 用户利用特殊手段如 apifox, postman 等 传参
- 解决办法：后台服务只使用和插入需要的请求参数即可

### 参数验证

- 用户传的参数必须验证
- 验证可用 sequelize model 定义时进行验证
- https://www.sequelize.cn/core-concepts/validations-and-constraints
- allowNull：是否允许不传 allowEmpty: 是否运行空值""
- 在 errors 中接收错误，若是验证错误返回 status: 400; 若是服务错误则返回 500

### 复习：
- nodejs常用命令：
  - npm i express-generator -g
  - express node-blog --no-template
  - 创建脚手架项目
- express路由配置
 - express-router: router.get('/',() =>{...})
 - app.use('admin/article', articleRouter) 文章路由都是由admin/article开头
- RESTful风格路由
 - 路径相同，根据动态参数不同，或方法不同，来区别不同路由