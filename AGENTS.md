<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project: Portfolio Website

A personal/team portfolio site with Next.js, Supabase, and creative motion-rich UI.

## Tech Stack

- **Framework**: Next.js 16.2.3 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, Framer Motion
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Deployment**: Vercel

## Key Features Implemented

1. **Public Portfolio** (`/`): Hero profile section + masonry project gallery with category filters
2. **Admin Login** (`/login`): Supabase Auth protected
3. **Admin Dashboard** (`/admin`): Protected route, profile/project management

## Development Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint
```

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Architecture Notes

- **Database Tables**: `profile` (name, wechat, email, bio, skills), `projects` (title, description, category, image_url, project_url, featured)
- **Route Protection**: Via `src/middleware.ts` - redirects unauthenticated `/admin` requests to `/login`
- **Supabase Clients**: Server/client split in `src/lib/supabase/`
- **RLS**: Public read-only, admin write (configure in Supabase)

## Implementation Progress

See `docs/superpowers/specs/2026-04-11-portfolio-website-design.md` for detailed task list. Tasks 1-4, 6, and Task 7 (Step 1) are complete. Remaining: admin project management forms, image upload to Supabase Storage.