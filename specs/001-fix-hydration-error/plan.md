# Implementation Plan: Fix React Hydration Error

**Branch**: `001-fix-hydration-error` | **Date**: 2024-12-19 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-fix-hydration-error/spec.md`

## Summary

Fix React hydration error caused by `data-mode` attribute mismatch between server-rendered HTML and client-rendered HTML. The theme switcher's client-side script modifies the HTML element after React begins hydration, causing a mismatch. Solution: Move the blocking script to `<head>` to execute before React hydration, and add `suppressHydrationWarning` to the `<html>` element as a safety measure.

## Technical Context

**Language/Version**: TypeScript 5.5.2  
**Primary Dependencies**: Next.js 16.0.3, React 19.2.0  
**Storage**: Browser localStorage (client-side only)  
**Testing**: Manual browser testing, console verification  
**Target Platform**: Web browser (Next.js SSR/SSG)  
**Project Type**: Web application (Next.js App Router)  
**Performance Goals**: No performance degradation, maintain instant theme application  
**Constraints**: Must preserve existing theme switching functionality, no FOUC  
**Scale/Scope**: Single application, all pages affected

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

✅ **Single project**: One Next.js application  
✅ **No new dependencies**: Using existing Next.js and React APIs  
✅ **Simple solution**: Script placement change, no architectural changes  
✅ **No breaking changes**: Preserves all existing functionality

## Project Structure

### Documentation (this feature)

```text
specs/001-fix-hydration-error/
├── plan.md              # This file
├── spec.md              # Feature specification
└── checklists/
    └── requirements.md  # Quality checklist
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx              # Root layout (MODIFY: add suppressHydrationWarning, move script to head)
│   └── _components/
│       └── theme-switcher.tsx  # Theme switcher component (MODIFY: extract script for head placement)
```

**Structure Decision**: Next.js App Router structure. Modifications limited to `layout.tsx` and `theme-switcher.tsx`.

## Solution Approach

### Root Cause
The `NoFOUCScript` is injected as a `<script>` tag in the component body, which executes after React begins hydration. When the script sets `data-mode` on the `<html>` element, React detects a mismatch with the server-rendered HTML (which has no `data-mode` attribute).

### Solution Strategy
1. **Move blocking script to `<head>`**: Extract the script from the component body and place it in the `<head>` section of `layout.tsx` so it executes before React hydration begins.
2. **Add suppressHydrationWarning**: Add `suppressHydrationWarning` prop to the `<html>` element to prevent React from warning about the `data-mode` attribute mismatch (defensive measure).
3. **Preserve functionality**: Ensure the script still runs correctly and theme switching continues to work.

### Implementation Details

**File: `src/app/layout.tsx`**
- Add `suppressHydrationWarning` prop to `<html>` element
- Move the blocking script from `ThemeSwitcher` component to `<head>` section
- Script must execute synchronously before React hydration

**File: `src/app/_components/theme-switcher.tsx`**
- Extract `NoFOUCScript` function for use in layout
- Keep `Script` component for reference or remove if not needed
- Ensure `Switch` component continues to work correctly

## Complexity Tracking

> **No violations** - Simple script placement change, no architectural complexity added.

