# 全栈 & AI之路

## 是什么

1. 我理解全栈工程师，是一个人需要会做前端、后端、AI应用、部署、运维的技术方案设计与落地
2. 并且能够解决生产环境的各种边界情况、疑难问题，消除潜在隐患，如各个模块的高并发、高可用、高性能等
3. 做**企业级的AI应用项目而不是Demo**：真正值钱的东西不只是调用 AI和大模型 接口去实现AI应用，如智能客服、RAG系统，还要**考虑解决企业级的实际业务问题**，如
   - 数据量大了怎么办, 上百万，上千万数据，怎么查的更快？
   - 并发上来了怎么解决？
   - 用户自然语言模糊，如何精确识别用户意图？
   - 如何让模型输出东西，与公司的业务如报表、工作流、接口，进行打通，实现自动化的业务流程？
   - AI 接口谁都能调，真正值钱的是，你能不能**把AI能力封装塞进你的业务系统中**，为你干活，帮公司赚钱，省钱提效？

## 为什么要做全栈工程师

1. **AI推动**：AI生成代码的能力，让一个懂前后端的人能做全栈所有的活，所以企业为了利益考虑，更倾向招全栈工程师；当然，纯前端和纯后端的专家也是非常需要的，因为全栈工程师在某些深水区不如专业的纯前端/纯后端。
2. **个人发展**：
   - 更兼容公司的需要，你要什么我有什么，不容易失业
   - 可以利用 AI 快速将想法落地实现，自己做一些应用
3. **企业需要**：企业用一个全栈用人成本更低，全栈也可以去做AI应用，为企业的AI事业创造价值。

## 转型全栈的可行性

### 语言是相通的

先从熟悉的开始，前端用 Nest.js 弄清楚企业级 Web 后台服务的开发流程，再去学习Python， java ，在 AI 的加持下应该会非常快上手

```text
Node.js
    框架：nest.js(express, koa)
    数据库：postgresql（orm-, typeorm, prisma）, mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitmq, Kafka
        权限系统：jwt, oauth2
        文件存储：oss bucketfs
    AI agent: langchain, langgraph, Deep, agents

Python
    基础：语法，条件判断，循环，函数
    框架：Django FastAPI Flask
    数据库：postgresql（orm-, typeorm, prisma）, mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitmq, Kafka
        权限系统：jwt, oauth2
        文件存储：oss bucketfs
    AI agent: langchain, langgraph, Deep, agents
Java
    基础：语法，条件判断，循环，函数
    框架：spring boot， spring cloud
    数据库：postgresql（orm-, typeorm, prisma）, mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitmq, Kafka
        权限系统：jwt, oauth2
        文件存储：oss bucketfs
    AI agent: langchain, langgraph, Deep, agents
```
