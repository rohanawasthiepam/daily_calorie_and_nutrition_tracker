# User Interface Contract

The application is a single-page tracker. Its UI boundary is the browser; it
does not expose a network API.

## Daily View

- The selected date is visible and defaults to today's local calendar date.
- A date control permits today or an earlier date and rejects future dates.
- The view displays calorie and protein totals for the selected date.
- When a target exists, each nutrient displays target and remaining amount; a
  positive excess is made visible without capping the total.
- When no entries exist, the view presents an empty state and zero totals.
- When no target exists, the view asks the user to set one and does not invent a
  default.

## Meal Entry Form

- Fields: food/meal name, calories (whole number, minimum 0), protein grams
  (number with at most one decimal place, minimum 0), and date.
- Submit creates an entry. Edit loads the selected entry into the form; save
  replaces that entry. Delete requires confirmation.
- Invalid input produces a visible, field-associated error and does not mutate
  saved data.
- All controls have programmatic labels and can be operated with a keyboard.

## Daily Target Form

- Fields: positive calorie target and positive protein target in grams, for the
  selected date.
- Saving a target affects only the selected date.
- An invalid target is rejected with a visible message and does not mutate
  saved data.

## Persistence and Errors

- Successful state changes survive reload in the same browser profile.
- Storage read, parse, or write failures are communicated to the user; the UI
  must not show a success state for an operation that was not persisted.
- User-provided names are rendered as literal text.
