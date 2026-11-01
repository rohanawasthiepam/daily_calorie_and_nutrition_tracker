# Prompt and Contribution Log

**Project**: Calorie and Nutrition Tracker  
**Date**: 2026-11-01

## Setup and Major SDD Steps

| Step | Prompt / tool action | Key output | Human decision or contribution |
|---|---|---|---|
| Setup | User provided the Assignment 1 business request and submission checklist. | Scope established: record meals, track calories/protein, set targets, show daily progress, and produce SDD artifacts and implementation evidence. | User designated the mentor as business owner and asked that incomplete requirements be clarified. |
| Clarify Q1 | Asked what user/account model the assignment should use. | Candidate options included one user without login and multiple accounts. | User chose one user, no login. |
| Clarify Q2 | Asked how users should enter nutrition for each food or meal. | Candidate options included manual total entry or per-serving calculation. | User chose direct manual totals. |
| Clarify Q3 | Asked whether users can review/log previous days or only today. | Candidate options included current day only or current and past. | User chose current and past days. |
| Clarify Q4 | Asked whether a logged meal can be edited or deleted. | Candidate options included edit/delete, delete-only, or immutable entries. | User chose edit and delete. |
| Clarify Q5 | Asked how target changes should affect earlier days. | Candidate options included retaining earlier targets or applying latest target to all days. | User chose to retain earlier days' targets. |
| Specify | Drafted the feature specification from the request and five answers. | Requirements, assumptions, acceptance criteria AC-001–AC-012, and spec-quality checklist. | User reviewed and approved the spec as planning baseline v1.0. |
| Plan | Created technical plan, research, data model, UI contract, and quickstart. | Static HTML/CSS/ES-module app, local browser storage, browser-native test runner. | Chose the simplest dependency-free design; Node.js was not installed in the environment. |
| Tasks | Generated user-story phases and traceable tasks. | Setup, shared foundation, three user-story phases, and polish/evidence tasks. | Kept each task tied to ACs or project constraints. |
| Implement | Implemented the app and browser test runner. | Browser application with local persistence and testable domain functions. | Reviewed error behavior and added manual edge cases to the validation plan. |

## AI Contribution

The AI assistant drafted specification and design artifacts, implementation
files, test cases, and documentation based on the request and the business
owner's explicit answers. The business owner supplied the five scope decisions
and approved the planning baseline. Verification completed with 14/14 browser
checks passing and manual add/edit/delete, persistence, date-isolation,
future-date, markup-as-text, and keyboard-flow checks passing. Synthetic test
data was removed from the browser profile after evidence capture.
