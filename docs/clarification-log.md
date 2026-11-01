# Clarification Log

**Feature**: Calorie and Nutrition Tracker  
**Business owner**: Mentor (user)  
**Date**: 2026-11-01

The questions below were asked before finalizing the specification. All five
answers are recorded in [spec.md](../specs/001-calorie-nutrition-tracker/spec.md).

| # | Question | Business-owner answer | Resulting decision | Unresolved item |
|---|---|---|---|---|
| Q1 | What user/account model should the assignment use? | One user, no login. | Single-user application; no accounts or authentication. | None. |
| Q2 | How should users enter nutrition for each food or meal? | Enter food/meal name, calories, and protein grams directly. | Save user-entered totals; no quantity conversion or food database. | None. |
| Q3 | Should users be able to review and log meals for previous calendar days, or only track the current day? | Current and past days. | Support today and previous calendar dates; future dates are unavailable. | None. |
| Q4 | Can users correct a logged meal by editing or deleting it? | Allow editing and deleting entries. | Provide edit and confirmed delete actions. | None. |
| Q5 | When a user changes a daily calorie or protein target, how should that affect earlier days? | Earlier days keep the target that was in effect then. | Store one target per day; changing a target affects only the selected date. | None. |

## Additional Assumptions

These are documented defaults, not additional business-owner answers:

- The user enters whole-number calories and protein with at most one decimal
  place.
- Both daily targets must be positive; no default target is invented.
- Dates use the browser's local calendar date and future dates are rejected.
- Data stays in the current browser profile and is not synchronized or backed
  up by the application.
- The tracker does not provide medical advice.

No material business decision remains unresolved for the scoped fundamentals
release.
