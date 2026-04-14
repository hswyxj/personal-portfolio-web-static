'use client'

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import type { Project, Profile, Service, Testimonial } from '@/types/database.types';

const emptyProfile = {
  id: '',
  user_id: null,
  name: '',
  profession: null,
  wechat: null,
  email: null,
  phone: null,
  bio: null,
  skills: null,
  hero_intro: null,
} as Profile;

export default function Home() {
  const tabList = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Me' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [services, setServices] = useState<Service[]>([
    {
        "id": "2df13ce8-018a-4da1-8e74-683446c9e871",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "企业官网",
        "description": "响应式官网/落地页开发，注重加载速度与 SEO。支持表单、内容管理与部署上线。",
        "icon_url": null,
        "order": 1,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "55d0831c-d7da-4ded-ba51-1685f3166dc0",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",      
        "title": "管理后台",
        "description": "菜单/按钮/数据权限、数据列表/图表、操作审计等后台能力。接口联调与性能优化，支持持续迭代。",
        "icon_url": null,
        "order": 2,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "8a71108d-e0fe-4965-b50b-f9bf86cebabe",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "小程序",
        "description": "微信/支付宝小程序开发，适配主流机型与分包优化。对接登录、支付、地图等常用能力。",
        "icon_url": null,
        "order": 3,   
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "b938a8a7-b43d-4aa7-94f5-e8da7406ab36",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "H5APP",
        "description": "活动页/业务 H5 开发，适配多端与动效交互。支持埋点统计、分享、支付与发布上线。",
        "icon_url": null,
        "order": 4,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "9fe64e36-e8f7-4f0a-ba22-55b298078e20",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "大屏可视化",
        "description": "数据大屏/监控看板开发，支持实时刷新、地图与多图表联动。适配多分辨率，支持部署到大屏设备与远程运维。",
        "icon_url": null,
        "order": 5,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    }
]);
  const [projects, setProjects] = useState<Project[]>([
    {
        "id": "b97ad122-0b2e-4adf-ae89-541fc1154e1a",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "社区小程序 | uniapp + Vue2 + WebSocket ",
        "description": "微信小程序（社区多元化）",
        "category": "小程序",
        "image_url": "/assets/web5_1.png",
        "project_url": "/assets/web5_2.png",
        "github_url":null,
        "featured": false,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828dad7",
         "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "管理后台 | Vue2 + Element UI + ESLint",
        "description": "后台中台基础框架：权限路由、操作级权限控制、数据权限隔离，提供常用 CRUD 列表与可视化报表模块。",
        "category": "管理后台",
        "image_url": "/assets/web9_1.png",
        "project_url": "/assets/web9_2.png",
        "github_url":null,
        "featured": false,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828dad8",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "法务咨询 App｜uniapp + Vue2 + ECharts",
        "description": "法务咨询 App｜在线咨询 & 案件进度",
        "category": "APP",
        "image_url": "/assets/web6_1.png",
        "project_url": "/assets/web6_2.png",
        "github_url":null,
        "featured": true,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828dad6",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "工单系统 H5 | Vue3 + ECharts + Tailwindcss ",
        "description": "工单系统 H5（派单/处理/验收）",
        "category": "业务H5",
        "image_url": "/assets/web4_1.png",
        "project_url": "/assets/web4_2.png",
        "github_url":null,
        "featured": true,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828dad9",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "个人作品集｜Next.js + Supabase + Node.js + Tailwindcss ",
        "description": "基于 Next.js + Supabase + Node.js 构建，展示项目案例、技术栈与联系方式",
        "category": "作品集",
        "image_url": "/assets/web7_1.png",
        "project_url": "/assets/web7_2.png",
        "github_url":null,
        "featured": true,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "cb06bf23-16e9-49d1-a539-14650b55e0e1",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "企业官网 AI编程对话 | Next.js + Tailwindcss + Supabase Node.js",
        "description": "企业官网落地页（响应式）",
        "category": "企业官网",
        "image_url": "/assets/web2_1.png",
        "project_url": "/assets/web2_2.png",
        "github_url":null,
        "featured": false,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828dad1",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "工作流审核流｜Vue3 + bpmnFlow + Tailwindcss",
        "description": "可视化工作流/审核流设计与流转管理，基于 BPMN 建模，支持节点配置、条件分支与审批记录追踪。",
        "category": "工作流审核流",
        "image_url": "/assets/web8_1.png",
        "project_url": "/assets/web8_2.png",
        "github_url":null,
        "featured": true,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "ea559204-c565-42c0-8886-82578828daa9",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "title": "工单数据可视化大屏｜React + ECharts + Tailwindcss ",
        "description": "工单数据可视化大屏｜全局态势",
        "category": "大屏可视化",
        "image_url": "/assets/web3_2.png",
        "project_url": "/assets/web3_1.png",
        "github_url":null,
        "featured": true,
        "created_at": "2026-04-12T10:07:20+00:00"
    }
  ]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
        "id": "ef4601cd-269f-48a1-ae17-e8e6fc646e91",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "Mark",
        "role": "CEO",
        "quote": "工作成果优秀、交付靠谱、配合度高、合作体验好，是值得长期合作的优质技术伙伴，明确表示未来有项目会优先选择我合作。",
        "avatar_url": "/assets/user1.jpg",
        "order": 1,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "b506a93b-8d7a-4fed-a7de-10513c537f02",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "霍老板",
        "role": "CEO",
        "quote": "技术全面、架构能力突出、产品思维优秀、交付靠谱、责任心强，是可主导项目、值得长期深度合作的核心技术伙伴，不仅认可我的技术实力，更信任我的交付与合作，主动将我作为项目核心，发出长期合作邀约。",
        "avatar_url": "/assets/user2.jpg",
        "order": 2,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    },
    {
        "id": "f40f8c64-110d-4800-994c-a709994a7543",
        "project_id": "550e8400-e29b-41d4-a716-446655440000",
        "name": "张老板",
        "role": "CEO",
        "quote": "人品过硬、责任心极强、专业能力突出、交付靠谱、沟通顺畅，是兼具能力与人品的优质长期合作伙伴，不仅认可我的技术服务，更信任我的为人，愿意将核心业务托付，并主动推进长期深度合作。",
        "avatar_url": "/assets/user3.jpg",
        "order": 3,
        "created_at": "2026-04-12T10:07:20.178596+00:00"
    }
  ]);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-[#FD6F00] selection:text-white">
      <Navbar tabList={tabList} />
      <Hero profile={profile} />
      <About profile={profile} />
      <Services services={services} errorMessage={errorMessage} />
      <Projects projects={projects} errorMessage={errorMessage} />
      <Testimonials testimonials={testimonials} errorMessage={errorMessage} />
      <Contact profile={profile} buttonLabel="Contact Me" />
      <Footer tabList={tabList} />
    </main>
  );
}