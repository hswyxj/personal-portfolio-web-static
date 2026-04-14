# API Routes 重构实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将分散在页面组件中的 Supabase API 调用抽取到统一的 Next.js Route Handlers

**Architecture:** 使用 Next.js App Router 的 Route Handlers 统一管理 API，支持速率限制，图片上传使用 Supabase Storage

**Tech Stack:** Next.js 16, TypeScript, Supabase

---

### Task 1: 速率限制工具

**Files:**
- Create: `src/lib/rate-limit.ts`

- [ ] **Step 1: 创建速率限制工具**

```typescript
// src/lib/rate-limit.ts

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitRecord>();

// 简单内存速率限制
export function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// 获取客户端 IP
export function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded ? forwarded.split(',')[0].trim() : 'unknown';
}
```

---

### Task 2: 统一 API 响应格式工具

**Files:**
- Create: `src/lib/api-response.ts`

- [ ] **Step 2: 创建 API 响应工具**

```typescript
// src/lib/api-response.ts

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

export function successResponse<T>(data: T, status: number = 200): Response {
  return Response.json({ success: true, data } as ApiResponse<T>, { status });
}

export function errorResponse(code: string, message: string, status: number = 400): Response {
  return Response.json({ success: false, error: { code, message } } as ApiResponse, { status });
}

export function unauthorizedResponse(): Response {
  return errorResponse('UNAUTHORIZED', 'Authentication required', 401);
}

export function notFoundResponse(message: string = 'Resource not found'): Response {
  return errorResponse('NOT_FOUND', message, 404);
}
```

---

### Task 3: Auth API (登录/登出)

**Files:**
- Create: `src/app/api/auth/route.ts`

- [ ] **Step 3: 创建认证 API**

```typescript
// src/app/api/auth/route.ts
import { createClient } from '@/lib/supabase/server';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function POST(request: Request) {
  const ip = getClientIp(request);

  // 速率限制: 5次/15分钟
  if (!checkRateLimit(`auth:${ip}`, 5, 15 * 60 * 1000)) {
    return errorResponse('RATE_LIMITED', 'Too many login attempts, please try again later', 429);
  }

  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return errorResponse('VALIDATION_ERROR', 'Email and password are required');
    }

    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return errorResponse('AUTH_FAILED', error.message, 401);
    }

    return successResponse({
      user: { id: data.user.id, email: data.user.email }
    });
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}

export async function DELETE() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return successResponse({ message: 'Logged out successfully' });
}
```

---

### Task 4: Profile API

**Files:**
- Create: `src/app/api/profile/route.ts`

- [ ] **Step 4: 创建 Profile GET API**

```typescript
// src/app/api/profile/route.ts (GET)
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .limit(1)
    .single();

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to fetch profile');
  }

  return successResponse(data);
}
```

- [ ] **Step 5: 创建 Profile PATCH API**

```typescript
// src/app/api/profile/route.ts (PATCH 部分，合并到同一文件)
export async function PATCH(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    // 简单手动校验
    const allowedFields = ['name', 'wechat', 'email', 'bio', 'skills'];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to update profile');
    }

    return successResponse(data);
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}
```

---

### Task 5: Projects API (列表/创建)

**Files:**
- Create: `src/app/api/projects/route.ts`

- [ ] **Step 6: 创建 Projects GET API**

```typescript
// src/app/api/projects/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse } from '@/lib/api-response';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  const supabase = await createClient();

  let query = supabase.from('projects').select('*').order('created_at', { ascending: false });

  if (category && category !== '全部') {
    query = query.eq('category', category);
  }

  if (featured === 'true') {
    query = query.eq('featured', true);
  }

  const { data, error } = await query;

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to fetch projects');
  }

  return successResponse({ projects: data || [] });
}
```

- [ ] **Step 7: 创建 Projects POST API**

```typescript
// src/app/api/projects/route.ts (POST 部分)
export async function POST(request: Request) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    // 简单手动校验
    const { title, description, category, image_url, project_url } = body;

    if (!title || !category || !image_url) {
      return errorResponse('VALIDATION_ERROR', 'Title, category, and image_url are required');
    }

    const { data, error } = await supabase
      .from('projects')
      .insert({
        title,
        description: description || '',
        category,
        image_url,
        project_url: project_url || null,
      })
      .select()
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to create project');
    }

    return successResponse(data, 201);
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}
```

---

### Task 6: Single Project API

**Files:**
- Create: `src/app/api/projects/[id]/route.ts`

- [ ] **Step 8: 创建单个项目 CRUD API**

