# Implementation Tasks: Fix React Hydration Error

**Feature**: `001-fix-hydration-error`  
**Created**: 2024-12-19  
**Status**: Ready for Implementation

## Task Phases

### Phase 1: Setup
- [x] TASK-001: Review current implementation and understand hydration flow

### Phase 2: Core Implementation
- [x] TASK-002: Extract NoFOUCScript function from theme-switcher.tsx for reuse
- [x] TASK-003: Modify layout.tsx to add suppressHydrationWarning to html element
- [x] TASK-004: Move blocking script to head section in layout.tsx
- [x] TASK-005: Update theme-switcher.tsx to remove Script component from body

### Phase 3: Validation
- [ ] TASK-006: Test page load - verify no hydration errors in console
- [ ] TASK-007: Test theme switching - verify functionality preserved
- [ ] TASK-008: Test theme persistence - verify preference saved and applied on refresh
- [ ] TASK-009: Test edge cases - localStorage disabled, multiple tabs, system preference changes

---

## Task Details

### TASK-001: Review current implementation and understand hydration flow
**Phase**: Setup  
**File**: `src/app/layout.tsx`, `src/app/_components/theme-switcher.tsx`  
**Description**: Review how the theme switcher currently works and when the script executes relative to React hydration.

**Acceptance**:
- Understand that script runs in body after React starts hydrating
- Identify that data-mode attribute is set after server render completes
- Confirm this causes the hydration mismatch

---

### TASK-002: Extract NoFOUCScript function from theme-switcher.tsx for reuse
**Phase**: Core Implementation  
**File**: `src/app/_components/theme-switcher.tsx`  
**Dependencies**: TASK-001  
**Description**: Export the NoFOUCScript function so it can be used in layout.tsx. Keep the function signature and logic identical.

**Acceptance**:
- NoFOUCScript function is exported from theme-switcher.tsx
- Function signature remains unchanged: `(storageKey: string) => void`
- Function logic is unchanged

---

### TASK-003: Modify layout.tsx to add suppressHydrationWarning to html element
**Phase**: Core Implementation  
**File**: `src/app/layout.tsx`  
**Dependencies**: TASK-001  
**Description**: Add `suppressHydrationWarning` prop to the `<html>` element to prevent React from warning about the data-mode attribute mismatch.

**Acceptance**:
- `<html>` element has `suppressHydrationWarning` prop
- No other changes to html element structure

---

### TASK-004: Move blocking script to head section in layout.tsx
**Phase**: Core Implementation  
**File**: `src/app/layout.tsx`  
**Dependencies**: TASK-002, TASK-003  
**Description**: Add a blocking script in the `<head>` section that executes NoFOUCScript before React hydration begins. Use dangerouslySetInnerHTML to inject the script.

**Acceptance**:
- Script is placed in `<head>` section before any other content
- Script uses NoFOUCScript function with STORAGE_KEY constant
- Script executes synchronously (blocking)
- Script sets data-mode attribute before React hydration

---

### TASK-005: Update theme-switcher.tsx to remove Script component from body
**Phase**: Core Implementation  
**File**: `src/app/_components/theme-switcher.tsx`  
**Dependencies**: TASK-004  
**Description**: Remove the Script component from ThemeSwitcher since the script is now in layout.tsx head. Keep the Switch component.

**Acceptance**:
- Script component removed from ThemeSwitcher return
- Switch component remains functional
- NoFOUCScript function remains exported for use in layout

---

### TASK-006: Test page load - verify no hydration errors in console
**Phase**: Validation  
**File**: N/A  
**Dependencies**: TASK-005  
**Description**: Open the application in a browser, check the developer console, and verify no React hydration errors appear.

**Acceptance**:
- No hydration errors in browser console
- Page loads without warnings
- HTML element has data-mode attribute set correctly

---

### TASK-007: Test theme switching - verify functionality preserved
**Phase**: Validation  
**File**: N/A  
**Dependencies**: TASK-005  
**Description**: Click the theme switcher button multiple times, cycling through system/dark/light modes, and verify themes change correctly.

**Acceptance**:
- Theme switcher button works correctly
- Themes change when clicked (system → dark → light → system)
- No console errors during theme switching
- Visual theme changes are immediate and smooth

---

### TASK-008: Test theme persistence - verify preference saved and applied on refresh
**Phase**: Validation  
**File**: N/A  
**Dependencies**: TASK-005  
**Description**: Set a theme preference, refresh the page, and verify the theme preference is preserved and applied immediately.

**Acceptance**:
- Theme preference is saved to localStorage
- On page refresh, saved theme is applied immediately
- No flash of incorrect theme before correct theme appears
- Works for all three modes: system, dark, light

---

### TASK-009: Test edge cases - localStorage disabled, multiple tabs, system preference changes
**Phase**: Validation  
**File**: N/A  
**Dependencies**: TASK-005  
**Description**: Test edge cases: disable localStorage, open multiple tabs and change theme in one, change system preference while page is open.

**Acceptance**:
- Application handles localStorage unavailable gracefully (defaults to system preference)
- Theme changes sync across multiple tabs via storage events
- System preference changes are detected and applied when mode is "system"
- No errors occur in any edge case scenario

