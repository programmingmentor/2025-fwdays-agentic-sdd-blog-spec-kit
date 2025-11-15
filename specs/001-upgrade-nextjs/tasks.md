# Tasks: Upgrade Next.js to Latest Version

**Input**: Design documents from `/specs/001-upgrade-nextjs/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/, quickstart.md

**Tests**: Manual testing only - no automated test tasks required for this upgrade

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., [US1], [US3])
- Include exact file paths in descriptions

## Phase 1: Setup (Backup & Preparation)

**Purpose**: Prepare for upgrade by backing up current state and verifying prerequisites

- [ ] T001 Verify current Next.js version in package.json
- [ ] T002 Verify current React version in package.json
- [ ] T003 [P] Create backup commit with message "chore: backup before Next.js upgrade"
- [ ] T004 [P] Verify Node.js version compatibility with Next.js 16
- [ ] T005 [P] Review Next.js 15 to 16 upgrade guide for breaking changes

**Checkpoint**: Backup complete, prerequisites verified - ready for dependency updates

---

## Phase 2: Foundational (Dependency Updates & Codemod) ⚠️ CRITICAL

**Purpose**: Core upgrade tasks that MUST be complete before ANY user story can be tested

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T006 Update Next.js to latest version in package.json: `npm install next@latest`
- [ ] T007 Update React to stable version in package.json: `npm install react@latest react-dom@latest`
- [ ] T008 [P] Update TypeScript type definitions: `npm install --save-dev @types/react@latest @types/react-dom@latest`
- [ ] T009 [P] Update ESLint config if present: `npm install --save-dev eslint-config-next@latest`
- [ ] T010 Run Next.js upgrade codemod: `npx @next/codemod@latest upgrade latest`
- [ ] T011 Review codemod output for any warnings or errors
- [ ] T012 Verify TypeScript compilation: `npx tsc --noEmit`
- [ ] T013 Fix any TypeScript errors identified in tsconfig.json or source files
- [ ] T014 Verify next-env.d.ts is auto-generated correctly (should not be manually edited)

**Checkpoint**: Foundation ready - dependencies updated, codemod applied, TypeScript compiles - user story testing can now begin

---

## Phase 3: User Story 1 - Application Functions Correctly After Upgrade (Priority: P1) 🎯 MVP

**Goal**: Ensure the application functions identically to its current state after the Next.js upgrade, with all pages rendering correctly, navigation working, and interactive features functioning as before.

**Independent Test**: Run the application in development mode, build for production, and verify all pages render correctly, all navigation works, and all interactive features function as before the upgrade.

### Implementation for User Story 1

- [ ] T015 [US1] Test development server starts: `npm run dev`
- [ ] T016 [US1] Verify home page displays correctly at http://localhost:3000
- [ ] T017 [US1] Verify all blog posts are visible on home page
- [ ] T018 [US1] Test navigation to blog post detail page: Click on a blog post
- [ ] T019 [US1] Verify blog post detail page loads and displays full post content correctly
- [ ] T020 [US1] Test theme switching functionality on home page
- [ ] T021 [US1] Test theme switching functionality on blog post detail page
- [ ] T022 [US1] Verify theme changes apply correctly across all pages
- [ ] T023 [US1] Test production build: `npm run build`
- [ ] T024 [US1] Verify build completes successfully without errors
- [ ] T025 [US1] Test production server: `npm start`
- [ ] T026 [US1] Verify production server starts without runtime errors
- [ ] T027 [US1] Test all pages in production mode for correct rendering
- [ ] T028 [US1] Verify no console errors in browser DevTools
- [ ] T029 [US1] Check for visual regressions by comparing before/after appearance

**Checkpoint**: At this point, User Story 1 should be fully functional - application works identically to before upgrade

---

## Phase 4: User Story 3 - Development Experience Maintained (Priority: P3)

**Goal**: Ensure the development workflow remains functional so developers can continue developing features efficiently.

**Independent Test**: Start the development server, verify hot module replacement works, and ensure TypeScript compilation and linting continue to function correctly.

### Implementation for User Story 3

- [ ] T030 [US3] Verify development server starts successfully: `npm run dev`
- [ ] T031 [US3] Verify pages are accessible in development mode
- [ ] T032 [US3] Test hot module replacement: Make a code change in src/app/page.tsx
- [ ] T033 [US3] Verify browser updates automatically without full page reload
- [ ] T034 [US3] Test hot module replacement: Make a change in src/app/\_components/header.tsx
- [ ] T035 [US3] Verify component updates reflect immediately in browser
- [ ] T036 [US3] Edit a TypeScript file: src/lib/api.ts
- [ ] T037 [US3] Verify TypeScript type checking works correctly (check terminal output)
- [ ] T038 [US3] Introduce a TypeScript error intentionally to verify error detection
- [ ] T039 [US3] Verify TypeScript compiler reports the error correctly
- [ ] T040 [US3] Fix the intentional error and verify error clears
- [ ] T041 [US3] Test development server restart: Stop and restart `npm run dev`
- [ ] T042 [US3] Verify server restarts without errors

**Checkpoint**: At this point, User Stories 1 AND 3 should both work independently - application functions correctly and development experience is maintained

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Final verification and documentation

- [ ] T043 [P] Verify all blog posts are accessible: Test each post in \_posts/ directory
- [ ] T044 [P] Verify RSS feed still works (if applicable)
- [ ] T045 [P] Check package.json for any dependency version conflicts
- [ ] T046 [P] Verify tailwind.config.ts still works correctly
- [ ] T047 [P] Verify postcss.config.js still works correctly
- [ ] T048 Review Next.js 16 release notes for any features we should be aware of
- [ ] T049 Update documentation if any breaking changes affect usage
- [ ] T050 Run quickstart.md validation checklist from quickstart.md
- [ ] T051 Commit changes with descriptive message: "chore: upgrade Next.js to 16.x and React to 19.2"
- [ ] T052 Verify git status shows only expected changes

**Checkpoint**: Upgrade complete, all functionality verified, ready for code review

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Story 1 (P1) can start immediately after Foundational
  - User Story 3 (P3) can start after Foundational (can run in parallel with US1 if needed)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Independent from US1, can run in parallel

### Within Each User Story

- Core functionality testing before edge cases
- Development server testing before production build testing
- Basic functionality before advanced features
- Story complete before moving to next priority

### Parallel Opportunities

- Setup tasks T003, T004, T005 marked [P] can run in parallel
- Foundational tasks T008, T009 marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1 and 3 can start in parallel (if team capacity allows)
- Polish tasks T043-T047 marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch multiple verification tasks in parallel:
Task: "Verify home page displays correctly at http://localhost:3000"
Task: "Verify all blog posts are visible on home page"
Task: "Test theme switching functionality on home page"

# Launch production testing tasks in parallel:
Task: "Test production build: npm run build"
Task: "Verify build completes successfully without errors"
Task: "Test production server: npm start"
```

