# API Routes 重构设计方案

> **Status**: Draft — 等待用户审核

## 目标

将分散在各页面组件中的 Supabase API 调用抽取到统一的 Next.js Route Handlers (`src/app/api/`)，实现数据层统一管理。

## 当前 API 分布

| 文件 | API 调用 | 用途 |
|------|----------|------|
| `src/app/page.tsx` | `profiles.select()`, `projects.select()` | 首页获取项目列表 |
| `src/app/admin/layout.tsx` | `auth.getUser()` | 验证用户登录状态 |
| `src/app/login/page.tsx` | `auth.signInWithPassword()` | 登录认证 |

## 目标架构

```
src/app/api/
├── auth/
│   ├── route.ts        # POST /api/auth (登录)
│   └── route.ts        # DELETE /api/auth (登出)
├── profile/
│   ├── route.ts        # GET /api/profile (获取个人信息)
│   └── route.ts        # PATCH /api/profile (更新个人信息)
├── projects/
│   ├── route.ts        # GET /api/projects (获取项目列表)
│   └── route.ts        # POST /api/projects (创建项目)
└── projects/
    └── [id]/
        └── route.ts    # GET/PATCH/DELETE 单个项目
```

## API 详细设计

### 1. 认证 API

#### POST /api/auth
**请求体:**
```json
{
  "email": "string",
  "password": "string"
}
```
**响应 (200):**
```json
{
  "success": true,
  "user": { "id": "string", "email": "string" }
}
```
**响应 (401):** 登录失败

#### DELETE /api/auth
**响应 (200):** 登出成功

---

### 2. Profile API

#### GET /api/profile
**响应 (200):**
```json
{
  "id": "string",
  "name": "string",
  "wechat": "string",
  "email": "string",
  "bio": "string",
  "skills": ["string"]
}
```

#### PATCH /api/profile
**请求体:**
```json
{
  "name": "string",
  "wechat": "string",
  "email": "string",
  "bio": "string",
  "skills": ["string"]
}
```
**响应 (200):** 更新后的 profile

---

### 3. Projects API

#### GET /api/projects
**查询参数:** `?category=网站&featured=true`
**响应 (200):**
```json
{
  "projects": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "category": "string",
      "image_url": "string",
      "project_url": "string | null",
      "featured": "boolean",
      "created_at": "string"
    }
  ]
}
```

#### POST /api/projects
**请求体:**
```json
{
  "title": "string",
  "description": "string",
  "category": "string",
  "image_url": "string",
  "project_url": "string"
}
```
**响应 (201):** 创建的项目

#### GET /api/projects/:id
**响应 (200):** 单个项目

#### PATCH /api/projects/:id
**响应 (200):** 更新后的项目

#### DELETE /api/projects/:id
**响应 (200):** 删除成功

---

## 页面组件改造

### src/app/page.tsx
```tsx
// Before: 直接调用 Supabase
const { data } = await supabase.from('projects').select('*')

// After: 调用 API Route
const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/projects`)
const { projects } = await res.json()
```

### src/app/login/page.tsx
```tsx
// Before: 直接调用 Supabase
const { error } = await supabase.auth.signInWithPassword({ email, password })

// After: 调用 API Route
const res = await fetch('/api/auth', {
  method: 'POST',
  body: JSON.stringify({ email, password })
})
```

---

## 路由保护

- `GET /api/profile` — 公开（首页需要）
- `POST/PATCH/DELETE /api/profile` — 需要认证
- `GET /api/projects` — 公开
- `POST/PATCH/DELETE /api/projects` — 需要认证
- `POST/DELETE /api/auth` — 公开

认证通过 `Authorization: Bearer <token>` 头或 Session Cookie 验证。

---

## 错误处理

所有 API 响应统一格式:
```json
{
  "success": boolean,
  "data": any,        // 成功时返回
  "error": {          // 失败时返回
    "code": "string",
    "message": "string"
  }
}
```

---

## 实现步骤

1. 创建目录结构 `src/app/api/{auth,profile,projects}/`
2. 实现各 Route Handler
3. 添加统一错误处理中间件
4. 修改页面组件调用 API
5. 删除原有的直接 Supabase 调用

---

## 技术决策

- **请求验证**: 不使用 Zod，采用简单手动校验
- **速率限制**: 使用内存方案，对 `/api/auth` 登录接口限制
- **图片上传**: 使用 Supabase Storage，前端直传