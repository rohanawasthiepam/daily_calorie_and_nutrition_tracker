# Validation Plan

**Feature**: Calorie and Nutrition Tracker  
**Baseline**: Specification v1.0, AC-001 through AC-012  
**Execution status**: Passed on 2026-11-01. Browser test runner: 14/14 checks
passed, 0 failed. Manual browser checks also passed.

## Test Data Convention

The examples use a user-local `today` date of `2026-11-01`; the app must use the
actual local date at runtime. "Past day" means any valid calendar date earlier
than today.

## Normal Cases

| ID | Input / action | Expected outcome |
|---|---|---|
| V-001 | Add `Oatmeal`, 250 calories, 8.5 g protein, today. | Entry saves; today shows 250 kcal and 8.5 g protein; entry count is 1. |
| V-002 | Add another entry with 100 calories and 1.5 g protein on the same day. | Totals are exactly 350 kcal and 10 g protein. |
| V-003 | Set today's targets to 500 kcal and 15 g protein with totals 350/10. | Remaining amounts are 150 kcal and 5 g; no excess is shown. |
| V-004 | Change today's target to 300 kcal and 8 g protein. | Remaining amounts are zero; excess is 50 kcal and 2 g protein; totals remain 350/10. |
| V-005 | Edit the oatmeal entry to 300 calories and 9 g protein. | Same entry identity remains; totals update to 400 kcal and 10.5 g. |
| V-006 | Confirm deletion of the edited entry. | Entry disappears; totals update; empty-day state appears if it was the last entry. |
| V-007 | Reload after adding an entry and target. | Entry and target remain available in the same browser profile. |

## Invalid Input

| ID | Input / action | Expected outcome |
|---|---|---|
| V-008 | Submit an empty or whitespace-only name. | Rejected with a visible name error; no entry or total changes. |
| V-009 | Submit calories `-1`, `1.5`, blank, or non-finite text. | Rejected; only whole non-negative calorie values are accepted. |
| V-010 | Submit protein `-0.1`, `1.25`, blank, or non-finite text. | Rejected; protein must be non-negative with at most one decimal place. |
| V-011 | Set calorie target to `0`, `-1`, or a fractional value. | Rejected; no target or progress changes. |
| V-012 | Set protein target to `0`, a negative value, or more than one decimal place. | Rejected; no target or progress changes. |
| V-013 | Attempt to save after deleting/altering local storage causes a read or write failure. | Clear error is shown; the app does not show success or silently replace prior data. |
| V-014 | Load malformed or unsupported saved JSON. | Clear error is shown; stored content remains unchanged and mutation forms are disabled. |

## Boundary and Edge Cases

| ID | Input / action | Expected outcome |
|---|---|---|
| V-015 | Save a named meal with 0 calories and 0 g protein. | Accepted; it appears as an entry and totals remain zero. |
| V-016 | Enter exact target totals (e.g. 500 kcal and 15 g). | Remaining and excess are both zero; view says target met. |
| V-017 | Open a valid past date with no entries or target. | Empty state and zero totals appear; target is identified as unset, not zero. |
| V-018 | Save an entry and target on yesterday, then change today's target. | Yesterday retains its original entry and target; today's target changes only today. |
| V-019 | Select a date after today or submit a future-date entry. | Rejected and selected date returns to the last supported date. |
| V-020 | Enter an impossible date such as `2026-02-30`. | Rejected as an invalid calendar date. |
| V-021 | Use a meal name containing markup such as `<img src=x onerror=alert(1)>`. | Name is shown literally as text; no markup is executed or rendered. |
| V-022 | Create multiple entries on three dates and switch dates. | Each date shows only its entries, totals, and target. |
| V-023 | Use keyboard only to navigate, submit, edit, cancel, and delete. | All controls are reachable, labeled, and operable; errors are announced. |

## Verification Results

| Cases | Method | Result |
|---|---|---|
| V-001, V-003 | Manual browser flow: set 2200 kcal/100 g targets and save a 550 kcal/20.5 g synthetic meal. | Pass: totals and 1650 kcal/79.5 g remaining displayed. |
| V-002, V-004, V-008–V-018, V-020, V-022 | Browser test runner: domain, date, progress, storage, and validation tests. | Pass: all covered assertions passed. |
| V-005–V-007 | Manual browser flow: edit, delete, reload, and confirm persisted values. | Pass: entry and progress updated as expected and survived reload. |
| V-019 | Manual browser flow: attempt to select tomorrow. | Pass: future date rejected, current date restored, and an alert shown. |
| V-021 | Manual browser flow: add a synthetic markup-like name. | Pass: name rendered as literal text; no markup executed. |
| V-023 | Keyboard-only browser flow: add, edit, and confirm-delete an entry; inspect invalid-field announcement. | Pass: actions were operable by keyboard, the error named Calories, and the field referenced the alert. |
| All | Browser test runner at [`tests/test-runner.html`](../tests/test-runner.html). | **14/14 checks passed; 0 failed.** Evidence: [`screenshots/browser-tests.png`](../screenshots/browser-tests.png). |
| App view | Manual browser capture with synthetic data. | Evidence: [`screenshots/daily-progress.png`](../screenshots/daily-progress.png). |

No product or test failures remain. Synthetic browser-profile data used during
manual checks was removed after screenshot capture. Run instructions are in
[`specs/001-calorie-nutrition-tracker/quickstart.md`](../specs/001-calorie-nutrition-tracker/quickstart.md).
