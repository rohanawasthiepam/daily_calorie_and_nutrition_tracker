# Constitution Rationale

The project constitution is at
[.specify/memory/constitution.md](../.specify/memory/constitution.md).
The following principles and constraints were chosen for this fundamentals
assignment.

## Principles

| Principle | Why it matters | Application to this project |
|---|---|---|
| User value and bounded scope | Prevents speculative features from overwhelming the core problem. | Limit delivery to meal logging, calorie/protein targets, daily progress, and requested history. |
| Correctness and data integrity | Incorrect totals or silent data loss would undermine trust in the tracker. | Validate input, sum only the selected date, persist before showing success, and report storage failures. |
| Privacy by default | Food and nutrition records are personal information. | Keep data local to the browser profile; do not add login, analytics, sharing, or external data services. |
| Verification and traceability | Makes decisions reviewable and helps explain individual contribution. | Map AC-001–AC-012 to tasks, test cases, and validation evidence. |
| Simplicity and accessible interaction | Keeps the fundamentals solution usable and understandable. | Use native browser controls, keyboard access, labels, clear errors, and no UI framework. |

## Constraints

| Constraint | Why it matters | Application to this project |
|---|---|---|
| One user; no accounts or cloud sync | Keeps the assignment feasible and avoids unnecessary identity infrastructure. | Store state in the current browser profile only. |
| Nutrition totals are entered by the user | Avoids unapproved food catalog, serving conversion, and lookup complexity. | Each entry has a name, total calories, total protein, and date. |
| Not a medical product | Prevents a basic tracker from implying clinical authority. | Show arithmetic comparisons only; do not recommend targets or provide health advice. |
| No remote transmission of records | Protects personal food data. | Use no external services or network endpoints for application data. |
| Review and verify before delivery | Catches requirement drift and makes the submission reproducible. | Preserve the reviewed baseline, traceable tasks, browser tests, validation results, and run instructions. |
