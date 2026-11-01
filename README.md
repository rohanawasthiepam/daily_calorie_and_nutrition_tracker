# Calorie and Nutrition Tracker

A fundamentals-level, single-user browser application for logging meals,
tracking daily calories and protein, setting per-day targets, and reviewing
today or previous days. This is a personal tracking utility, not medical
advice.

## Run locally

Requirements: Python 3.10+ for the static file server and a modern browser.
The application has no package installation or external service.

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to use the tracker.
Open [http://127.0.0.1:8000/tests/test-runner.html](http://127.0.0.1:8000/tests/test-runner.html)
to run the browser test suite.

Meal entries and targets are stored in the current browser profile's local
storage. Clearing browser data removes them; this project does not sync or
back up records.

## Project structure

- [`specs/001-calorie-nutrition-tracker/`](specs/001-calorie-nutrition-tracker/) —
  reviewed spec, plan, research, data model, UI contract, quickstart, tasks, and
  spec quality checklist.
- [`docs/`](docs/) — clarification log, constitution rationale, review record,
  prompt/contribution log, and validation plan.
- [`src/`](src/) — browser application, domain rules, persistence, and styles.
- [`tests/`](tests/) — browser-native test runner and tests.
- [`screenshots/`](screenshots/) — implementation and verification evidence.
- [`.specify/memory/constitution.md`](.specify/memory/constitution.md) — project
  principles and constraints.

## Verify

1. Follow the [quickstart](specs/001-calorie-nutrition-tracker/quickstart.md).
2. Run the browser test runner and confirm zero failures.
3. Execute the normal, invalid, boundary, and edge cases in
   [`docs/validation-plan.md`](docs/validation-plan.md).
4. Review recorded outcomes and screenshots before submission.

## Repository

This workspace is the local Git repository for the assignment. The supplied
hosted remote is
[daily_calorie_and_nutrition_tracker](https://github.com/rohanawasthiepam/daily_calorie_and_nutrition_tracker).
It was not publicly accessible during this setup (the unauthenticated GitHub
API returned 404), so the repository may be private or not yet created. Once
the remote exists and GitHub credentials are configured locally, publish the
commits with:

```powershell
git push -u origin main
```

Do not commit passwords, access tokens, or other credentials.
