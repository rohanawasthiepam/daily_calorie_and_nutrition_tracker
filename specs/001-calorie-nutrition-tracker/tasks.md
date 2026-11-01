# Tasks: Calorie and Nutrition Tracker

**Input**: Design documents from `specs/001-calorie-nutrition-tracker/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/ui.md`, and `quickstart.md`

**Tests**: Included because the assignment requires verification evidence and
the project constitution requires focused automated tests where practical.

**Organization**: Tasks are grouped by user story. Every task identifies the
acceptance criteria or supporting constraint it satisfies.

## Phase 1: Setup

**Purpose**: Establish a runnable static application and browser test harness.

- [X] T001 [P] Create the semantic application shell and responsive styles in `index.html` and `src/styles.css` (supports SC-001, SC-005 and the accessible-interaction constraint).
- [X] T002 [P] Create a browser-native test runner and shared assertion helpers in `tests/test-runner.html` and `tests/tracker.test.js` (supports the verification and traceability constraint).

## Phase 2: Foundational

**Purpose**: Establish shared data validation and local persistence before
story-specific UI work.

- [X] T003 [P] Define versioned application state, local-date helpers, input validation, and daily total/progress calculations in `src/domain.js` (supports FR-005, FR-008, FR-009 and the correctness constraint).
- [X] T004 [P] Implement validated `localStorage` read/write operations and explicit read, parse, and quota errors in `src/storage.js` (supports FR-012 and the privacy-by-default constraint).

**Checkpoint**: Shared domain rules and storage are ready for story work.

## Phase 3: User Story 1 - Record and correct food intake (Priority: P1)

**Goal**: Create, edit, and delete manually entered meal records.

**Independent Test**: Save an entry, verify its values and contribution, edit
and delete it, and verify totals update; invalid entries leave saved state
unchanged.

### Tests for User Story 1

- [X] T005 [P] [US1] Add browser tests for trimmed names, valid non-negative nutrition values, invalid numbers, and entry add/edit/delete behavior in `tests/tracker.test.js` (AC-001 through AC-004; quote validation: non-empty name, whole-number calories >= 0, protein >= 0 with at most one decimal place).

### Implementation for User Story 1

- [X] T006 [US1] Implement meal-entry validation and add/edit/delete state operations in `src/domain.js` (AC-001 through AC-004; persist name, integer calories, protein grams, local date, and stable ID as defined in `data-model.md`).
- [X] T007 [US1] Wire the meal form, entry list, edit flow, confirmed deletion, and field-associated errors in `src/app.js` and `index.html` (AC-001 through AC-004; render names as literal text).
- [X] T008 [US1] Run browser tests and record entry-flow outcomes in `docs/validation-plan.md` (AC-001 through AC-004; verify rejected operations do not mutate saved data).

**Checkpoint**: User Story 1 works with valid and invalid input and is
independently demonstrable.

## Phase 4: User Story 2 - Set and compare daily targets (Priority: P1)

**Goal**: Set an independent target for a day and show accurate totals,
remaining amounts, and excess.

**Independent Test**: Set targets for a day with no entries and with entries;
verify totals, remaining values, equality, excess, and per-day target retention.

### Tests for User Story 2

- [X] T009 [P] [US2] Add browser tests for positive targets, rejected targets, sums, remaining amounts, equality, excess, and date-specific targets in `tests/tracker.test.js` (AC-005 through AC-009; target values must be positive, calories whole, and protein limited to one decimal place).

### Implementation for User Story 2

- [X] T010 [US2] Implement target validation and per-date target upsert in `src/domain.js` (AC-005, AC-008, AC-009; one target per date, with earlier dates unchanged).
- [X] T011 [US2] Render target entry, totals, progress, remaining amounts, and positive excess in `src/app.js` and `index.html` (AC-005 through AC-009; do not cap totals or show an invented target).
- [X] T012 [US2] Run target and progress browser tests and record outcomes in `docs/validation-plan.md` (AC-005 through AC-009; verify exact sums and remaining/excess formulas).

**Checkpoint**: User Story 2 displays accurate target comparisons for dates
with and without meal entries.

## Phase 5: User Story 3 - Review daily history (Priority: P2)

