# 全栈 & AI之路

## 是什么

1. 我理解全栈工程师，是一个人需要会做前端、后端、AI应用、部署、运维的技术方案设计与落地
2. 并且能够解决生产环境的各种边界情况、疑难问题，消除潜在隐患，如各个模块的高并发、高可用、高性能等
3. 做**企业级的AI应用项目而不是Demo**：真正值钱的东西不只是调用 AI和大模型 接口去实现AI应用，如智能客服、RAG系统，还要**考虑解决企业级的实际具体的业务问题**，如
   - 数据量大了怎么办, 上百万，上千万数据，怎么查的更快？
   - 并发上来了怎么解决？
   - 用户自然语言模糊，如何精确识别用户意图？
   - 如何让模型输出东西，与公司的业务如报表、工作流、接口，进行打通，实现自动化的业务流程？
   - AI 接口谁都能调，真正值钱的是，你能不能**把AI能力封装塞进你的业务系统中**，为你干活，帮公司赚钱，省钱提效？

**所以目标是：做企业级的AI应用项目，解决各种实际业务问题。**

## 如何转型
前端 -> 前端架构 -> 全栈(nest.js + python + java) -> AI agent

or 

前端 -> 前端架构 -> AI agent -> 全栈(nest.js + python + java)

### 转型时间

- 一个月 nest.js + python 从基础到企业级项目：包括语法，MVC架构+CURD, 数据库， orm(typeOrm, prisma), jwt, redis, 微服务，rabbitmq, kafka等 
- 再两周AI agent开发企业级AI应用
- 再两个月 java，包括spring boot, 微服务架构，分布式，高并发，高可用等

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
    AI agent: langchain, langgraph, Deep agent

Python
    基础：语法，条件判断，循环，函数
    框架： FastAPI > Flask > Django（按需）
    数据库：postgresql（SQLAlchemy / Tortoise ORM）, mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitmq, Kafka
        权限系统：jwt, oauth2
        文件存储：oss bucketfs
    AI agent: langchain, langgraph, Deep agent
Java
    基础：语法，条件判断，循环，函数
    框架：spring boot， spring cloud
    数据库：postgresql（MyBatis / MyBatis-Plus）, mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitmq, Kafka
        权限系统：jwt, oauth2
        文件存储：oss bucketfs
    AI agent: langchain, langgraph, Deep agent


other
    Docker / Docker Compose
    基础 Linux & Nginx
    OpenAPI（Swagger）
```
✅ python更适合：
- Python 是 AI / 脚本 / 工具链首选
- FastAPI 和 Node 的写法非常像，迁移成本低

✅ Java 更适合：
- 高并发
- 金融 / 电商 / 大型系统
- 强类型、强工程规范

**AI Agent细分**
```text
AI Agent（语言无关）
- Prompt Engineering
- RAG（向量数据库：Milvus / Qdrant / PGVector）
- Agent 架构（ReAct / Plan-and-Execute）
- LangGraph（工作流）
- MCP / Tool Calling
```

**学习地图**
```text
第一阶段：建立工程化思维（Node.js）
- NestJS
- REST / OpenAPI
- PostgreSQL + Redis
- JWT / OAuth2
- Docker

第二阶段：AI 工程化（Python）
- Python 基础
- FastAPI
- LangChain / LangGraph
- RAG / Vector DB
- Agent 设计模式

第三阶段：企业级后端（Java，可选）
- Spring Boot
- MyBatis / JPA
- MQ / 分布式基础
- 高并发 & 稳定性
```

