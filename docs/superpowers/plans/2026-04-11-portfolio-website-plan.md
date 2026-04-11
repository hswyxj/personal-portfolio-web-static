# 个人项目案例展示网站 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个基于 Next.js 和 Supabase 的个人/团队项目案例展示网站，包含创意动效的前端瀑布流展示和安全的后台管理。

**Architecture:** 前后端一体化 Next.js (App Router) 架构。前端使用 Tailwind CSS 和 Framer Motion 实现创意动效和响应式瀑布流布局。后端数据和图片存储依托于 Supabase，通过 Supabase Client 与 Next.js 交互。后台管理页面受 Supabase Auth 保护。

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, Framer Motion, Lucide React, Supabase (Database, Auth, Storage), Vercel.

---

### Task 1: 项目初始化与依赖安装

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.mjs` 等 Next.js 配置文件
- Create: `.env.local` (环境变量模板)

- [ ] **Step 1: 初始化 Next.js 项目**
  运行命令创建 Next.js 项目，使用 TypeScript, Tailwind CSS, App Router：
  ```bash
  npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
  ```

- [ ] **Step 2: 安装额外依赖**
  安装 Supabase 客户端、Framer Motion、Lucide React 和其他必要工具：
  ```bash
  npm install @supabase/supabase-js @supabase/ssr framer-motion lucide-react clsx tailwind-merge react-masonry-css
  ```

- [ ] **Step 3: 配置环境变量模板**
  创建 `.env.example` 文件：
  ```env
  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```

- [ ] **Step 4: 提交代码**
  ```bash
  git add .
  git commit -m "chore: initialize Next.js project and install dependencies"
  ```

### Task 2: Supabase 客户端配置与数据库类型定义

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/types/database.types.ts`

- [ ] **Step 1: 定义数据库类型**
  在 `src/types/database.types.ts` 中定义 Profile 和 Project 类型：
  ```typescript
  export type Profile = {
    id: string;
    name: string;
    wechat: string;
    email: string;
    bio: string;
    skills: string[];
  };

  export type Project = {
    id: string;
    title: string;
    description: string;
    category: string;
    image_url: string;
    project_url: string | null;
    created_at: string;
    featured: boolean;
  };
  ```

- [ ] **Step 2: 创建客户端 Supabase 实例**
  在 `src/lib/supabase/client.ts` 中：
  ```typescript
  import { createBrowserClient } from '@supabase/ssr'

  export function createClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  }
  ```

- [ ] **Step 3: 创建服务端 Supabase 实例**
  在 `src/lib/supabase/server.ts` 中：
  ```typescript
  import { createServerClient, type CookieOptions } from '@supabase/ssr'
  import { cookies } from 'next/headers'

  export function createClient() {
    const cookieStore = cookies()

    return createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value, ...options })
            } catch (error) {
              // The `set` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
          remove(name: string, options: CookieOptions) {
            try {
              cookieStore.set({ name, value: '', ...options })
            } catch (error) {
              // The `delete` method was called from a Server Component.
              // This can be ignored if you have middleware refreshing
              // user sessions.
            }
          },
        },
      }
    )
  }
  ```

- [ ] **Step 4: 提交代码**
  ```bash
  git add src/lib/supabase src/types
  git commit -m "feat: setup Supabase clients and types"
  ```

### Task 3: 首页 - 个人信息区 UI 组件

