# 前端转 Python 全栈之路 <Badge type="warning" text="Doing" />
> 实战中，敬请期待~~
## 为什么学Python
- 因为 Python 非常适合做企业级AI应用
- FastApi 简洁，高效，适合做api

## 计划

- **最终目标**：利用 `python` 熟悉整个前后端协作、部署、运维，拥有高性能、高并发、高可用等企业生产级完整项目流程
- **阶段目标**：做一个 `python` 企业级的AI应用，AI功能需支持智能客服、Rag知识库问答、AI agent等

## 步骤与进度
1. 先看官方文档，花20-30分钟看总体文档脉络，以后当字典查
2. 问 AI 学习简单入门教程，学完跟着敲，了解哪些模块是干嘛的，不会的也可以去查视频课程
3. 开始写一个Todo list CURD Demo，接入数据库如 postgresql, mysql, mongodb（orm框架、typeorm、 prisma）
4. 开始做完整的 Web 服务API接口， 包含用户登录注册，jwt权限系统，RBAC的角色权限模块，用户/企业等模块的CURD等
5. 开始考虑进阶的性能优化，如缓存redis, 中间件如消息队列 rabbitmq、kafka
6. 开始接入AI 做流式输出，做智能客服
7. 做企业级Rag应用，如利用 langchain 等AI框架 做文档切片，向量化，向量检索等等

## 传参
|参数来源 |	声明方式 |	常见场景 |
| --- | --- | --- |
| 路径参数	| def f(id: int) |	RESTful |
| 查询参数	| Query(...) |	GET 筛选 |
| 表单字段	| Form(...) |	文件上传 |
| 文件	|File(...) |	上传 是从 form-data 文件字段​ 来的 |
| JSON Body	| Pydantic / Body(...) |	POST/PUT |
| Header	| Header(...) |	鉴权 |
| Cookie |	Cookie(...) |	会话 |

- File(...)        # 必传文件
- File(None)       # 可选文件

```Python
from fastapi import FastAPI, File, UploadFile, Form, Query

app = FastAPI()

@app.post("/upload")
async def upload(
    file: UploadFile = File(...),    # 必传文件 form-data 文件字段
    doc_type: str = Form(...), # 必传 form-data 字段
    description: str | None = Form(None), # 可选
    user_id: int = Query(...), # 必传 GET筛选 查询参数
):
    content = await file.read()
    return {
        "filename": file.filename,
        "doc_type": doc_type,
        "description": description,
        "user_id": user_id,
        "file_size": len(content),
    }
```


