-- profiles
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NULL,
  name TEXT NULL,
  profession TEXT NULL,
  wechat TEXT NULL,
  email TEXT NULL,
  bio TEXT NULL,
  skills JSONB NULL,
  hero_intro TEXT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- projects
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  project_url TEXT NULL,
  github_url TEXT NULL,
  featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- services
CREATE TABLE IF NOT EXISTS services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NULL REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_url TEXT NULL,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  quote TEXT NOT NULL,
  avatar_url TEXT NOT NULL,
  "order" INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_profile_id ON projects(profile_id);
CREATE INDEX IF NOT EXISTS idx_services_profile_id ON services(profile_id);
CREATE INDEX IF NOT EXISTS idx_testimonials_profile_id ON testimonials(profile_id);

CREATE INDEX IF NOT EXISTS idx_projects_created_at_desc
  ON projects(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_projects_category
  ON projects(category)
  WHERE category IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_projects_featured
  ON projects(featured)
  WHERE featured = true;

CREATE INDEX IF NOT EXISTS idx_projects_category_featured
  ON projects(category, featured DESC);

CREATE INDEX IF NOT EXISTS idx_services_order_asc
  ON services("order" ASC);

CREATE INDEX IF NOT EXISTS idx_testimonials_order_asc
  ON testimonials("order" ASC);


  -- 数据迁移
  INSERT INTO profiles (
  id,
  user_id,
  name,
  profession,
  wechat,
  email,
  bio,
  skills,
  hero_intro
) VALUES (
  '550e8400-e29b-41d4-a716-446655440000',
  'fb333d69-8784-4be0-914b-701496a089ce',
  'Sean Hao',
  E'Full Stack\r\nDeveloper',
  'test_wechat',
  'h19111426051@163.com',
  E'我长期深耕“可交付”的工程实践：既能把产品需求快速落地为体验稳定的业务系统，也能从架构与工程化角度提升团队效率与系统质量。职业经历覆盖测试/测开、前端与后端链路（ 3年测试/测开 + 7年前端 + 1年前后端），让我在设计方案时天然兼顾可测性、可维护性与线上稳定性；同时具备2年以上管理经验，能够推进跨角色协作与项目按期上线。技术栈覆盖 Vue2/3、React、Next.js、Python、uniapp、小程序、Qiankun 微前端、GIS与可视化等；熟悉 Git、MySQL、Supabase 等工具与服务，并有架构治理、性能优化、部署与运维优化的实战经验。我希望加入重视工程质量与业务价值的团队，持续用技术把复杂问题做简单、把交付做可靠。',
  '[{"label":"Vue2/3","progress":"96%"},{"label":"React","progress":"88%"},{"label":"uniapp","progress":"95%"},{"label":"Next.js","progress":"90%"},{"label":"Node.js","progress":"85%"}]'::jsonb,
  E'10+年计算机专业工作经验，其中7年前端 + 1年前后端一体 + 3年测试/测开背景的全栈工程师，擅长从0到1交付业务系统与工程化架构，兼顾性能、质量与上线效率。'
);

INSERT INTO services (
  id,
  profile_id,
  title,
  description,
  icon_url,
  "order",
  created_at
) VALUES
(
  '2df13ce8-018a-4da1-8e74-683446c9e871',
  '550e8400-e29b-41d4-a716-446655440000',
  '企业官网',
  '响应式官网/落地页开发，注重加载速度与 SEO。支持表单、内容管理与部署上线。',
  NULL,
  1,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  '55d0831c-d7da-4ded-ba51-1685f3166dc0',
  '550e8400-e29b-41d4-a716-446655440000',
  '管理后台',
  '菜单/按钮/数据权限、数据列表/图表、操作审计等后台能力。接口联调与性能优化，支持持续迭代。',
  NULL,
  2,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  '8a71108d-e0fe-4965-b50b-f9bf86cebabe',
  '550e8400-e29b-41d4-a716-446655440000',
  '小程序',
  '微信/支付宝小程序开发，适配主流机型与分包优化。对接登录、支付、地图等常用能力。',
  NULL,
  3,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'b938a8a7-b43d-4aa7-94f5-e8da7406ab36',
  '550e8400-e29b-41d4-a716-446655440000',
  'H5APP',
  '活动页/业务 H5 开发，适配多端与动效交互。支持埋点统计、分享、支付与发布上线。',
  NULL,
  4,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  '9fe64e36-e8f7-4f0a-ba22-55b298078e20',
  '550e8400-e29b-41d4-a716-446655440000',
  '大屏可视化',
  '数据大屏/监控看板开发，支持实时刷新、地图与多图表联动。适配多分辨率，支持部署到大屏设备与远程运维。',
  NULL,
  5,
  '2026-04-12T10:07:20.178596+00:00'
);


INSERT INTO projects (
  id,
  profile_id,
  title,
  description,
  category,
  image_url,
  project_url,
  featured,
  created_at
) VALUES
(
  'b97ad122-0b2e-4adf-ae89-541fc1154e1a',
  '550e8400-e29b-41d4-a716-446655440000',
  '微信小程序（社区多元化）',
  '微信小程序（社区多元化）',
  '小程序',
  '/assets/web5_1.png',
  '/assets/web5_2.png',
  false,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'ea559204-c565-42c0-8886-82578828dad6',
  '550e8400-e29b-41d4-a716-446655440000',
  '工单系统 H5（派单/处理/验收）',
  '工单系统 H5（派单/处理/验收）',
  '业务H5',
  '/assets/web4_1.png',
  '/assets/web4_2.png',
  true,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'cb06bf23-16e9-49d1-a539-14650b55e0e1',
  '550e8400-e29b-41d4-a716-446655440000',
  '企业官网落地页（响应式）',
  '企业官网落地页（响应式）',
  '企业官网',
  '/assets/web2_1.png',
  '/assets/web2_2.png',
  false,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'ea559204-c565-42c0-8886-82578828dad8',
  '550e8400-e29b-41d4-a716-446655440000',
  '法务咨询 App｜在线咨询 & 案件进度',
  '法务咨询 App｜在线咨询 & 案件进度',
  'APP',
  '/assets/web6_1.png',
  '/assets/web6_2.png',
  true,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'ea559204-c565-42c0-8886-82578828daa9',
  '550e8400-e29b-41d4-a716-446655440000',
  '工单数据可视化大屏｜全局态势',
  '工单数据可视化大屏｜全局态势',
  '大屏可视化',
  '/assets/web3_1.png',
  '/assets/web3_2.png',
  true,
  '2026-04-12T10:07:20+00:00'
);

INSERT INTO testimonials (
  id,
  profile_id,
  name,
  role,
  quote,
  avatar_url,
  "order",
  created_at
) VALUES
(
  'ef4601cd-269f-48a1-ae17-e8e6fc646e91',
  '550e8400-e29b-41d4-a716-446655440000',
  'Mark',
  'CEO',
  '工作成果优秀、交付靠谱、配合度高、合作体验好，是值得长期合作的优质技术伙伴，明确表示未来有项目会优先选择我合作。',
  '/assets/user1.jpg',
  1,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'b506a93b-8d7a-4fed-a7de-10513c537f02',
  '550e8400-e29b-41d4-a716-446655440000',
  '霍老板',
  'CEO',
  '技术全面、架构能力突出、产品思维优秀、交付靠谱、责任心强，是可主导项目、值得长期深度合作的核心技术伙伴，不仅认可我的技术实力，更信任我的交付与合作，主动将我作为项目核心，发出长期合作邀约。',
  '/assets/user2.jpg',
  2,
  '2026-04-12T10:07:20.178596+00:00'
),
(
  'f40f8c64-110d-4800-994c-a709994a7543',
  '550e8400-e29b-41d4-a716-446655440000',
  '张老板',
  'CEO',
  '人品过硬、责任心极强、专业能力突出、交付靠谱、沟通顺畅，是兼具能力与人品的优质长期合作伙伴，不仅认可我的技术服务，更信任我的为人，愿意将核心业务托付，并主动推进长期深度合作。',
  '/assets/user3.jpg',
  3,
  '2026-04-12T10:07:20.178596+00:00'
);