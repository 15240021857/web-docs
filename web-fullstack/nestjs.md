# 前端转 Nest.js 全栈之路 <Badge type="warning" text="Doing" />

## 为什么转全栈

- AI趋势下，**AI可以快速生成Vue/React等前端代码，前端门槛下降**，后端程序员，甚至不会代码的小白也能几句话生成前端页面，所以**只会 CURD 的普通前端不好找工作了**。
- 寻找出路：
  1.  深耕前端：**沉淀前端技术与项目经验，成为前端专家**，再利用AI帮我们做更好、更快的、更专业的前端页面。这条路竞争激烈，需要有技术深度。
  2.  **转型`AI + 全栈`**：全栈做的好的人，目前相对不多，成了**新的机遇**之路。
      - 大多是后端程序员用AI做前端页面的人，对前端不精。
      - **而前端去转全栈，对前端精通**，不去碰后端深水区，也不碰AI算法，**而去深耕AI应用**，为企业AI应用赋能，应该是一条不错的全栈之路。
  3.  转其他行：跨度太大，不如先把本行稳住来得快。

> 风浪来袭，只有踏浪而行

## 转型阵痛与机遇

1. 转型的阵痛是真实存在的
   - 时间上：**市场忽然转向，很多公司随大流**，导致前端岗位急剧减少，全栈岗迅速增多，而前端程序员无法迅速转型全栈，导致空窗期拉长，或失去方向。
   - 技术上：
     - **后端工程师补齐前端容易**，因为**前端页面大多是可用言语描述**的，后端程序员利用AI+prompt提示词很快上手前端页面
     - **前端补齐后端不容易**，往往难以短时间上手。
2. 机遇：**有难度，所以更值钱**

## 为什么先转 Nest.js 全栈

1. **语法相同**：前端熟悉js 和 Node.js，语法熟悉，设计模式类似
2. **小步快走**: 先转 Nest.js 更快，而且企业级服务端框架，熟悉后端技术后再学 Python 转战AI应用，最后工作之后，有余力再去攻坚 Java
3. **语言相通**：Nest.js, Python, Java 其实在很多方面都是一个道理，学习一个，入门其他后端语言非常快

## 计划与目标

- **最终目标**：利用 `Nest.js` 熟悉整个前后端协作、部署、运维，拥有高性能、高并发、高可用等企业生产级完整项目流程
- **阶段目标**：做一个 `Nest.js` 企业级的AI应用，包括基础的Web服务API, 还包含 AI 功能需支持智能客服、Rag知识库问答、AI agent等

### 步骤与进度

1. 先看官方文档，花20-30分钟看总体文档脉络，以后当字典查
2. 问 AI 学习简单入门教程，学完跟着敲，了解哪些模块是干嘛的，不会的也可以去查视频课程
3. 开始写一个Todo list CURD Demo，接入数据库如Postgresql, MySql, Mongodb（Orm框架、typeOrm、 prisma）
   - 用 typeOrm 连接数据库，熟悉操作，实现CURD, 联表查询，事务等
   - 用 prisma 连接数据库，熟悉操作，实现CURD, 联表查询，事务等
4. 开始做完整的 Web 服务API接口， 包含用户登录注册，jwt权限系统，RBAC的角色权限模块，用户/企业等模块的CURD、统一错误和响应处理等
5. 开始考虑进阶的性能优化，如缓存Redis, 中间件如消息队列 RabbitMq、kafka
6. 开始接入AI 做流式输出，做智能客服
7. 做Rag应用，如利用 langchain 等AI框架 做文档切片，向量化，向量检索，

## Nest 核心思想：AOP 面向切面编程

1. 首先看下 nest.js 的请求流程

```text
请求进来
  ↓
① Middleware（全局，"知道有人来了，不知道路由"，对所有请求处理，如设置CORS响应头、日志、body解析、白名单等）
  ↓
② Guard（守卫："能不能进"，如权限/角色鉴权）
  ↓
③ Pipe（管道："进来之前对不对"，参数校验/转换，如将字符串转为数字、日期转为日期对象等）
  ↓
④ Interceptor（before 拦截器："进之前做点事"，如日志等）
  ↓
⑤ Controller 方法（业务逻辑："进来做正事"）
  ↓
⑥ Interceptor（after 拦截器："出之前做点事"，如日志、捕获返回值、捕获异常、转换返回格式）
  ↓
⑦ ExceptionFilter（异常过滤器："出事了怎么兜底"，如捕获并返回异常信息）
  ↓
响应返回
```

2. Nest.js 参考AOP思想，在请求/方法中，把一些公共的、重复的、**非业务逻辑从业务代码中抽（切）出来**，如权限校验、参数校验、日志、异常处理等，按职责**切分**成Guard、Pipe、Interceptor、ExceptionFilter等。再通过装饰器挂到Controller或方法上，**让业务方法只关注业务逻辑**，实现关注点分离。
   <!-- - Middleware：全局中间件，对所有请求进行处理，如设置响应头、日志记录等 -->
   - Guard：校验请求参数是否符合要求，如是否登录、是否有权限等
   - Pipe：对请求参数进行转换，如将字符串转换为数字、将日期转换为日期对象等
   - Interceptor：对响应进行包装，如添加响应头、格式化响应数据等
   - ExceptionFilter：处理异常，如捕获并返回异常信息

## Nest 核心模块笔记

#### nest cli命令行

1. nest --help 查询命令
2. 创建
   - nest g mo user 创建模块
   - nest g co user 创建控制器
   - nest g res user 创建用户模块资源，包括 dto + entities + module + controller + service
