# RedNote-Frontend

小红书的前端部分。

后端地址：[RedNote-Backend](https://github.com/BeAWitch/RedNote-Backend)。

> 本项目为软件工程专业的毕业设计，水平有限，不嫌弃可以直接拿去用。

> 不太会写前端，代码挺丑陋的。目前还没有同步后端的 AI 功能。

## 项目概览

RedNote-Frontend 是一个受小红书启发的基于微服务架构的社交媒体平台的前端部分。它采用 Vue3 构建，提供了一个功能全面的社交网络平台，包括内容创作、社交互动、实时消息、AI 辅助和个性化推荐等功能。

AI 生成的项目文档：

- 中文：

  - [前端 | RedNote-Frontend | Zread](https://zread.ai/BeAWitch/RedNote-Frontend)

  - [后端 | RedNote-Backend | Zread](https://zread.ai/BeAWitch/RedNote-Backend)

- 英文：
  - [前端 | RedNote-Frontend | DeepWiki](https://deepwiki.com/BeAWitch/RedNote-Frontend)
  - [后端 | RedNote-Backend | DeepWiki](https://deepwiki.com/BeAWitch/RedNote-Backend)

### 技术栈

| 技术                          | 版本   | 简介                                            |
| ----------------------------- | ------ | ----------------------------------------------- |
| **Vue 3**                     | 3.5.22 | 采用 Composition API 的渐进式 JavaScript 框架。 |
| **TypeScript**                | 5.9.0  | 静态类型检查以增强代码质量。                    |
| **Vite**                      | 7.1.11 | 快速构建工具和开发服务器。                      |
| **Pinia**                     | 3.0.3  | Vue 的直观状态管理。                            |
| **Vue Router**                | 4.6.3  | Vue 的官方路由解决方案。                        |
| **Element Plus**              | 2.11.7 | Vue 3 UI 组件库。                               |
| **Axios**                     | 1.13.2 | 用于 API 通信的 HTTP 客户端。                   |
| **vue-waterfall-plugin-next** | 3.0.0  | 响应式瀑布流网格布局。                          |

### 项目结构

```shell
rednote-frontend/
├── src/
│   ├── assets/            # 静态资源 - 图片、字体、Logo。
│   ├── apis/              # 集中式 axios 请求函数。
│   ├── components/        # 可重用的 Vue 组件。
│   ├── constants/         # 应用程序级常量。
│   ├── router/            # Vue Router 配置。
│   ├── stores/            # Pinia 状态管理。
│   ├── styles/            # 全局 CSS 样式。
│   ├── types/             # TypeScript 类型定义。
│   ├── utils/             # 工具函数。
│   └── views/             # 页面级组件。
├── public/                # 直接提供的静态文件。
└── Configuration Files    # Vite、TypeScript、ESLint 配置。
```

