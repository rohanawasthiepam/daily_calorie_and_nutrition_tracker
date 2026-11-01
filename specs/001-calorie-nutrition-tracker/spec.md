# Feature Specification: Calorie and Nutrition Tracker

**Feature Branch**: `001-calorie-nutrition-tracker`

**Created**: 2026-11-01

**Status**: Approved for planning — baseline v1.0

**Input**: Assignment 1 business request for a simple calorie and nutrition tracker.

## User Scenarios & Testing

### User Story 1 - Record and correct food intake (Priority: P1)

As the single user of the tracker, I can record a food or meal with its name, calorie total, protein total, and day so that my intake is included in that day's progress. I can correct or remove an entry if I made a mistake.

**Why this priority**: Recording intake is the core value of the tracker.

**Independent Test**: Add an entry for a chosen day, confirm it appears in that day's list and totals, then edit and delete it and verify the totals update.

**Acceptance Scenarios**:

1. **AC-001**: Given a valid food or meal name, non-negative calorie amount, non-negative protein amount, and supported date, when the user saves the entry, then the entry is recorded for that date and included in that day's totals.
2. **AC-002**: Given an existing entry, when the user changes its name or nutrition amounts and saves, then the entry and daily totals reflect the updated values.
3. **AC-003**: Given an existing entry, when the user confirms deletion, then the entry is removed and daily totals are recalculated.
4. **AC-004**: Given a missing name, invalid number, or unsupported date, when the user attempts to save, then the entry is not saved and a clear validation message identifies the invalid input.

### User Story 2 - Set and compare daily targets (Priority: P1)

As the user, I can set calorie and protein targets for a day and see recorded totals compared with those targets.

**Why this priority**: Intake is useful when the user can compare it against personal goals.

**Independent Test**: Set both targets, record entries, and verify calorie and protein totals, remaining amounts, and over-target indicators.

**Acceptance Scenarios**:

1. **AC-005**: Given positive calorie and protein targets for a day, when the user views that day, then the tracker displays both targets and the corresponding recorded totals.
2. **AC-006**: Given one or more entries for a day, when the daily view is displayed, then calorie and protein totals equal the sum of the saved entries for that date.
3. **AC-007**: Given a total below its target, when progress is displayed, then the remaining amount is target minus total; given a total equal to or above target, then remaining is zero and any excess is shown without capping the total or progress.
4. **AC-008**: Given a target change for a day, when that day is viewed, then its progress uses the target set for that day and previously recorded days retain their prior targets.
5. **AC-009**: Given a missing, zero, negative, or invalid target, when the user attempts to save it, then the target is rejected with a clear validation message.

### User Story 3 - Review daily history (Priority: P2)

As the user, I can select today or a previous calendar day and review its entries, targets, and progress.

**Why this priority**: Reviewing prior days makes logging useful beyond the current session while keeping the feature simple.

**Independent Test**: Record entries on two different dates, switch between them, and verify each date shows only its own entries, target, and totals.

**Acceptance Scenarios**:

1. **AC-010**: Given saved entries on today and a previous date, when the user selects either date, then only that date's entries and corresponding progress are shown.
2. **AC-011**: Given no entries or targets for a selected date, when the user opens that date, then an empty state is shown and totals are zero without an error.
3. **AC-012**: Given a future date, when the user attempts to select it for logging or progress, then the date is unavailable for tracking.

### Edge Cases

- An empty day has zero recorded intake and an explicit empty state.
- Deleting or editing the last entry updates totals immediately and returns the day to its empty state as appropriate.
- Intake may exceed either target; totals remain accurate and are not capped.
- Invalid numeric input, including negative values and non-finite values, is rejected without changing saved data.
- A date without a configured target has no target comparison; the user is prompted to set one rather than being shown invented goals.
- Dates are calendar dates in the user's local browser timezone; future dates are not supported.
- This tracker records user-provided nutrition values and does not provide medical or dietary advice.

## Requirements

### Functional Requirements

- **FR-001**: The tracker MUST support one user without account creation or sign-in.
- **FR-002**: The user MUST be able to create a food or meal entry with a name, calorie amount, protein amount in grams, and calendar date.
- **FR-003**: Nutrition amounts MUST be entered as totals for the entry; the tracker MUST NOT require a food database, serving-size conversion, or automatic nutrition lookup.
- **FR-004**: The user MUST be able to edit and delete an existing entry.
- **FR-005**: The tracker MUST accept only non-empty names, non-negative whole-number calories, and non-negative protein values with at most one decimal place.
- **FR-006**: The user MUST be able to set positive calorie and protein targets for a selected supported date.
- **FR-007**: Target changes MUST apply only to the selected date; previously recorded days MUST retain their saved targets.
- **FR-008**: For a selected date, the tracker MUST calculate calorie and protein totals by summing that date's entries.
- **FR-009**: For a selected date with targets, the tracker MUST display totals, targets, remaining amounts, and over-target amounts when applicable; remaining amounts MUST NOT be negative.
- **FR-010**: The user MUST be able to review today and any previous calendar date, including days with no records.
- **FR-011**: The tracker MUST prevent future dates from being selected or saved.
- **FR-012**: The tracker MUST provide understandable validation feedback and MUST leave saved data unchanged after a rejected operation.
- **FR-013**: The tracker MUST provide an empty state when a selected day has no entries and MUST distinguish an unset target from a zero target.

### Key Entities

- **Meal Entry**: A user-recorded food or meal; includes a stable identity, name, calorie total, protein total in grams, and calendar date.
- **Daily Target**: A day's positive calorie target and positive protein target in grams. Each date's target is independent so target changes do not rewrite earlier days.
- **Daily Progress**: A view derived from one date's meal entries and target; includes calorie and protein totals, remaining amounts, and any excess.

## Success Criteria

### Measurable Outcomes

- **SC-001**: In a manual test, a user can save a valid entry and see its contribution to the selected day's totals in under one minute.
- **SC-002**: For a day with any number of saved entries, the displayed calorie and protein totals exactly equal the sum of the corresponding saved values.
- **SC-003**: In a manual test of 10 invalid entry or target submissions, all are rejected, each receives a clear explanation, and no rejected values alter saved data.
- **SC-004**: In a manual test switching between at least three dates, each date shows only its own entries and its own target.
- **SC-005**: A user can identify whether calorie and protein totals are below, equal to, or above their respective targets from the daily view.

## Assumptions

- The tracker is a fundamentals-level, single-user application; authentication, account recovery, multi-user sharing, cloud synchronization, exports, and third-party food databases are out of scope.
- The user enters the total calories and protein grams for each food or meal; quantities and per-serving conversions are not calculated.
- Calendar-day dates use the user's local browser timezone. Future-day logging is not needed.
- A target is set independently for each day, and the tracker does not invent default targets.
- Calorie amounts are whole numbers; protein supports up to one decimal place; both are non-negative for meal entries and strictly positive for targets.
- This is a personal tracking utility, not a medical device or source of nutrition recommendations.
- Data is available only in the current browser profile unless a later approved requirement adds synchronization or backup.

## Clarifications

### Session 2026-11-01

- Q: What user/account model should the assignment use? → A: One user, no login.
- Q: How should users enter nutrition for each food or meal? → A: Enter food/meal name, calories, and protein grams directly.
- Q: Should users be able to review and log meals for previous calendar days, or only track the current day? → A: Current and past days.
- Q: Can users correct a logged meal by editing or deleting it? → A: Allow editing and deleting entries.
- Q: When a user changes a daily calorie or protein target, how should that affect earlier days? → A: Earlier days keep the target that was in effect then.
