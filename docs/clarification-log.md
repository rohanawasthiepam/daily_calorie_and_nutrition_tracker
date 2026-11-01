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

## Other Gaps Considered

The request also left these lower-impact details unspecified. They were not
sent as additional questions because a simple, reversible default was available
and they do not block the agreed flows. Each is recorded as an assumption so it
can be revisited without silently expanding scope.

| Unasked question | Business-owner answer | Decision | Unresolved item or assumption |
|---|---|---|---|
| Which nutrients beyond calories and protein should be tracked? | Not asked; the starting request names calories and protein. | Track only calories and protein in this release. | Additional nutrients are out of scope unless later approved. |
| Should a meal include a time, meal category, or serving quantity? | Not asked; Q2 selected manual total entry. | Save each entry by calendar date with name and totals; no time/category/serving calculation. | A more detailed meal breakdown can be considered later. |
| Should future dates be available for logging? | Not asked; the request focuses on daily intake and progress. | Support today and past dates only. | Future planning is out of scope for v1. |
| What numeric ranges and precision should be allowed? | Not asked; the request specifies calories and protein but not formats. | Accept non-negative whole-number calories and protein to one decimal place; require positive targets. | Owner may revise limits in a future specification. |
| What should users see before they set a daily target? | Not asked; no default target was requested. | Show an unset-target prompt; do not invent a goal. | None for v1. |
| What should the daily view show when intake exceeds a target? | Not asked; comparison behavior was not specified. | Keep the total accurate, show the excess, and never show a negative remaining amount. | None for v1. |
| How long should local records be retained, and should they be backed up? | Not asked; the application is single-user with no account. | Keep records in the current browser profile until the user clears browser data; no automatic deletion, backup, or sync. | Users must understand that browser-data removal removes access to records. |
| Should the tracker import/export or connect to a food database? | Not asked; Q2 selected direct manual totals. | No import/export or external lookup in the fundamentals release. | Revisit only if the owner expands scope. |
| Should the tracker recommend nutrition targets or provide health advice? | Not asked; the request is to track and compare. | Display arithmetic comparisons only; do not recommend goals or provide medical advice. | None for v1. |
| What languages and display units should be supported? | Not asked; no localization requirement was supplied. | Use English labels, calories shown as kcal, and protein shown in grams. | Additional locales or units require a future requirement. |
