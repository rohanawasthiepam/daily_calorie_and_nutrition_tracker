# Calorie and Nutrition Tracker Constitution

## Core Principles

### I. User Value and Bounded Scope
Every feature MUST support recording food, tracking calorie and protein intake,
setting daily targets, or reviewing daily progress. Work MUST remain within the
approved fundamentals-level scope unless the business owner approves a change.
This keeps the deliverable focused and feasible.

### II. Correctness and Data Integrity
Nutrition totals MUST be calculated from saved entries for the selected calendar
date. Invalid operations MUST NOT corrupt or silently replace saved data. Edits,
deletions, target changes, and empty days MUST have explicit, testable outcomes.
Accurate comparisons are the core promise of a tracker.

### III. Privacy by Default
The application MUST collect only information needed for personal food and goal
tracking. It MUST NOT expose personal records to other users or third parties.
The tracker MUST NOT present its calculations as medical advice or prescribe
nutrition targets.

### IV. Verification and Traceability
Each user-facing requirement MUST map to uniquely identified acceptance
criteria and at least one validation case. Implementation changes MUST include
focused automated tests where practical, and verification results MUST be
recorded. This makes decisions reviewable and defects reproducible.

### V. Simplicity and Accessible Interaction
The solution MUST prefer the simplest design that satisfies approved
requirements. Core actions and errors MUST be understandable without technical
knowledge; controls MUST have accessible labels and usable keyboard behavior.
Avoiding unnecessary features keeps the assignment easy to operate and explain.

## Project Constraints

- The initial release is for one user and does not require login, account
  recovery, sharing, cloud synchronization, or third-party food lookup.
- Meal nutrition is entered directly by the user as total calories and protein
  grams; nutrition data is not independently verified.
- The application is a personal tracking utility, not a medical or clinical
  product. It MUST avoid diagnosis, treatment, or prescriptive nutrition advice.
- Any local persistence MUST be limited to the user's browser profile and
  MUST not transmit meal records to an external service.

## Development Workflow

- Specification acceptance criteria and validation cases MUST be reviewed
  before implementation.
- Each task MUST identify the acceptance criteria or supporting constraint it
  satisfies.
- Changes MUST be validated with the narrowest relevant tests first; failures
  MUST be reported rather than hidden.
- The README MUST explain how to run or inspect the application and its
  verification steps.

## Governance

This constitution governs feature specifications, plans, implementation, and
reviews in this project. Amendments MUST be recorded in this file, state a
semantic version change, and explain material changes. The specification
review MUST verify that requirements comply with these principles. Any
exception MUST be explicit in the plan or review record, justified, and
approved by the business owner before implementation.

**Version**: 1.0.0 | **Ratified**: 2026-11-01 | **Last Amended**: 2026-11-01
