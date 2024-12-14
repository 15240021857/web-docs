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
    export async function asyncFunWithTrycatch(asyncFun, opts) {
      const { success, fail, complete } = opts || {};
      try {
        const res = await asyncFun;
        success && success(res);
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

### Sentry 第三方监控系统

- 前端异常监控之 的部署和使用

#### sentry 异常监控

- 现状
  被动应对：线上问题靠测试和客户工单，客户发现问题或投诉。
- 解决什么问题？
  - 实时感知：线上问题
  - 主动定位错误，行为还原
  - 埋点分析，热力分析，业务发展提供数据依据
- 考量

  - 报错信息的全面和 性能消耗的取舍
  - 获取异常信息自动上报

- 异常采集哪些内容
  - 1.用户信息，当前时刻的状态，权限，那个设备端
  - 2.用户所在界面路径，执行哪些操作，操作时使用的哪些数据
  - 3.异常信息:操作 dom 元素，stack 堆栈信息，异常类型，级别
  - 4.环境信息：网络环境，设备信号，客户端版本，api 接口版本等
- 异常捕获
  - 代码块 try-catch：只能捕获同步运行错误，缺点：语法、异步错误无法捕捉
  - window.onerror: 全局捕获，缺点: 无法捕获异步, 无法网络资源加载错误
    无法捕获跨域资源错误
  - window.addEventListener("error"): 跟 onerror 一样，多一个网络资源错误
    跟 onerror 有重复
  - window.addEventListener("unhandledrejection"): 捕获 promise 异常
  - iframe 异常：借助 window.onerror
  - 崩溃和卡顿：
    - window.load 和 window.beforeload
    - sevice worker 开启一个线程去 网页崩溃的监控
  - 第三方库的捕获：
    - vue.config.errorHandler 和 React ErrorBoundary
- 统计分析
- 报告告警：
  - 生成报表：日、周，月 报表
  - 邮件
- Sentry 哨兵
  - 监控项目运行状态，而不依赖于用户上报和反馈
  - 主动发现产线问题，快速修复 bug
  - npm 下载量，这两年稳步上升
  - 打包后 20K，比较小
  - saas 版本，私有化部署
  - 集成 gitlab,git hook
