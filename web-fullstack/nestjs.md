# 前端转 Nest.js 全栈之路 <Badge type="warning" text="Doing" />

## 为什么转全栈
1. AI趋势下，AI可以快速生成Vue/React等前端代码，前端门槛下降，后端程序员，甚至不会代码的小白也能几句话生成前端页面，所以普通前端不好找工作了。
2. 求职卡点：一般的公司工资低，好点的公司卡一本以上学历，剩下都是前端外包不稳定。
3. 供大于求：今年高效毕业生1270w好像，非常多，被裁员的老程序员也在竞争；企业互相竞争，员工工资支出是一个大头，能用一个AI全栈，为什么要单独招一个纯前端。
4. 寻找出路：转型AI全栈成了新的生存之路。

## 机遇
1. 转型的阵痛是真实存在的
    - 时间上：市场忽然转向，导致前端程序员无法迅速转型全栈，导致空窗期拉长
    - 技术上：因为前端页面大多是可用言语描述的，后端java程序员利用AI+prompt提示词很快上手前端页面，而前端面对后端不可见的服务，往往难以迅速上手，需要更长时间学习后端。
    - 转行：前端转后端的距离，最多半年；而转行，虽然也可行，但一下子跨度太大，容易“扯蛋”。开玩笑，转行过去，到新行业就是一有做事软技能的“小白”；如果能继续做程序员，那就继续，在工作之余，去发展新行业的技能；
2. 但AI全栈之风今年刚刚兴起，也是我们程序员的机遇。AI总要人去控制它去编程吧，人要去指哪 它打哪，它打得准，但是它还是需要人指挥的，前提是你要会指挥，那才行。
    - 做前端页面可用AI做，但你要懂业务，懂描述，稍微懂点前端基础知识，懂审查代码
    - 做后台服务可用AI做，但你要懂业务，懂后端技术，懂部署，懂运维，懂高并发，高性能等等，更要懂做AI应用。

## 为什么先转 nest.js 全栈
1. **语法相同**：前端熟悉js 和 node.js，语法熟悉，设计模式类似
2. **小步快走**: 先转 nest.js 更快，而且企业级，熟悉后端技术后再学Python 转战AI应用，工作之后，有余力再去攻坚 java，
3. **语言相通**：nest.js, python, java 其实在很多方面都是一个道理，学习一个，入门其他后端语言非常快
```text
Node.js
    框架：Nest.js(express, koa)
    数据库：Postgresql（orm-, typeOrm, prisma）, Mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitMQ, Kafka
        权限系统：jwt, oauth2
        文件系统：oss buckets 
    AI agent: langchain, langgraph, Deep, agents    

Python
    基础：语法，条件判断，循环，函数
    框架：FastApi
    数据库：Postgresql（orm-, typeOrm, prisma）, Mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitMQ, Kafka
        权限系统：jwt, oauth2
        文件系统：oss buckets 
    AI agent: langchain, langgraph, Deep, agents 
Java
    基础：语法，条件判断，循环，函数
    框架：spring boot， spring cloud
    数据库：Postgresql（orm-, typeOrm, prisma）, Mysql, mongodb
    缓存：redis
    工具库, 中间件
        消息队列: rabbitMQ, Kafka
        权限系统：jwt, oauth2
        文件系统：oss buckets 
    AI agent: langchain, langgraph, Deep, agents 
```
