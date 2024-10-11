# 前端监控、错误处理和页面埋点

## 解决什么问题？

- <b>前端监控</b>，帮助排查并解决报错故障，特别是针对线上的、过去发生的，以及偶发的故障进行追溯和复现，来提升生产环境页面稳定和安全
  - 页面的健壮性、安全性：不会因为一个报错，就崩溃，会有相应的错误兜底
- <b>错误处理</b>，当 async 函数中有 6 个 await 异步 promise 函数，假如第一个函数抛出了 reject('一个错误')异常，造成其他 5 个函数都被中断。是不是感觉因小失大？

  - 原因：await 函数异常了，底层相当于 return Promise.reject(); 造成后续代码不执行。
  - 如何解决呢？答案是给每个 await 异步函数包上 try-catch 捕获即可
  - 封装 try-catch，因为给每个都包 try-catch 很麻烦
  - ```js
    // 异常捕获处理 async/await
    export async function asyncFunWithTrycatch({ asyncFun, data, fail, complete }) {
      try {
        const res = await asyncFun(data);
        return [null, res];
      } catch (error) {
        console.error("try-catch捕获", error);
        fail && fail(error);
        return [error, null];
      } finally {
        complete && complete();
      }
    }
    ```

- <b>页面埋点</b>：帮助分析用户偏好，提升用户体验

## 怎么做？

- 前端监控
  - 新增监控模块菜单，记录全局错误捕捉，错误详情，时间点，操作人等
  - 接入前端监控第三方管理系统，帮助监控
- 用户埋点
  - 通过页面停留时间，页面访问次数等数据，分析出用户偏爱哪些页面
  - 通过点击事件，拿到哪些按钮、链接比较受欢迎
  - 通过广告进入视口的时长和次数，来对广告进行收费等

## 具体实施？

### 监控系统？

- 上报异常
  如果有必要的话，你可以把异常信息和日志，上报给监控服务器，然后集中分析。我每天上班第一件事，
  就是打开监控系统，看错误日志，然后对症下药解决问题。
