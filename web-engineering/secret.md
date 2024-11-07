# 信息安全-加密技术

## 加密技术

- 面试官：你能说说常见的前端加密方法吗？
  https://juejin.cn/post/7280057907055919144?searchId=2024101623312156A5089D1065BD2F76F5

- 前端常用的几种加密方法
  https://juejin.cn/post/7011306453373812744?searchId=2024101623312156A5089D1065BD2F76F5

- 前端加密与 crypto-js 和 JSEncrypt 的使用 🔐
  https://juejin.cn/post/7128955031063101448

- 关于前端 🛡️ 加密 🛡️ 那些事
  https://juejin.cn/post/7387220458176528419

- 前端常用 6 种数据加密方式的使用（最详解） ================================2024 年 点赞 100+
  https://blog.csdn.net/chaoPerson/article/details/135466465?ops_request_misc=%257B%2522request%255Fid%2522%253A%25226C737FA2-E125-4BD5-BFD7-6D7DC5EEAE7F%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=6C737FA2-E125-4BD5-BFD7-6D7DC5EEAE7F&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-2-135466465-null-null.142^v100^pc_search_result_base6&utm_term=%E5%89%8D%E7%AB%AF%E5%8A%A0%E5%AF%86&spm=1018.2226.3001.4187

- 前端 用账号密码登录的时候 对密码进行加密 【最佳解决方案】用 bcrypt.js 或者 crypto-js 两种方式帮你解决
  https://blog.csdn.net/qq_52602294/article/details/139067951?ops_request_misc=%257B%2522request%255Fid%2522%253A%25226C737FA2-E125-4BD5-BFD7-6D7DC5EEAE7F%2522%252C%2522scm%2522%253A%252220140713.130102334.pc%255Fall.%2522%257D&request_id=6C737FA2-E125-4BD5-BFD7-6D7DC5EEAE7F&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_ecpm_v1~hot_rank-24-139067951-null-null.142^v100^pc_search_result_base6&utm_term=%E5%89%8D%E7%AB%AF%E5%8A%A0%E5%AF%86&spm=1018.2226.3001.4187

### 是什么？

- 常见的加密形式包括————哈希函数、对称、非对称加密算法
- 哈希，也叫散列，摘要（Digest）:不可逆，长度固定

### 解决什么问题？

- 疑问：localstroge, cookie,存储的用户信息， 请求的 data 和 params，记住密码、url 地址参数，用户的聊天记录等等，如何加密？
- 哈希
  - 应用场景
    - 密码存储：明文保存密码一旦被窃取即泄露。而经过哈希加密后的密码，即使被窃取，也不可逆为密码明文。对比逻辑： 前端输入明文，前端哈希加密后，跟数据库的哈希密码做比对。
    - 验证下载数据的完整性：网站提供安装时附带 md5 值，用户下载后重算 md5 值，跟之前的 md5 比对，一致则表示下载的文件完整
    - 防篡改：数据传输之前记录 md5 值，接收方接到后，重算 md5，进行比对，一致则传输中未被篡改。
  - 优势：不可逆，存储体积小，保护数据完整性和减轻篡改风险，速度快
  - 劣势：容易被撞库暴力破解【因为相同的明文产生相同的密文，容易被试出来，但可加盐来应对】
  - 场景类型：SHA-512、SHA-256、MD5
    - MD5 安全性不高，存在碰撞破解问题。Message Digest Algorithm 5
    - SHA 系列算法，为了解决 MD5 安全性问题，但速度和存储大小不如 MD5. Secrue Hash Algorithm

### 应用场景

- 本地存储、cookie、密码加密、记住密码、http 传输？？

### 怎么做？

1. Base64 加密-但不是加密算法
   - 是用 64 个可打印字符来表示二进制数据,原理？二进制？
   - 优势：跨平台，小图片用 base64 减少请求，算法简单。
   - 劣势：体积增加 1/3, 有转换成本，尤其是大文件耗性能、无法缓存
   - 原生用法：加密：window.btoa('hello') 解密 window.atob('base64 字符')
   - 插件用法：用 js-base64
2. 哈希，如 sha256, md5
3. 对称加密，如 aes, des
4. 非对称加密，如 rsa

- 如 node:crypto, 通过生成公钥和私钥，公钥加密，私钥解密。公钥对外公开，私钥保密。

## 安全问题

- 前端安全系列（一）：如何防止 XSS 攻击？
  https://juejin.cn/post/6844903685122703367?searchId=2024101623145105E2347A20EE7A2DB250
- 前端安全系列之二：如何防止 CSRF 攻击？
  https://juejin.cn/post/6844903689702866952
- 全面？
  https://juejin.cn/post/7067697624626757646?searchId=2024101623225624346FA21540972D4C1F
- 二、web 安全（xss/csrf）简单攻击原理和防御方案（实战篇）============================2021 年 较新
  https://juejin.cn/post/6953059119561441287?searchId=20241016232752356C96BF9CC2F52E06BD
- 复习前端：前端安全 =======================2023 年 简短
  https://juejin.cn/post/7191062612212187197

### 有哪些？

### 解决什么问题