---

## Parallel Example: User Story 3

```bash
# Launch development workflow tests in parallel:
Task: "Verify development server starts successfully: npm run dev"
Task: "Test hot module replacement: Make a code change in src/app/page.tsx"
Task: "Edit a TypeScript file: src/lib/api.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (backup and preparation)
2. Complete Phase 2: Foundational (dependency updates and codemod) - CRITICAL - blocks all stories
3. Complete Phase 3: User Story 1 (application functions correctly)
4. **STOP and VALIDATE**: Test User Story 1 independently - verify all pages work, build succeeds, production runs
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 3 → Test independently → Deploy/Demo
4. Add Polish → Final verification → Deploy/Demo
5. Each phase adds value without breaking previous work

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (application functionality)
   - Developer B: User Story 3 (development experience)
3. Stories complete and verify independently
4. Team completes Polish phase together

---

## Notes

- [P] tasks = different files or independent operations, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
- If TypeScript errors occur, fix them before proceeding to next phase
- If build fails, investigate and fix before testing user stories
- Reference quickstart.md for detailed troubleshooting steps
- Avoid: skipping verification steps, proceeding with errors, ignoring codemod warnings

---

## Task Summary

**Total Tasks**: 52

- **Phase 1 (Setup)**: 5 tasks
- **Phase 2 (Foundational)**: 9 tasks
- **Phase 3 (User Story 1)**: 15 tasks
- **Phase 4 (User Story 3)**: 13 tasks
- **Phase 5 (Polish)**: 10 tasks

**Parallel Opportunities**: 12 tasks marked [P] can run in parallel

**MVP Scope**: Phases 1, 2, and 3 (User Story 1) - 29 tasks total

**Independent Test Criteria**:

- **User Story 1**: Run `npm run dev`, `npm run build`, `npm start` and verify all pages render correctly, navigation works, theme switching works, no runtime errors
- **User Story 3**: Run `npm run dev`, make code changes, verify HMR works, verify TypeScript compilation works
