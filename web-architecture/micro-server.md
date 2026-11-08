# 微服务架构


## 分布式架构 VS 微服务架构
### 核心差异
- **分布式抗并发**（部署），技术拆分，抗住并发，故障隔离，稳定可靠
    - 比如部署多个单体，数据库多几个实例，缓存多几个实例，提升系统可用性。
- **微服务理业务**（业务），业务拆分，模块清晰，独立迭代，快速交付，互不干扰，
    - 针对复杂业务，如订单，支付，库存，用户独立开发部署。
### 选型
- 小项目用单体，简单分布式，避免运维灾难
- 避免微服务拆的太细，导致运维灾难

## 典型nginx微服务
**项目目录**
```text
├── docker-compose.yml
├── nginx/
│   └── nginx.conf
├── api-gateway/        # NestJS
│   ├── Dockerfile
│   └── src/
└── user-service-py/    # Python FastAPI
    ├── Dockerfile
    ├── main.py
    └── requirements.txt
```

**nginx配置**
```nginx.conf
http {
    upstream user_service {
        server user-svc1:8000;
        server user-svc2:8000;
    }

    upstream order_service {
        server order-svc1:9000;
        server order-svc2:9000;
    }

    server {
        listen 80;

        location /api/users/ {
            proxy_pass http://user_service/;
        }

        location /api/orders/ {
            proxy_pass http://order_service/;
        }

        location /gateway/ {
            proxy_pass http://api-gateway/;
        }
    }
}
```

> upstream = 后端服务集群的“名字”，后端服务组 + 负载均衡

> Nginx = 微服务最外层的“交通警察”, 流量入口 + 路由分发

