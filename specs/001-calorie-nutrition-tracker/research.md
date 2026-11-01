# Research: Calorie and Nutrition Tracker

## Decision 1: Use a static browser application

- **Decision**: Implement with native HTML, CSS, and modern JavaScript ES modules.
- **Rationale**: The assignment is a small, single-user interactive tracker.
  Browser-native features avoid build tooling, framework overhead, and
  unnecessary technical choices. The inspected environment has Python 3.13 but
  does not have Node.js; a static application can be served and verified using
  Python's standard-library HTTP server without adding dependencies.
- **Alternatives considered**:
  - A Python-backed web application would add a server and database to a
    local-only, single-user feature.
  - A JavaScript framework would add dependencies and build configuration
    without improving the required flows.

## Decision 2: Store data in browser local storage

- **Decision**: Persist entries and per-day targets in `localStorage`.
- **Rationale**: This preserves data across browser reloads while satisfying the
  agreed no-login, browser-profile-only scope and preventing network transfer.
- **Alternatives considered**:
  - In-memory state would lose records on reload.
  - Remote storage would require an account or service and violate the
    approved privacy and scope constraints.
- **Tradeoff**: Clearing browser storage or changing browser profiles removes
  access to the data; backup and synchronization are out of scope.

## Decision 3: Keep calculations and persistence separate

- **Decision**: Put validation and daily calculations in a small domain module,
  local storage access in a storage module, and rendering/event handling in the
  application module.
- **Rationale**: This supports focused browser tests and prevents UI behavior
  from owning business rules.
- **Alternatives considered**: A single large script would be slightly shorter
  but make date handling and nutrition arithmetic harder to test and review.

## Decision 4: Test using browser-native tooling

- **Decision**: Check in a minimal HTML test runner and JavaScript tests that
  import the domain and storage modules; also run manual end-to-end checks in a
  browser.
- **Rationale**: The repository has no existing test framework and Node.js is
  not installed. This gives repeatable tests without adding project
  dependencies.
- **Alternatives considered**: Installing a JavaScript runtime or test
  framework solely for this small assignment would add setup work unrelated to
  the feature.