**Files:**
- Create: `src/components/HeroProfile.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 创建 HeroProfile 组件**
  在 `src/components/HeroProfile.tsx` 中实现带有 Framer Motion 动画的个人信息展示：
  ```tsx
  'use client';
  import { motion } from 'framer-motion';
  import { Mail, MessageCircle } from 'lucide-react';
  import { Profile } from '@/types/database.types';

  export default function HeroProfile({ profile }: { profile: Profile }) {
    if (!profile) return null;

    return (
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="py-20 px-6 max-w-5xl mx-auto text-center"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
          {profile.name}
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          {profile.bio}
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {profile.skills.map((skill, index) => (
            <span key={index} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300">
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-center gap-6">
          <a href={`mailto:${profile.email}`} className="flex items-center gap-2 hover:text-white text-gray-400 transition-colors">
            <Mail size={20} />
            <span>Email Me</span>
          </a>
          <div className="group relative flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white transition-colors">
            <MessageCircle size={20} />
            <span>WeChat</span>
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap">
              {profile.wechat}
            </div>
          </div>
        </div>
      </motion.section>
    );
  }
  ```

- [ ] **Step 2: 更新主页布局 (预留数据位置)**
  修改 `src/app/page.tsx`，引入全局深色背景和 HeroProfile（暂时使用 mock 数据测试）：
  ```tsx
  import HeroProfile from '@/components/HeroProfile';
  
  const mockProfile = {
    id: '1',
    name: 'Creative Studio',
    wechat: 'studio_wechat',
    email: 'hello@studio.com',
    bio: 'We build digital experiences that matter.',
    skills: ['Next.js', 'React', 'Framer Motion', 'UI/UX']
  };

  export default function Home() {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30">
        <HeroProfile profile={mockProfile} />
      </main>
    );
  }
  ```

- [ ] **Step 3: 提交代码**
  ```bash
  git add src/components/HeroProfile.tsx src/app/page.tsx
  git commit -m "feat: add animated HeroProfile component"
  ```

### Task 4: 首页 - 瀑布流案例展示与过滤组件

**Files:**
- Create: `src/components/ProjectGallery.tsx`
- Create: `src/components/ProjectCard.tsx`
- Modify: `src/app/page.tsx`

- [x] **Step 1: 创建 ProjectCard 组件**
  实现带有悬停放大和信息浮现动效的卡片 `src/components/ProjectCard.tsx`：
  ```tsx
  'use client';
  import { motion } from 'framer-motion';
  import { Project } from '@/types/database.types';
  import Image from 'next/image';

  export default function ProjectCard({ project }: { project: Project }) {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className="relative group rounded-2xl overflow-hidden bg-zinc-900 mb-6 cursor-pointer"
      >
        <div className="relative w-full pb-[120%]">
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileHover={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <span className="text-xs font-medium text-white/70 mb-2 block tracking-wider uppercase">
              {project.category}
            </span>
            <h3 className="text-2xl font-semibold text-white mb-2">{project.title}</h3>
            <p className="text-sm text-white/80 line-clamp-2">{project.description}</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }
  ```

- [x] **Step 2: 创建 ProjectGallery 组件 (瀑布流 + 过滤)**
  使用 `react-masonry-css` 和 `framer-motion` 在 `src/components/ProjectGallery.tsx` 中实现：
  ```tsx
  'use client';
  import { useState } from 'react';
  import { motion, AnimatePresence } from 'framer-motion';
  import Masonry from 'react-masonry-css';
  import { Project } from '@/types/database.types';
  import ProjectCard from './ProjectCard';

  const categories = ['全部', '网站', '大屏可视化', '管理后台', '小程序', 'APP', 'H5'];

  export default function ProjectGallery({ projects }: { projects: Project[] }) {
    const [activeCategory, setActiveCategory] = useState('全部');

    const filteredProjects = activeCategory === '全部' 
      ? projects 
      : projects.filter(p => p.category === activeCategory);

    const breakpointColumnsObj = {
      default: 3,
      1100: 2,
      700: 1
    };

    return (
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-white text-black' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-6 w-auto"
          columnClassName="pl-6 bg-clip-padding"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </Masonry>
      </div>
    );
  }
  ```

- [x] **Step 3: 更新主页**
  在 `src/app/page.tsx` 中引入 `ProjectGallery`（暂时使用 mock 数据测试图片需使用占位符，并在 `next.config.mjs` 中配置 images 域名，如果需要的话）：
  ```tsx
  import HeroProfile from '@/components/HeroProfile';
  import ProjectGallery from '@/components/ProjectGallery';
  
  // mockProfile...
  
  const mockProjects = [
    { id: '1', title: 'Corporate Site', description: 'Modern site', category: '网站', image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', featured: false, created_at: '', project_url: null },
    { id: '2', title: 'Data Dash', description: 'Analytics', category: '大屏可视化', image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', featured: true, created_at: '', project_url: null },
    // 添加几个以便测试瀑布流
  ];

  export default function Home() {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30 pt-10">
        <HeroProfile profile={mockProfile} />
        <ProjectGallery projects={mockProjects} />
      </main>
    );
  }
  ```
  在 `next.config.mjs` 中添加图片域名允许：
  ```javascript
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'images.unsplash.com',
        },
        {
          protocol: 'https',
          hostname: '**.supabase.co',
        }
      ],
    },
  };
  export default nextConfig;
  ```

- [x] **Step 4: 提交代码**
  ```bash
  git add src/components/ProjectCard.tsx src/components/ProjectGallery.tsx src/app/page.tsx next.config.mjs
  git commit -m "feat: add masonry project gallery with filters and animations"
  ```

### Task 5: 后台管理 - 身份验证与中间件

**Files:**
- Create: `src/app/login/page.tsx`
- Create: `src/middleware.ts`

- [ ] **Step 1: 创建登录页面**
  在 `src/app/login/page.tsx` 中实现基础登录表单：
  ```tsx
  'use client';
  import { useState } from 'react';
  import { createClient } from '@/lib/supabase/client';
  import { useRouter } from 'next/navigation';

  export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
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

