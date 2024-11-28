# 待做作品池

## 是什么？

- 在工作学习过程中，发现很多想做的东西，时间有限，先记录下来，一个个去做。

## 解决什么问题？

- 想做的东西很多，时间有限，防止遗忘。

## 具体内容

todo

### !!!node 做博客管理后台 api 服务

- 理清思路，再做，非常清晰，若直接做，则很乱 +使用 docker 搭建 windows 环境，安装 sql +创建 sql 数据库，创建表，

```js
- +node 服务通过 squlize orm 去连接数据库， +创建 model， +创建迁移文件 +创建种子，批量插入表数据 +文章详情，通过路由参数去获取 router.get('/:id', (req, res) => { const id = req.param.id })
- +sql orm 语句：const article = Article.findByPk(id) +若找不到 article, 则 res.status(404).json({data: article, msg: '文章不存在'})

* api 接口文档：apifox +创建团队 xwtd, 创建项目 xw-blog +创建接口，写入 api 地址，路径有参数 http://localhost:3000/admin/acticle/{id} +保存接口 +环境变量如何设置 +文档分享 +创建文章 +新增：和查询 地址一样，但方法是 POST +参数接收 req.body 传请求参数的 body x-www-form-urlencode
* orm acticle.create({title, content}) +返回 code：201 新增资源 +删除文章
* sql delete from Articles where id=102 +获取参数 id = req.params.id +和查询地址一样 admin/acticle/:id DELETE
* orm: const article = Actice.findByPk(id) article.destory()
* 200： res.json({code,msg,data})
* 500: res.status(500).json({code:xx,msg,errors:[error.message]}) +更新文章 +地址一样 UPDATE +思路：获取 id 找到文章 判断是否存在，存在再做更新
* req.params.id 拿到 id 和 req.body 拿到表单数据
* const article = await Article.findByPk(id)
* sql update 语句更新文章 model 的 await article.update(req.body)
* 200 若查到 res.json(data: article, msg: 更新文章成功) +没查到 res.status(200).json({code: 404,msg: '没找到'})
* 500
```

## !!vue2 new Vue

## !!!vue3 小满，重学，知其原理

## !!uniapp 看文档吧

## !!three.js 3D 学习

## websocket 心跳监测，断线重连

https://mp.weixin.qq.com/s/AURtQS_zO2SXSxM_2Wjqdg

## vue 实现电子签名、图片合成、及预览功能

https://mp.weixin.qq.com/s/ZXEBwLhSJqJxnbl7nxAC6w

## !几种登录方式 +普通账号登录 +扫码登录 +单点登录

+jwt 验证

## !如何做视频网站？

## !如何做直播网站？

## !如何做物流地图网站？

## !行业及方案：

### !!!可视化大屏

- https://mp.weixin.qq.com/s/C88148zvEYt2rsGCH3pZKA

### 物流

### 电商

- +sku&spu：https://www.bilibili.com/video/BV1y8411k7Kt?spm_id_from=333.788.recommend_more_video.2&vd_source=0a9cf58dffb3a15fec3f7d7d77eea1df
- +sku：https://www.bilibili.com/video/BV1XX4y1d7dM/?vd_source=0a9cf58dffb3a15fec3f7d7d77eea1df
- +sku store keeping unit 对仓库：仓库管理商品存储的最小颗粒单位 对商超：售卖商品的最小存储单位-一个 sku 对应一串条形码； +如中华烟 一包 42 块钱 一盒 420 元；乔丹鞋-42 码-红色=500 块；而乔丹鞋-43 码-红色=600 块；这些都是不同的 sku, 可存储最小单元和定价最小单元。
- +spu Single product unit 商品款式最小单位；即乔丹鞋，科比鞋，就是不同的 spu，不同的商品。

### 物联网

### 电网
