# Quickstart and Validation

## Prerequisites

- Python 3.10+ (the application itself has no Python dependency; Python is used
  only to serve static files locally).
- A current browser with JavaScript and local storage enabled.

## Run the application

From the repository root, run:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/` in a browser. The server serves static files only;
meal records remain in that browser profile's local storage.

## Run the browser test suite

With the same local server running, open
`http://127.0.0.1:8000/tests/test-runner.html`. A passing run reports the
number of passed checks and zero failures. Any failing check is shown with its
name and error.

## End-to-end smoke check

1. Set positive calorie and protein targets for today.
2. Add a meal with 500 calories and 20.5 g protein.
3. Confirm today's totals increase by exactly those values.
4. Reload and confirm the entry and target remain.
5. Edit the meal, then delete it; confirm totals update after each operation.
6. Select a previous day and confirm its target and entries are independent.
7. Attempt negative nutrition, blank name, zero target, and a future date;
   confirm each is rejected without changing saved data.

Detailed inputs and expected outputs are listed in
`docs/validation-plan.md`.
