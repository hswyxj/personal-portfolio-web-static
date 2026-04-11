# 个人项目案例展示网站设计方案

## 1. 概述 (Overview)
一款基于 Next.js 开发的个人/团队项目案例展示网站，采用前后端一体化架构。旨在通过直观、专业且富有创意的视觉设计，向潜在客户展示项目经验，提升团队专业形象，降低沟通成本。网站将包含前端展示页面和安全的后台管理系统，部署在 Vercel 平台上。

## 2. 核心功能 (Core Features)

### 2.1 访客端 (Public Facing)
- **个人/团队信息区**: 展示姓名、微信（可点击复制或弹窗显示二维码）、邮箱、简介和核心技能标签。
- **案例展示区 (瀑布流)**: 采用不规则排列的瀑布流布局，支持按不同尺寸展示案例卡片，增强层次感。
- **分类筛选**: 提供网站、大屏可视化、管理后台、小程序、APP、H5等分类标签，点击可平滑过滤案例。
- **交互动效**: 
  - 案例卡片悬停 (Hover) 效果：图片放大、信息叠加展示（项目名称、技术栈、简介）。
  - 滚动进入视口的动画效果。
  - 页面加载和路由切换的过渡动画。
- **响应式设计**: 完美适配手机、平板和桌面端显示。

### 2.2 管理后台 (Admin Dashboard)
- **身份验证**: 基于 Supabase Auth 的管理员登录。
- **信息管理**: 编辑个人信息（简介、技能标签等）。
- **案例管理**: 
  - 添加/编辑/删除项目案例。
  - 上传案例封面图至 Supabase Storage。
  - 设置案例标题、描述、分类标签、项目链接。

## 3. 技术栈选型 (Technology Stack)

### 3.1 核心框架
- **Next.js (App Router)**: React 框架，提供服务端渲染 (SSR)、静态站点生成 (SSG) 及内置 API 路由功能。
- **TypeScript**: 提供强类型支持，提高代码可维护性和稳定性。

### 3.2 样式与动效
- **Tailwind CSS**: 实用优先的 CSS 框架，快速构建响应式界面。
- **Framer Motion**: 强大的 React 动画库，用于实现复杂的创意/动效丰富风格（如页面转场、瀑布流过滤动画、滚动动画）。
- **Lucide React**: 简洁美观的图标库。

### 3.3 数据与存储 (Backend as a Service)
- **Supabase**: 
  - **PostgreSQL Database**: 存储个人信息和案例数据。
  - **Authentication**: 提供安全的管理员登录。
  - **Storage**: 存储上传的案例图片资源。

### 3.4 部署
- **Vercel**: 无缝集成 Next.js，支持一键自动化部署和持续集成。

## 4. 架构与数据流 (Architecture & Data Flow)

1. **访客访问首页**: Next.js 通过服务端组件 (RSC) 直接从 Supabase 数据库拉取个人信息和案例列表，渲染 HTML 并返回，保证首屏加载速度和 SEO。
2. **过滤与交互**: 客户端组件使用 Framer Motion 处理用户的筛选操作和复杂的悬停/滚动动画。
3. **管理员操作**: 
   - 访问 `/admin` 路由，被中间件 (Middleware) 拦截，验证 Supabase Session。
   - 登录后，前端通过 Supabase Client 直接与数据库和存储桶交互，进行数据的增删改查和图片上传。

## 5. 数据库设计 (Database Schema - Supabase)

初步设计两个主要表：

### 5.1 `profile` 表 (个人/团队信息)
- `id` (uuid, primary key)
- `name` (text): 姓名/团队名
- `wechat` (text): 微信号
- `email` (text): 邮箱
- `bio` (text): 个人简介
- `skills` (text[]): 技能标签数组

### 5.2 `projects` 表 (案例信息)
- `id` (uuid, primary key)
- `title` (text): 项目名称
- `description` (text): 项目简介
- `category` (text): 分类 (如：'网站', '大屏', 'APP' 等)
- `image_url` (text): Supabase Storage 中的图片链接
- `project_url` (text, nullable): 外部访问链接
- `created_at` (timestamp): 创建时间，用于排序
- `featured` (boolean): 是否推荐（可选，用于在瀑布流中放大显示）

## 6. 视觉与设计方向 (Visual Direction)
**风格: 创意/动效丰富风 (Creative & Motion-Rich)**
- 重点利用 Framer Motion 实现非对称布局和流畅的过渡动画。
- 瀑布流中的卡片大小可以根据 `featured` 字段或随机计算，打破常规网格的沉闷感。
- 悬停效果不仅仅是简单的缩放，可以加入遮罩层的平滑滑入、文字的错落浮现等细腻交互。
- 整体氛围要展现出“设计感强、擅长前端互动体验”的技术团队实力。

## 7. 测试与验证 (Testing Strategy)
- 确保 Supabase Row Level Security (RLS) 配置正确，公众只能读取数据，仅管理员能修改。
- 在不同分辨率（Mobile, Tablet, Desktop）下测试瀑布流的重新排列效果。
- 验证图片上传流程和 Vercel 部署后的 API 路由可用性。