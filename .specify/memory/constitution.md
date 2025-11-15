<!--
Sync Impact Report:
Version change: N/A → 1.0.0 (Initial constitution)
Modified principles: N/A (all new)
Added sections: Core Principles (5), Technology Stack, Development Workflow
Removed sections: N/A
Templates requiring updates:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - No changes needed, already aligned
  ✅ tasks-template.md - No changes needed, already aligned
  ✅ agent-file-template.md - No changes needed
Follow-up TODOs: None
-->

# Blog Starter App Constitution

## Core Principles

### I. TypeScript-First

All code MUST be written in TypeScript with strict type checking enabled. Type definitions MUST be provided for all interfaces, functions, and components. Avoid `any` types; use proper type inference and explicit types where needed. Rationale: Type safety prevents runtime errors and improves developer experience and maintainability.

### II. Static Site Generation (SSG)

The application MUST prioritize Next.js Static Site Generation for all public-facing content. Blog posts MUST be statically generated at build time. Dynamic routes MUST use `generateStaticParams` when possible. Rationale: SSG provides optimal performance, SEO benefits, and reduced server costs.

### III. Markdown-Based Content

All blog posts MUST be stored as Markdown files in the `_posts` directory with front matter metadata. Content processing MUST use `remark` and `remark-html` for Markdown-to-HTML conversion. Metadata MUST be parsed using `gray-matter`. Rationale: Markdown provides a simple, version-controlled content format that non-developers can edit.

### IV. Component-Based Architecture

UI components MUST be organized in `src/app/_components` with clear separation of concerns. Components MUST be reusable and follow React best practices. Shared utilities and interfaces MUST be placed in `src/lib` and `src/interfaces` respectively. Rationale: Component-based architecture enables code reuse, maintainability, and testability.

### V. Simplicity & YAGNI

Features MUST start simple and only add complexity when explicitly required. Avoid premature optimization and over-engineering. Prefer built-in Next.js features over custom solutions. Rationale: Simplicity reduces maintenance burden and accelerates development while maintaining flexibility for future needs.

## Technology Stack

**Core Framework**: Next.js 15+ (App Router)  
**Language**: TypeScript 5.5+  
**Styling**: Tailwind CSS 3.4+  
**Content Processing**: remark, remark-html, gray-matter  
**Deployment**: Vercel (recommended) or compatible static hosting

**Constraints**:

- MUST maintain compatibility with Next.js App Router conventions
- MUST support static export for deployment flexibility
- MUST use TypeScript strict mode
- MUST follow Next.js file-based routing conventions

## Development Workflow

**Code Organization**:

- Components: `src/app/_components/`
- Pages: `src/app/` (file-based routing)
- Utilities: `src/lib/`
- Type Definitions: `src/interfaces/`
- Content: `_posts/` (Markdown files)

**Quality Gates**:

- All new features MUST pass TypeScript compilation without errors
- Components MUST follow existing naming conventions (PascalCase for components)
- New blog posts MUST include required front matter fields (title, date, author, coverImage)
- Build MUST succeed with `npm run build` before merging

**Review Process**:

- PRs MUST verify compliance with constitution principles
- Complexity additions MUST be justified in PR description
- Breaking changes to content structure MUST be documented

## Governance

This constitution supersedes all other development practices and guidelines. All code contributions MUST comply with these principles.

**Amendment Procedure**:

- Amendments require updating this document with version bump
- Version follows semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Backward incompatible principle changes
- MINOR: New principles or significant additions
- PATCH: Clarifications and non-semantic refinements
- Amendments MUST be documented in the Sync Impact Report at the top of this file

**Compliance**:

- All PRs/reviews MUST verify constitution compliance
- Violations MUST be justified in Complexity Tracking section of plan.md
- Use `.specify/templates/agent-file-template.md` for runtime development guidance

**Version**: 1.0.0 | **Ratified**: 2025-11-15 | **Last Amended**: 2025-11-15