3. nest g mi xxx 创建中间件
4. nest g pi login 创建管道

#### provider 提供者

1. 在service里`@injectable` 定义 要注入的服务类
2. 在module里将服务写入providers数组中， module算是IoC容器，管理类
3. 在controller里用服务（`@inject`的简写可隐藏）

#### module 模块

1. 通过 `@module` 定义一个类/一个数组/一个值
2. 通过 在 `@module` 装饰器参数的 `imports: [UserModule, ListModule]`传入其他模块
3. 通过 providers 传入自己依赖注入的 Service 服务
4. 通过 exports 导出自己的 Service, 供其他模块的 Controller 使用

#### middleware 中间件

- 全局中间件
  - 第三方：express 的`cors：app.use(cors())`
  - 自定义：express 的全局自定义中间件 req, res, next
- module 模块局部中间件，需要自定义，用到依赖注入
  - `@injectable` 去定义 中间件有三个参数 req, res, next
  - module 类 implements 实现 NestModule 的 configure 形参对象
    - configure 的 `comsumer.apply(中间件).forRoutes(传入要命中的路由规则)`
    - 路由规则如：`'user' / userController`去拦截user路径 或user控制器所有路由
    - 还可以传入对象，指定`{path， method}`

#### Rxjs

一个js工具包，提供 Observable 观察者模式

#### staticAssets 静态资源服务器

1. `app.useStaticAssets(join(__dirname, 'images'), { prefix: '/xiaoman' })`

#### interceptors 拦截器：响应拦截器

```ts
intercept(context: ExecutionContext, next: CallHandler) {
  const handler = context.getHandler();     // ✅ 知道是哪个方法
  const controller = context.getClass();     // ✅ 知道是哪个 Controller
  const roles = this.reflector.get('roles', handler); // ✅ 读元数据
  const req = context.switchToHttp().getRequest();

  // ✅ 能包装返回值
  return next.handle().pipe(
    map(data => ({ code: 0, data, msg: 'ok' }))
  );
}
```

1. 定义一个 `class Response` 统一响应拦截器，需 `implements 实现 NestInterceptor`
2. 然后用 `@Injectable()` 装饰 作为依赖注入类
3. 在 `main.js` 中添加中间件 `app.useGlobalInterceptors(new Response())`

#### filters 异常过滤器：

1. 例如定义一个异常过滤器 `class HttpExceptionFilter` 统一处理异常，需 `implements 实现 ExceptionFilter`
2. 用`@catch(HttpException)` 装饰，作异常捕获
3. 在 `main.js` 中添加中间件过滤器 `app.useGlobalFilters(new HttpExceptionFilter())`

#### pipe 管道：参数校验/转换

1. 转换 前端传入字符串，管道可以转成number
   [参考内置管道](https://www.nestjs.com.cn/pipes#built-in-pipes)
2. 验证 DTO 验证：
   - 在 `DTO` 文件中用装饰器 对参数 进行约束
   - 在 `main.js` 中设置全局验证管道 `app.useGlobalPipes(new ValidationPipe());` 直接验证全局的验证异常

#### guards 守卫：权限校验/角色校验

在进入路由访问之前，比如检查一下，是否有权限访问

1. 在局部 controller 中，用 `@UseGuards(RoleGuard)` 去添加
2. 在全局 `main.js`中，用 `app.useGlobalGuards(new RolesGuard());`
3. 可以用cli命令生成guard文件 `nest g gu role`
4. 方法装饰器`@Roles`精确到给每个controller的路由，增加角色权限控制 然后在`Gruard`守卫里用`reflector`反射去取值，如

```ts
@@filename(cats.controller)
@Post()
@Roles(['admin'])
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
@@switch
@Post()
@Roles(['admin'])
@Bind(Body())
async create(createCatDto) {
  this.catsService.create(createCatDto);
}
```

#### decorators 自定义装饰器

1. 通过命令行去创建 `nest g d role`
2. [装饰器官方用法](https://www.nestjs.com.cn/custom-decorators#param-decorators)
3. `createParamDecorator` 属性装饰器

#### nest.js 连接数据库

nest.js 连接数据库，对app的数据进行表的定义和数据的存储

1. 连接mysql、postgrsql、mongodb, 用orm框架（typeORM、prisma、sequelize）去封装的方法去操作数据库，代替sql语句
2. 连接步骤：先安装 mysql/postgresql + orm框架 > 在app.module连接sql > 创建Test entity > 在test的module下引入entity, orm会帮我们为 Test entity 创建表Test
3. mysql的命令行：
   - 登录mysql: mysql -uroot -p
   - 查看表：show databases
   - 切表：use xxx
   - 看表：show tables
   - 看表字段结构：desc xxx

#### 用`typeORM` 连接并操作 `mysql` 数据库

1. 安装 typeORM 框架
   - `npm install typeorm mysql2`
2. 在 app.module 中连接数据库, 配置数据库连接信息
3. 创建 Test entity，在 test.module 中引入 entity
4. 在 app.module 中引入 test.module, 测试test的api 如何操作数据库
5. 后端测试成功
6. 前端利用`vue + ant-design-vue` 创建项目，实现简单 `列表 + 搜索 + 分页` 功能
7. 调用后端接口，实现真实数据的获取和展示

#### join 联表查询

#### transaction 事务

1. 事务：指数据库操作的原子性、一致性、隔离性、持久性
2. 如何添加？
3. 写个例子：例如小吴向小钱转账200员，必须确保金额增减都成功，否则转账失败，金额都还原。

## AI 应用