**Goal**: Select today or a past day and see only that day's entries, target,
and progress.

**Independent Test**: Create separate entries and targets on at least three
dates, switch between them, and confirm day isolation, empty state, reload
persistence, and future-date rejection.

### Tests for User Story 3

- [X] T013 [P] [US3] Add browser tests for local date formatting, past/current date selection, future-date rejection, empty days, and isolation across dates in `tests/tracker.test.js` (AC-010 through AC-012; date values use local `YYYY-MM-DD`).

### Implementation for User Story 3

- [X] T014 [US3] Implement local calendar-day formatting and reject future dates in `src/domain.js` (AC-010, AC-012; avoid UTC date shifts).
- [X] T015 [US3] Wire date navigation, per-day loading, and empty-state rendering in `src/app.js` and `index.html` (AC-010 through AC-012; show only records and target matching the selected date).
- [X] T016 [US3] Run multi-date, empty-state, reload, and future-date browser checks and record outcomes in `docs/validation-plan.md` (AC-010 through AC-012).

**Checkpoint**: User Story 3 can review prior days without mixing dates.

## Phase 6: Polish and Submission Evidence

**Purpose**: Complete cross-cutting quality, SDD records, and submission
instructions.

- [X] T017 [P] Verify keyboard access, programmatic labels, announced errors, literal text rendering, and storage-failure behavior in `src/app.js`, `index.html`, and `src/styles.css` (supports constitution principles III and V and FR-012).
- [X] T018 [P] Complete the business clarification log, constitution rationale, prompt log, specification review record, and full validation matrix in `docs/clarification-log.md`, `docs/constitution-rationale.md`, `docs/prompt-log.md`, `docs/review-record.md`, and `docs/validation-plan.md` (supports the assignment artifact requirements and traces decisions to the baseline spec).
- [X] T019 Document project scope, local run instructions, artifact locations, and verification commands in `README.md` (supports SC-001 through SC-005 and the development workflow constraint).
- [X] T020 Capture the working daily view and passing browser test run in `screenshots/` (supports the assignment evidence requirement; include no personal meal data).
- [X] T021 Run the complete quickstart and validation matrix and record pass/fail results in `docs/validation-plan.md` (verifies SC-001 through SC-005 and all AC-001 through AC-012).

## Dependencies and Execution Order

### Phase Dependencies

- Setup has no prerequisites.
- Foundational work depends on Setup and blocks all user stories.
- User Stories 1 and 2 can proceed independently after Foundational work.
- User Story 3 follows the core entry and target flows because its complete
  history view composes both.
- Polish and submission evidence depend on the implemented stories.

### User Story Dependencies

- **US1 (P1)**: Depends on shared domain and storage only; no dependency on
  another user story.
- **US2 (P1)**: Depends on shared domain and storage only; can be demonstrated
  with an empty day before US1 is complete.
- **US3 (P2)**: Composes the saved entries and targets from US1 and US2.

### Parallel Opportunities

- T001 and T002 can run in parallel.
- T003 and T004 can run in parallel.
- After Foundational, US1 and US2 can be implemented in parallel if file
  ownership is coordinated; both modify shared domain and UI files, so tasks
  within a single file must be serialized.
- Story-specific tests can be prepared independently from each other.
- T017 and T018 may proceed in parallel with README and screenshot preparation
  after implementation stabilizes.

## Implementation Strategy

### MVP First

1. Complete Setup and Foundational tasks.
2. Complete and validate User Story 1 as the first working increment.
3. Add User Story 2 and verify progress comparison.
4. Add User Story 3 and verify historical date isolation.
5. Complete cross-cutting accessibility, docs, screenshot, and full validation.

### Traceability

- **US1**: AC-001–AC-004
- **US2**: AC-005–AC-009
- **US3**: AC-010–AC-012
- **Cross-cutting**: FR-012; SC-001–SC-005; constitution privacy, accessibility,
  bounded-scope, and verification constraints.

## Notes

- Every task uses the required checkbox, sequential ID, optional parallel/story
  markers, and concrete file paths.
- Tasks are unchecked until implementation and verification are performed.
- Browser tests are run through `tests/test-runner.html` using the local static
  server described in `quickstart.md`.