```typescript
// src/app/api/projects/[id]/route.ts
import { createClient } from '@/lib/supabase/server';
import { successResponse, errorResponse, unauthorizedResponse, notFoundResponse } from '@/lib/api-response';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return notFoundResponse();
  }

  return successResponse(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();

    const allowedFields = ['title', 'description', 'category', 'image_url', 'project_url', 'featured'];
    const updateData: Record<string, any> = {};

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        updateData[field] = body[field];
      }
    }

    const { data, error } = await supabase
      .from('projects')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return errorResponse('DB_ERROR', 'Failed to update project');
    }

    return successResponse(data);
  } catch (e) {
    return errorResponse('INTERNAL_ERROR', 'Server error');
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return unauthorizedResponse();
  }

  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) {
    return errorResponse('DB_ERROR', 'Failed to delete project');
  }

  return successResponse({ message: 'Project deleted' });
}
```

---

### Task 7: 修改首页调用 API

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 9: 修改首页使用 API**

```typescript
// src/app/page.tsx 修改后
import HeroProfile from '@/components/HeroProfile';
import ProjectGallery from '@/components/ProjectGallery';

const mockProfile = {
  id: '1',
  name: 'Creative Studio',
  wechat: 'studio_wechat',
  email: 'hello@studio.com',
  bio: 'We build digital experiences that matter.',
  skills: ['Next.js', 'React', 'Framer Motion', 'UI/UX']
};

const mockProjects = [
  { id: '1', title: 'Corporate Site', description: 'Modern corporate website with elegant design and smooth animations.', category: '网站', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '2', title: 'Data Dash', description: 'Comprehensive data analytics dashboard for enterprise users.', category: '大屏可视化', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', featured: true, created_at: '', project_url: null },
  { id: '3', title: 'E-commerce App', description: 'Mobile shopping experience with AR features.', category: 'APP', image_url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '4', title: 'Admin Pro', description: 'Backend management system with complex permissions.', category: '管理后台', image_url: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=800&q=80', featured: false, created_at: '', project_url: null },
  { id: '5', title: 'Coffee Shop Mini Program', description: 'Order and pickup coffee easily.', category: '小程序', image_url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80', featured: false, created_at: '', project_url: null },
];

async function getProfile() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/profile`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success) return json.data;
  } catch (e) {}
  return mockProfile;
}

async function getProjects() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ''}/api/projects`, { cache: 'no-store' });
    const json = await res.json();
    if (json.success) return json.data.projects;
  } catch (e) {}
  return mockProjects;
}

export default async function Home() {
  const [profile, projects] = await Promise.all([getProfile(), getProjects()]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30 pt-10">
      <HeroProfile profile={profile} />
      <ProjectGallery projects={projects} />
    </main>
  );
}
```

---

### Task 8: 修改登录页调用 API

**Files:**
- Modify: `src/app/login/page.tsx`

- [ ] **Step 10: 修改登录页使用 API**

```typescript
// src/app/login/page.tsx 修改后
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const json = await res.json();

    if (!json.success) {
      setError(json.error?.message || 'Login failed');
    } else {
      router.push('/admin');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white">
      <form onSubmit={handleLogin} className="w-full max-w-md p-8 bg-zinc-900 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/30 transition-colors" required />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-white/30 transition-colors" required />
          </div>
          <button type="submit" className="w-full bg-white text-black font-semibold rounded-lg px-4 py-2 hover:bg-gray-200 transition-colors mt-4">
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
```

---

### Task 9: 修改 admin layout

**Files:**
- Modify: `src/app/admin/layout.tsx`

- [ ] **Step 11: 修改 admin layout 移除直接 Supabase 调用**

```typescript
// src/app/admin/layout.tsx 修改后
import { ReactNode } from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // 认证由 middleware 处理，这里可以简化或保留检查
  // middleware.ts 已经处理了 /admin 的重定向

  // 可选：可以通过 /api/auth 验证，这里暂时保持现状
  // 如果需要获取用户信息，可以调用 API

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
        <nav className="space-y-4 flex-1">
          <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors">Profile</Link>
          <Link href="/admin/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
        </nav>
      </aside>
      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}
```

---

### 验证步骤

- [ ] 运行 `npm run dev` 启动开发服务器
- [ ] 访问 `http://localhost:3000` 验证首页正常加载
- [ ] 访问 `http://localhost:3000/api/profile` 验证 GET API
- [ ] 访问 `http://localhost:3000/api/projects` 验证 GET API
- [ ] 登录后访问 `/admin` 验证认证流程