- [ ] **Step 2: 创建路由中间件保护 `/admin`**
  在 `src/middleware.ts` 中拦截请求：
  ```typescript
  import { createServerClient, type CookieOptions } from '@supabase/ssr'
  import { NextResponse, type NextRequest } from 'next/server'

  export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return request.cookies.get(name)?.value
          },
          set(name: string, value: string, options: CookieOptions) {
            request.cookies.set({ name, value, ...options })
            response = NextResponse.next({
              request: { headers: request.headers },
            })
            response.cookies.set({ name, value, ...options })
          },
          remove(name: string, options: CookieOptions) {
            request.cookies.set({ name, value: '', ...options })
            response = NextResponse.next({
              request: { headers: request.headers },
            })
            response.cookies.set({ name, value: '', ...options })
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    // 保护 /admin 路由
    if (request.nextUrl.pathname.startsWith('/admin') && !user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // 已登录用户访问 /login 重定向到 /admin
    if (request.nextUrl.pathname.startsWith('/login') && user) {
        return NextResponse.redirect(new URL('/admin', request.url))
    }

    return response
  }

  export const config = {
    matcher: ['/admin/:path*', '/login'],
  }
  ```

- [ ] **Step 3: 提交代码**
  ```bash
  git add src/app/login src/middleware.ts
  git commit -m "feat: add admin login and route protection middleware"
  ```

### Task 6: 后台管理 - 骨架与个人信息编辑 (简化版)

**Files:**
- Create: `src/app/admin/layout.tsx`
- Create: `src/app/admin/page.tsx`

- [x] **Step 1: 创建 Admin 布局**
  在 `src/app/admin/layout.tsx` 中：
  ```tsx
  import { ReactNode } from 'react';
  import Link from 'next/link';
  import { createClient } from '@/lib/supabase/server';
  import { redirect } from 'next/navigation';

  export default async function AdminLayout({ children }: { children: ReactNode }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      redirect('/login');
    }

    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex">
        <aside className="w-64 border-r border-white/10 p-6 flex flex-col">
          <h2 className="text-xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-4 flex-1">
            <Link href="/admin" className="block text-gray-400 hover:text-white transition-colors">Profile</Link>
            <Link href="/admin/projects" className="block text-gray-400 hover:text-white transition-colors">Projects</Link>
          </nav>
          <div className="text-sm text-gray-500 truncate">{user.email}</div>
        </aside>
        <main className="flex-1 p-10">
          {children}
        </main>
      </div>
    );
  }
  ```

- [x] **Step 2: 创建 Profile 编辑页面 (UI 骨架)**
  在 `src/app/admin/page.tsx` 中：
  ```tsx
  export default function AdminProfile() {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
        <div className="bg-zinc-900 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 mb-4">Profile form goes here. In a complete implementation, this would fetch from Supabase and allow saving changes.</p>
          {/* Form fields for name, wechat, email, bio, skills would be implemented here */}
          <button className="bg-white text-black font-semibold rounded-lg px-6 py-2 hover:bg-gray-200 transition-colors mt-4">
            Save Changes
          </button>
        </div>
      </div>
    );
  }
  ```

- [x] **Step 3: 提交代码**
  ```bash
  git add src/app/admin
  git commit -m "feat: add admin dashboard layout and profile placeholder"
  ```

*(注：为了控制计划长度和复杂性，这里省略了管理后台中完整的表单状态管理、图片上传到 Supabase Storage 的详细组件实现。在实际执行中，可以根据此骨架进一步扩充 `AdminProfile` 和 `AdminProjects` 页面。)*

### Task 7: 首页 - 连接真实 Supabase 数据

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: 在服务端组件中拉取真实数据**
  修改 `src/app/page.tsx` 以从 Supabase 获取数据：
  ```tsx
  import { createClient } from '@/lib/supabase/server';
  import HeroProfile from '@/components/HeroProfile';
  import ProjectGallery from '@/components/ProjectGallery';

  // Fallback mocks in case DB is empty during initial dev
  const mockProfile = { id: '1', name: 'Creative Studio', wechat: 'studio_wechat', email: 'hello@studio.com', bio: 'We build digital experiences that matter.', skills: ['Next.js', 'React', 'Framer Motion', 'UI/UX'] };
  
  export default async function Home() {
    const supabase = createClient();
    
    // Fetch profile (assuming row id = 1 or using single row)
    const { data: profiles } = await supabase.from('profile').select('*').limit(1);
    const profile = profiles && profiles.length > 0 ? profiles[0] : mockProfile;

    // Fetch projects
    const { data: projects } = await supabase.from('projects').select('*').order('created_at', { ascending: false });

    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/30 pt-10">
        <HeroProfile profile={profile} />
        <ProjectGallery projects={projects || []} />
      </main>
    );
  }
  ```

- [ ] **Step 2: 提交代码**
  ```bash
  git add src/app/page.tsx
  git commit -m "feat: connect home page to real supabase data"
  ```
