# 浏览器知识

## 是什么

- 用户访问互联网的一个入口

## 解决什么问题

- 我们前端做的网页，电脑端- 移动端的、toB 的管理系统,toC 购物网站，视频网站等等，都需要通过浏览器、或者浏览器内核来访问。
- 所以，我们前端人员需要了解浏览器的知识和原理，才能写出更好的代码，让用户有更好的体验。

### 浏览器的域名知识

- www.baidu.com:
  - 顶级域名：.com 表示 商业组织
    - 区分组织类型：.org 非营利性组织、.net 网络服务商、.edu、.gov 等等
    - 区分国家或地区：.us、.cn、.uk 等等
  - 一级域名：baidu.com, 是二级域名- 顶级域名的组合
  - 二级域名：baidu, 表示组织名称或品牌等，位置在顶级域名左边的部分
  - www ？？
  - 主机名 host： www.baidu.com 端口：80（80 默认省略）

### cookie 知识

- 是通常用来存储用户会话信息的，由服务器发给浏览器的一小段数据，
  设置 cookie 时，可以设置 domain 作用域，根据匹配到的域名来确定
  发给哪些网站（URL），
  浏览器在每次发送请求时都会带上 cookie
- 域名规则：
  - 默认只发给当前域名, 即默认 domain 是当前域
  - 设置 domain 可扩展域名发送范围
- 设置 domain
  - domain 中以(.)开头，可确保所有子域名都能收到
  - 如 domian=.quec.com ，那么www.quec.com以及他的子域名都能收到cookie
  - 子域名包括不限于：a.quec.com, b.quec.com, c.d.quec.com......
  - 只能设置当前域或它的父域，不能设置其他域。如当前域www.baidu.com,
    父域.baidu.com, 其他域.anther.com
- 设置 domain 的安全和风险
  - 设置 domain 需谨慎，因为一旦设置 domain=.xxx.com 顶级域名, 则它的所有子域名
    都会收到此 cookie，会带来安全问题。如关键数据泄漏，覆盖其他域名的 cookie 数据等
  - 应该在确实需要跨子域名共享 cookie 的场景中使用，
    并对共享数据进行安全处理后再共享，防止覆盖其他域名的数据。
- 设置 path - path 可用来限制 cookie 的发送范围，以什么 path 路径开始，浏览器才向服务器发送 cookie - 默认值：是当前页面 URL 的路径部分，如www.baidu.com/admin/user, 则默认 path=/admin/user,
  表示只对前缀是/admin/user 的接口路径发送 cookie - 根路径：path:/ 表示，当前域名下所有资源路径，都发送 cookie - 安全性： - 限制 path 减少不必要的 cookie 传输 - 应对 path 设置必要的最小路径范围，可节省带宽，增加安全性
