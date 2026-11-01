# Data Model: Calorie and Nutrition Tracker

All data is stored as one versioned JSON object in the current browser profile.
The application does not send records over the network.

## Meal Entry

| Field | Type | Rules |
|---|---|---|
| `id` | string | Stable, unique within the saved data. |
| `name` | string | Required after trimming whitespace. |
| `calories` | integer | Non-negative whole number. |
| `proteinGrams` | number | Non-negative, at most one decimal place. |
| `date` | string | Local calendar date formatted `YYYY-MM-DD`; not in the future. |

Entries belong to exactly one calendar date. The daily view selects entries by
exact date equality.

## Daily Target

| Field | Type | Rules |
|---|---|---|
| `date` | string | Local calendar date formatted `YYYY-MM-DD`; not in the future. |
| `calories` | integer | Positive whole number. |
| `proteinGrams` | number | Positive, at most one decimal place. |

There is at most one target per date. Updating a date's target does not alter any
other date's target. A date without a target remains explicitly unset.

## Persisted State

```json
{
  "version": 1,
  "entries": [],
  "targets": []
}
```

The loader validates the top-level version and collection shapes. Unsupported
versions or malformed data must produce a visible error; they must not be
silently reset.

## Derived Daily Progress

Daily progress is derived and is not stored separately:

- `calorieTotal` = sum of `calories` for entries whose `date` matches the
  selected date.
- `proteinTotal` = sum of `proteinGrams` for entries whose `date` matches the
  selected date.
- When a target exists, remaining amount is `max(target - total, 0)`.
- Excess amount is `max(total - target, 0)` and is displayed only when positive.
- When no target exists, totals remain available and target comparison is
  replaced by a prompt to set that day's target.
