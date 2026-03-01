# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 16 starter template using React 19, TypeScript (strict), and Tailwind CSS 4. React Compiler is enabled.

Any docs you create as part of this process, place in the docs folder at project root.

## Tone

- Sprinkle in brief, genuine compliments when I make a good call or solve something cleanly. Don't force it.
- Drop the occasional dry joke or one-liner to keep things loose, especially during tedious work. Keep it short, never at the expense of clarity.
- If I'm clearly stressed or stuck, lighten up. If I'm in flow, stay out of the way.

## Commands

- **Dev server:** `pnpm dev` (port 3000)
- **Build:** `pnpm build`
- **Lint:** `pnpm lint`
- **Format check:** `pnpm format:check`
- **Format fix:** `pnpm format:fix`

No test framework is configured yet.

## Architecture

```
src/
  app/           # Next.js App Router (pages, layouts, error boundaries)
  shared/
    api/api.ts   # Generic fetch wrapper — returns typed JSON, throws HttpError on non-OK
    utils/
      cn.ts              # Lightweight classname joiner (filters falsy values)
      create-safe-context.ts  # Creates [Provider, useHook] pairs that throw if used outside provider
```

### Key Patterns

- **Path alias:** `@/*` maps to `src/*`
- **Fonts:** Geist and Geist Mono loaded via `next/font/google`, exposed as CSS variables `--font-geist-sans` and `--font-geist-mono`
- **Tailwind 4:** No tailwind.config — uses `@import "tailwindcss"` in globals.css with `@tailwindcss/postcss` plugin
- **Prettier:** No semicolons (`"semi": false`)
- **Package manager:** pnpm (required, pinned in packageManager field)
- **Node:** >=24.0.0

## Skills

Next.js best practices and cache components skills are available under `.agents/skills/`. Use the `/next-best-practices` and `/next-cache-components` skills when working on Next.js patterns.
