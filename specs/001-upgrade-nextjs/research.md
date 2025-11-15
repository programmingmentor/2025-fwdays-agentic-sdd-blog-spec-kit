# Research: Next.js Upgrade to Version 16

**Date**: 2025-01-27  
**Feature**: Upgrade Next.js to Latest Version  
**Current Version**: Next.js 15.0.2  
**Target Version**: Next.js 16.x (latest stable)

## Research Findings

### Next.js 16 Key Information

**Decision**: Upgrade to Next.js 16.x (latest stable version, released October 21, 2025)

**Rationale**: 
- Latest stable release provides newest features, performance improvements, and security updates
- Official upgrade path available with codemods for automated migration
- React 19.2 support included (current project uses React 19 RC)
- Maintains backward compatibility with App Router and SSG

**Alternatives considered**:
- Staying on Next.js 15.0.2: Rejected - misses security updates and new features
- Upgrading to Next.js 16 beta/canary: Rejected - prefer stable release for production readiness

### Key Features in Next.js 16

1. **Cache Components**: Partial Pre-Rendering (PPR) and `use cache` for instant navigation
2. **Turbopack (Stable)**: Now default bundler, faster build times
3. **React Compiler Support (Stable)**: Built-in automatic memoization
4. **Enhanced Routing**: Optimized navigation and prefetching
5. **Improved Caching APIs**: New methods like `updateTag()`, `refresh()`, refined `revalidateTag()`
6. **React 19.2 Support**: View Transitions, `useEffectEvent()`, `<Activity/>`

### Upgrade Process

**Decision**: Use official Next.js upgrade codemod (`@next/codemod@latest upgrade latest`)

**Rationale**:
- Automatically applies necessary code transformations
- Handles breaking changes and deprecated APIs
- Reduces manual migration effort
- Official tool maintained by Next.js team

**Alternatives considered**:
- Manual upgrade: Rejected - higher risk of missing breaking changes
- Gradual upgrade: Rejected - unnecessary complexity for single version jump

### React Version Compatibility

**Decision**: Upgrade React from 19.0.0-rc to React 19.2 (stable)

**Rationale**:
- Next.js 16 requires React 19.2 support
- Current RC version should be upgraded to stable for production readiness
- React 19.2 includes bug fixes and stability improvements over RC

**Alternatives considered**:
- Keep React 19 RC: Rejected - Next.js 16 optimized for React 19.2 stable
- Downgrade to React 18: Rejected - Next.js 16 requires React 19

### Dependency Compatibility

**Decision**: Update all peer dependencies to compatible versions

**Rationale**:
- `@types/react` and `@types/react-dom` must match React 19.2
- `eslint-config-next` should be updated to latest for Next.js 16 compatibility
- Other dependencies (gray-matter, remark, date-fns, classnames) should remain compatible

**Dependencies to update**:
- `next`: 15.0.2 → 16.x (latest)
- `react`: 19.0.0-rc → 19.2 (stable)
- `react-dom`: 19.0.0-rc → 19.2 (stable)
- `@types/react`: Update to match React 19.2
- `@types/react-dom`: Update to match React 19.2
- `eslint-config-next`: Update to latest (if used)

**Dependencies to verify** (likely compatible, no changes needed):
- `gray-matter`: ^4.0.3
- `remark`: ^15.0.1
- `remark-html`: ^16.0.1
- `date-fns`: ^3.6.0
- `classnames`: ^2.5.1
- `tailwindcss`: ^3.4.4
- `postcss`: ^8.4.38
- `autoprefixer`: ^10.4.19

### Breaking Changes & Migration

**Decision**: Review Next.js 15 to 16 upgrade guide and apply codemod transformations

**Key areas to check**:
1. **Turbopack**: Now default bundler (already using `--turbopack` flag in dev script)
2. **React 19 features**: May require component updates for new React 19 APIs
3. **Caching APIs**: New methods available, but existing code should continue working
4. **TypeScript types**: May need updates for new Next.js 16 type definitions

**Migration steps**:
1. Update dependencies via npm
2. Run codemod: `npx @next/codemod@latest upgrade latest`
3. Review and fix any TypeScript errors
4. Test build process
5. Test development server
6. Verify all pages render correctly

### TypeScript Configuration

**Decision**: Minimal TypeScript config updates expected

**Rationale**:
- Next.js 16 maintains TypeScript compatibility
- Current strict mode configuration should remain valid
- May need to update `next-env.d.ts` (auto-generated)
- Type definitions will update via `@types/react` and `@types/react-dom`

**Alternatives considered**:
- Major TypeScript config rewrite: Rejected - no indication of breaking changes

### Build & Development Workflow

**Decision**: Maintain existing build and development scripts

**Rationale**:
- Current scripts (`dev`, `build`, `start`) follow Next.js conventions
- Turbopack already enabled in dev script (now default in Next.js 16)
- Build process should remain unchanged

**No changes needed to**:
- `package.json` scripts
- `tailwind.config.ts`
- `postcss.config.js`
- Build output structure

## Research Summary

All critical unknowns resolved:
- ✅ Target version: Next.js 16.x (latest stable)
- ✅ React version: 19.2 (stable)
- ✅ Upgrade method: Official codemod + manual dependency update
- ✅ Breaking changes: Minimal, handled by codemod
- ✅ TypeScript: Compatible, minor type definition updates
- ✅ Dependencies: Most compatible, only core Next.js/React packages need updates

**Ready for Phase 1**: Design & Contracts

