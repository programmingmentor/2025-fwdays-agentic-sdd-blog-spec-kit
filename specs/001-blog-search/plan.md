# Implementation Plan: Search in a Blog

**Branch**: `001-blog-search` | **Date**: 2025-01-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-blog-search/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement a search feature that allows users to find blog posts by matching search terms against post titles and excerpts. The search interface will be accessible from all blog pages, display results with post titles and excerpts, and support keyboard navigation. Search will be implemented client-side for simplicity, using case-insensitive partial word matching, with results ordered by date (newest first).

## Technical Context

**Language/Version**: TypeScript 5.5+ (strict mode enabled)  
**Primary Dependencies**: Next.js 16+ (App Router), React 19+, Tailwind CSS 3.4+  
**Storage**: Markdown files in `_posts` directory (read-only, no database)  
**Testing**: TypeScript compilation, manual testing, browser DevTools  
**Target Platform**: Web (Next.js static export compatible)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: Search results display within 1 second for 95% of queries, support up to 200 posts  
**Constraints**: Must work with static site generation (SSG), no server-side search API, client-side only, maintain TypeScript strict mode compliance  
**Scale/Scope**: ~200 blog posts maximum, search interface on all pages, client-side filtering

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### I. TypeScript-First ✅
- **Compliance**: All search components and utilities will be written in TypeScript with strict type checking
- **Type Definitions**: Search functions will have explicit return types, search query types, and result types
- **Status**: PASS - No violations expected

### II. Static Site Generation (SSG) ✅
- **Compliance**: Search will be implemented client-side, compatible with static export
- **No Dynamic Routes**: Search results will be rendered client-side, no new dynamic routes needed
- **Status**: PASS - Client-side search aligns with SSG approach

### III. Markdown-Based Content ✅
- **Compliance**: Search will read from existing `getAllPosts()` API that processes markdown files
- **No Content Changes**: No modifications to markdown structure or front matter required
- **Status**: PASS - Uses existing content processing

### IV. Component-Based Architecture ✅
- **Compliance**: Search components will be added to `src/app/_components/`
- **Reusability**: Search input and results components will be reusable
- **Status**: PASS - Follows existing component structure

### V. Simplicity & YAGNI ✅
- **Compliance**: Starting with simple client-side search, no external dependencies beyond existing stack
- **No Over-Engineering**: No search indexing libraries, no server-side APIs, simple string matching
- **Status**: PASS - Minimal complexity, can be enhanced later if needed

**Overall Status**: ✅ **PASS** - All constitution principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-blog-search/
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
│   ├── _components/
│   │   ├── search-input.tsx        # NEW: Search input component
│   │   ├── search-results.tsx       # NEW: Search results display component
│   │   └── [existing components]
│   ├── search/
│   │   └── page.tsx                 # NEW: Search results page (optional, if needed)
│   └── [existing pages]
├── lib/
│   ├── search.ts                    # NEW: Search utility functions
│   └── [existing utilities]
└── interfaces/
    ├── search.ts                    # NEW: Search-related type definitions
    └── [existing interfaces]
```

**Structure Decision**: Single Next.js App Router project. Search components added to existing `_components` directory. Search logic in `lib/search.ts`. New search page route optional (can be modal/overlay instead). Follows existing project structure conventions.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No violations - all constitution principles satisfied.
