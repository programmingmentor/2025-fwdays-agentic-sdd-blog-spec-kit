# Implementation Plan: Upgrade Next.js to Latest Version

**Branch**: `001-upgrade-nextjs` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-upgrade-nextjs/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Upgrade the blog starter application from Next.js 15.0.2 to Next.js 16.x (latest stable version) while maintaining all existing functionality, ensuring TypeScript compatibility, and preserving the development workflow. The upgrade will leverage Next.js codemods for automated migration and require careful handling of React 19 RC compatibility.

## Technical Context

**Language/Version**: TypeScript 5.5.2 (strict mode)  
**Primary Dependencies**: Next.js 15.0.2 → 16.x, React 19.0.0-rc → 19.2 (stable), React DOM 19.0.0-rc → 19.2 (stable)  
**Storage**: N/A (static site generation, markdown files)  
**Testing**: Manual testing (dev server, build, runtime verification)  
**Target Platform**: Web (static site generation, Vercel-compatible)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Maintain current performance levels (no degradation)  
**Constraints**: Must maintain TypeScript strict mode, SSG compatibility, App Router conventions  
**Scale/Scope**: Single blog application with ~3 blog posts, static content

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

### I. TypeScript-First ✅

- **Status**: Compliant
- **Rationale**: Upgrade maintains TypeScript strict mode. Type definitions will be updated to match React 19 stable and Next.js 16 types.

### II. Static Site Generation (SSG) ✅

- **Status**: Compliant
- **Rationale**: Next.js 16 maintains SSG support. No changes to build process that would affect static generation.

### III. Markdown-Based Content ✅

- **Status**: Compliant
- **Rationale**: Content processing (remark, remark-html, gray-matter) remains unchanged. No impact on markdown workflow.

### IV. Component-Based Architecture ✅

- **Status**: Compliant
- **Rationale**: Component structure in `src/app/_components` remains unchanged. Upgrade may require minor component updates for React 19 compatibility.

### V. Simplicity & YAGNI ✅

- **Status**: Compliant
- **Rationale**: Upgrade follows standard Next.js upgrade path using official codemods. No architectural changes planned.

**Gate Status**: ✅ PASSED - All constitution principles maintained

## Project Structure

### Documentation (this feature)

```text
specs/001-upgrade-nextjs/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── _components/     # UI components (unchanged structure)
│   ├── posts/[slug]/    # Dynamic blog post routes
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── interfaces/          # TypeScript interfaces
└── lib/                 # Utilities (api.ts, markdownToHtml.ts, constants.ts)

_posts/                  # Markdown blog posts (unchanged)

package.json             # Dependencies (will be updated)
tsconfig.json            # TypeScript config (may need minor updates)
tailwind.config.ts       # Tailwind config (unchanged)
postcss.config.js        # PostCSS config (unchanged)
```

**Structure Decision**: Single Next.js App Router project structure maintained. No structural changes required for upgrade.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations detected. Upgrade maintains all constitution principles.
