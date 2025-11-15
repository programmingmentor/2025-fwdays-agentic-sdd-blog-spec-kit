# API Contracts: Next.js Upgrade

**Date**: 2025-01-27  
**Feature**: Upgrade Next.js to Latest Version

## Overview

This upgrade does not introduce new APIs or modify existing API contracts. The application uses:

- **Next.js App Router**: File-based routing (unchanged)
- **Static Site Generation**: Build-time page generation (unchanged)
- **No Backend APIs**: Pure static site with no API routes

## Existing Contracts (No Changes)

### Page Routes

**Home Page**: `/` → `src/app/page.tsx`
- **Method**: GET
- **Response**: Static HTML page with blog post list
- **No changes**: Route structure unchanged

**Blog Post**: `/posts/[slug]` → `src/app/posts/[slug]/page.tsx`
- **Method**: GET
- **Parameters**: `slug` (dynamic route parameter)
- **Response**: Static HTML page with blog post content
- **No changes**: Route structure unchanged

### Internal APIs

**Blog Post API**: `src/lib/api.ts`
- **Function**: `getAllPosts()` - reads markdown files and returns post metadata
- **No changes**: Function signature and behavior unchanged

**Markdown Processing**: `src/lib/markdownToHtml.ts`
- **Function**: Converts markdown to HTML using remark
- **No changes**: Processing logic unchanged

## Upgrade Impact

**No API contract changes** - upgrade is transparent to routing and data access patterns.

All existing routes, components, and data access functions remain compatible with Next.js 16.

## Testing Contracts

**Verification Required**:
- ✅ Home page route (`/`) renders correctly
- ✅ Blog post routes (`/posts/[slug]`) render correctly
- ✅ Static generation works (build succeeds)
- ✅ Client-side navigation works
- ✅ No runtime errors in browser console

**No new contracts to test** - verify existing functionality remains intact.

