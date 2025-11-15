# Quick Start: Next.js Upgrade

**Date**: 2025-01-27  
**Feature**: Upgrade Next.js from 15.0.2 to 16.x

## Prerequisites

- Node.js installed (version compatible with Next.js 16)
- Git repository on feature branch `001-upgrade-nextjs`
- Current Next.js version: 15.0.2
- Current React version: 19.0.0-rc

## Upgrade Steps

### 1. Backup Current State

```bash
# Ensure you're on the feature branch
git checkout 001-upgrade-nextjs

# Create a backup commit (optional but recommended)
git add .
git commit -m "chore: backup before Next.js upgrade"
```

### 2. Update Dependencies

```bash
# Update Next.js, React, and React DOM to latest versions
npm install next@latest react@latest react-dom@latest

# Update TypeScript type definitions
npm install --save-dev @types/react@latest @types/react-dom@latest

# Update ESLint config if used
npm install --save-dev eslint-config-next@latest
```

### 3. Run Next.js Upgrade Codemod

```bash
# Automatically apply code transformations for Next.js 16
npx @next/codemod@latest upgrade latest
```

This codemod will:
- Update deprecated APIs
- Apply breaking change migrations
- Update import statements if needed

### 4. Verify TypeScript Compilation

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

Fix any TypeScript errors that appear. Common issues:
- Type definition mismatches (should be resolved by updating `@types/react`)
- Deprecated type imports (codemod should handle most)

### 5. Test Development Server

```bash
# Start development server
npm run dev
```

**Verify**:
- ✅ Server starts without errors
- ✅ Home page loads correctly
- ✅ Blog posts are visible
- ✅ Navigation works
- ✅ Theme switching works
- ✅ Hot module replacement works

### 6. Test Production Build

```bash
# Build for production
npm run build
```

**Verify**:
- ✅ Build completes without errors
- ✅ No TypeScript errors
- ✅ All pages generated successfully
- ✅ Static assets generated correctly

### 7. Test Production Server

```bash
# Start production server
npm start
```

**Verify**:
- ✅ Server starts without errors
- ✅ All pages accessible
- ✅ No runtime errors in browser console
- ✅ All features work as expected

### 8. Manual Testing Checklist

- [ ] Home page displays all blog posts
- [ ] Clicking a blog post navigates to post detail page
- [ ] Blog post content displays correctly (markdown rendered)
- [ ] Theme switching works on all pages
- [ ] Navigation between pages works smoothly
- [ ] No console errors in browser DevTools
- [ ] No visual regressions (compare before/after)

### 9. Commit Changes

```bash
# Stage all changes
git add .

# Commit with descriptive message
git commit -m "chore: upgrade Next.js to 16.x and React to 19.2

- Updated Next.js from 15.0.2 to 16.x (latest stable)
- Updated React from 19.0.0-rc to 19.2 (stable)
- Updated React DOM to match React version
- Updated TypeScript type definitions
- Applied Next.js codemod for automated migration
- Verified all functionality remains intact"
```

## Rollback Plan

If issues are discovered:

```bash
# Revert to previous commit
git reset --hard HEAD~1

# Or restore from backup commit
git reset --hard <backup-commit-hash>
```

## Troubleshooting

### TypeScript Errors After Upgrade

**Issue**: Type errors after updating dependencies

**Solution**:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Check that `@types/react` and `@types/react-dom` versions match React version
4. Verify `tsconfig.json` has correct settings

### Build Failures

**Issue**: Build fails with errors

**Solution**:
1. Check Next.js 15 to 16 upgrade guide for breaking changes
2. Review codemod output for any warnings
3. Check for deprecated APIs in your code
4. Verify all dependencies are compatible

### Runtime Errors

**Issue**: Application runs but has runtime errors

**Solution**:
1. Check browser console for error messages
2. Verify React 19 compatibility (check for deprecated React APIs)
3. Review Next.js 16 release notes for breaking changes
4. Test in development mode first before production build

## Next Steps

After successful upgrade:

1. ✅ All tests pass
2. ✅ No regressions detected
3. ✅ Ready for code review
4. ✅ Merge to main branch

## References

- [Next.js Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading)
- [Next.js 15 to 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)

