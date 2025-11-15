# Tasks: Search in a Blog

**Input**: Design documents from `/specs/001-blog-search/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are OPTIONAL and not included in this feature specification. Focus on manual testing and TypeScript compilation validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths follow Next.js App Router structure: `src/app/_components/`, `src/lib/`, `src/interfaces/`

---

## Phase 1: Setup (Type Definitions)

**Purpose**: Create type definitions required for all search functionality

- [ ] T001 [P] Create SearchQuery, SearchResult, SearchResults, and SearchState type definitions in `src/interfaces/search.ts`

---

## Phase 2: Foundational (Search Utilities)

**Purpose**: Core search functionality that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 [P] Implement normalizeQuery function in `src/lib/search.ts`
- [ ] T003 [P] Implement isQueryEmpty function in `src/lib/search.ts`
- [ ] T004 Implement searchPosts function in `src/lib/search.ts` (depends on T002, T003)

**Checkpoint**: Foundation ready - search utility functions complete, user story implementation can now begin

---

## Phase 3: User Story 1 - Basic Search Functionality (Priority: P1) 🎯 MVP

**Goal**: Enable users to find blog posts by entering search terms that match post titles or excerpts

**Independent Test**: Enter various search terms and verify that matching posts are displayed in search results. Test with terms matching titles, terms matching excerpts, empty queries (should show no results), and non-matching queries (should show "No results found").

### Implementation for User Story 1

- [ ] T005 [US1] Create SearchContainer component in `src/app/_components/search-container.tsx` that uses searchPosts function
- [ ] T006 [US1] Integrate SearchContainer into Header component in `src/app/_components/header.tsx` to make search accessible from all pages
- [ ] T007 [US1] Verify search matches post titles (case-insensitive, partial word matching)
- [ ] T008 [US1] Verify search matches post excerpts (case-insensitive, partial word matching)
- [ ] T009 [US1] Verify empty search query shows no results (empty state)
- [ ] T010 [US1] Verify non-matching queries display "No results found" message

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently. Users can search and see matching results.

---

## Phase 4: User Story 2 - Search Interface Accessibility (Priority: P1)

**Goal**: Ensure search interface is visible, accessible, and usable from all blog pages with keyboard navigation support

**Independent Test**: Visit any blog page, verify search input is visible and accessible. Type text and verify it displays. Submit search and verify query remains in input. Use Tab key to navigate to search input and verify keyboard-only interaction works.

### Implementation for User Story 2

- [ ] T011 [P] [US2] Create SearchInput component in `src/app/_components/search-input.tsx` with value, onChange, and onSubmit props
- [ ] T012 [US2] Implement keyboard event handlers in SearchInput (Enter to submit, Escape to blur) in `src/app/_components/search-input.tsx`
- [ ] T013 [US2] Add ARIA label and accessibility attributes to SearchInput component in `src/app/_components/search-input.tsx`
- [ ] T014 [US2] Ensure SearchInput is keyboard navigable (Tab key focus, keyboard-only interaction) in `src/app/_components/search-input.tsx`
- [ ] T015 [US2] Update SearchContainer to preserve search query in input after displaying results in `src/app/_components/search-container.tsx`
- [ ] T016 [US2] Verify search input is visible and accessible on all blog pages (homepage, post pages)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently. Search interface is accessible and keyboard-navigable.

---

## Phase 5: User Story 3 - Search Results Display (Priority: P1)

**Goal**: Display search results with post titles, excerpts, and navigation links, ordered by date (newest first)

**Independent Test**: Perform a search that returns multiple results. Verify each result shows title and excerpt. Verify results are ordered by date (newest first). Click a result and verify navigation to full post page works.

### Implementation for User Story 3

- [ ] T017 [P] [US3] Create SearchResults component in `src/app/_components/search-results.tsx` with results, onResultClick, and isVisible props
- [ ] T018 [P] [US3] Create SearchResultItem internal component within SearchResults to display individual results in `src/app/_components/search-results.tsx`
- [ ] T019 [P] [US3] Create NoResults internal component within SearchResults to display "No results found" message in `src/app/_components/search-results.tsx`
- [ ] T020 [US3] Implement result display logic showing post title and excerpt in SearchResults component in `src/app/_components/search-results.tsx`
- [ ] T021 [US3] Implement navigation to post pages via Link component in SearchResultItem in `src/app/_components/search-results.tsx`
- [ ] T022 [US3] Verify search results are ordered by date (newest first) in SearchContainer component in `src/app/_components/search-container.tsx`
- [ ] T023 [US3] Update SearchContainer to display SearchResults component with proper state management in `src/app/_components/search-container.tsx`

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently. Search results display correctly with proper information and navigation.

---

## Phase 6: User Story 4 - Search Performance (Priority: P2)

**Goal**: Ensure search results appear quickly (within 1 second) without noticeable delay

**Independent Test**: Perform searches with various query lengths. Measure response time - results should appear within 1 second. Test with blog containing 100+ posts to verify performance remains acceptable.

### Implementation for User Story 4

- [ ] T024 [US4] Add useMemo hook to cache search results in SearchContainer component in `src/app/_components/search-container.tsx`
- [ ] T025 [US4] Implement debouncing for search input to reduce filtering frequency in SearchContainer component in `src/app/_components/search-container.tsx` (optional optimization)
- [ ] T026 [US4] Verify search performance meets 1 second target for typical queries
- [ ] T027 [US4] Test search performance with 100+ posts to ensure acceptable response time

**Checkpoint**: All user stories should now be independently functional with acceptable performance.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final integration, styling, and edge case handling

- [ ] T028 [P] Add Tailwind CSS styling to SearchInput component matching existing design system in `src/app/_components/search-input.tsx`
- [ ] T029 [P] Add Tailwind CSS styling to SearchResults component matching existing design system in `src/app/_components/search-results.tsx`
- [ ] T030 [P] Ensure search components work correctly in dark mode (if theme switcher exists) in `src/app/_components/search-input.tsx` and `src/app/_components/search-results.tsx`
- [ ] T031 Handle edge case: special characters in search queries (treat as literal characters)
- [ ] T032 Handle edge case: very long search queries (100+ characters) - ensure no performance degradation
- [ ] T033 Handle edge case: whitespace-only queries (should be treated as empty)
- [ ] T034 Ensure search interface is responsive and works on mobile devices
- [ ] T035 Verify TypeScript compilation passes without errors (`npm run build`)
- [ ] T036 Run quickstart.md validation checklist to ensure all implementation steps completed

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2)
  - US1, US2, US3 are all P1 and can be worked on in parallel after foundational
  - US4 is P2 and can start after P1 stories are complete
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - Creates SearchContainer and basic integration
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Creates SearchInput component, can be parallel with US1
- **User Story 3 (P1)**: Depends on US1 (needs SearchContainer) - Creates SearchResults component
- **User Story 4 (P2)**: Depends on US1, US2, US3 - Adds performance optimizations

### Within Each User Story

- Components before integration
- Core implementation before edge cases
- Story complete before moving to next priority

### Parallel Opportunities

- **Phase 1**: T001 can run independently
- **Phase 2**: T002 and T003 can run in parallel (different utility functions)
- **Phase 3-5**: After foundational, US1, US2, and parts of US3 can be worked on in parallel:
  - T011 (SearchInput) can be parallel with T005 (SearchContainer)
  - T017, T018, T019 (SearchResults components) can run in parallel
- **Phase 7**: T028, T029, T030 (styling tasks) can run in parallel

---

## Parallel Example: User Story 2 & 3 Components

```bash
# Launch SearchInput component creation (US2):
Task: "Create SearchInput component in src/app/_components/search-input.tsx"

