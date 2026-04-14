# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16.2.3 web application with Supabase backend (SSR authentication). Features include a portfolio site with project gallery, admin dashboard, and protected login.

## Common Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Production server
npm run lint     # Run ESLint
```

## Architecture

- **App Router**: Uses Next.js App Router (src/app/) with route groups
- **Supabase SSR**: Client and server utilities in src/lib/supabase/
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Animations**: Framer Motion for component animations
- **Database Types**: Generated types in src/types/database.types.ts

## Key Files

- `src/app/page.tsx` - Main landing page with project gallery
- `src/app/login/page.tsx` - Admin login
- `src/app/admin/page.tsx` - Protected admin dashboard
- `src/lib/supabase/client.ts` - Browser Supabase client
- `src/lib/supabase/server.ts` - Server-side Supabase helpers

## Important Notes

- This is Next.js 16, which has breaking changes from earlier versions. Read `node_modules/next/dist/docs/` before writing code.
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (see .env.example)
- Admin route is protected via route proxy in src/proxy.ts

## gstack

Use the `/browse` skill from gstack for all web browsing.
Never use `mcp__claude-in-chrome__*` tools.

Install gstack locally for each teammate:

```bash
git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
cd ~/.claude/skills/gstack
./setup
```

Available skills:
- /office-hours
- /plan-ceo-review
- /plan-eng-review
- /plan-design-review
- /design-consultation
- /design-shotgun
- /design-html
- /review
- /ship
- /land-and-deploy
- /canary
- /benchmark
- /browse
- /connect-chrome
- /qa
- /qa-only
- /design-review
- /setup-browser-cookies
- /setup-deploy
- /retro
- /investigate
- /document-release
- /codex
- /cso
- /autoplan
- /plan-devex-review
- /devex-review
- /careful
- /freeze
- /guard
- /unfreeze
- /gstack-upgrade
- /learn