# Launch SearchResults component creation (US3) - can start after US1 SearchContainer exists:
Task: "Create SearchResults component in src/app/_components/search-results.tsx"
Task: "Create SearchResultItem internal component within SearchResults"
Task: "Create NoResults internal component within SearchResults"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (Type definitions)
2. Complete Phase 2: Foundational (Search utilities)
3. Complete Phase 3: User Story 1 (Basic search functionality)
4. **STOP and VALIDATE**: Test User Story 1 independently
   - Enter search terms matching titles
   - Enter search terms matching excerpts
   - Verify empty queries show no results
   - Verify non-matching queries show "No results found"
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo (Accessibility)
4. Add User Story 3 → Test independently → Deploy/Demo (Results display)
5. Add User Story 4 → Test independently → Deploy/Demo (Performance)
6. Add Polish → Final integration → Deploy

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (SearchContainer, basic integration)
   - Developer B: User Story 2 (SearchInput component) - can start in parallel
   - Developer C: User Story 3 (SearchResults component) - waits for US1 SearchContainer
3. After US1-3 complete:
   - Developer A: User Story 4 (Performance optimizations)
   - Developer B: Polish (Styling)
   - Developer C: Polish (Edge cases)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify TypeScript compilation after each phase (`npm run build`)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- All components must follow TypeScript strict mode requirements
- All components must be compatible with Next.js App Router and SSG
