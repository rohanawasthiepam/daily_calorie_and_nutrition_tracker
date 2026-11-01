import {
  addMeal,
  calculateProgress,
  createEmptyState,
  deleteMeal,
  localDateString,
  setDailyTarget,
  updateMeal,
  validateDate,
  validateMeal,
  validateStoredState,
  validateTarget,
} from "../src/domain.js";
import { loadState, saveState, STORAGE_KEY } from "../src/storage.js";

const today = "2026-11-01";
const yesterday = "2026-10-31";
const tomorrow = "2026-11-02";
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function equal(actual, expected, message) {
  assert(Object.is(actual, expected), `${message}: expected ${expected}, got ${actual}`);
}

function throws(action, messagePart, label) {
  let error;
  try {
    action();
  } catch (caught) {
    error = caught;
  }
  assert(error instanceof Error, `${label}: expected an error`);
  assert(error.message.includes(messagePart), `${label}: unexpected message "${error.message}"`);
}

function test(name, action) {
  try {
    action();
    checks.push({ name, passed: true });
  } catch (error) {
    checks.push({ name, passed: false, error: error.message });
  }
}

function sampleMeal(overrides = {}) {
  return {
    name: "Oatmeal",
    calories: "250",
    proteinGrams: "8.5",
    date: today,
    ...overrides,
  };
}

test("valid meal values are normalized and trimmed", () => {
  const meal = validateMeal(sampleMeal({ name: "  Oatmeal  " }), today);
  equal(meal.name, "Oatmeal", "name");
  equal(meal.calories, 250, "calories");
  equal(meal.proteinGrams, 8.5, "protein");
  equal(validateMeal(sampleMeal({ proteinGrams: ".5" }), today).proteinGrams, 0.5, "leading-decimal protein");
});

test("meal validation rejects blank names and invalid nutrition values", () => {
  throws(() => validateMeal(sampleMeal({ name: "   " }), today), "name", "blank name");
  throws(() => validateMeal(sampleMeal({ calories: "-1" }), today), "positive number", "negative calories");
  throws(() => validateMeal(sampleMeal({ calories: "1.5" }), today), "whole number", "fractional calories");
  throws(() => validateMeal(sampleMeal({ calories: "" }), today), "Enter a value", "blank calories");
  throws(() => validateMeal(sampleMeal({ proteinGrams: "-0.1" }), today), "positive number", "negative protein");
  throws(() => validateMeal(sampleMeal({ proteinGrams: "" }), today), "Enter a value", "blank protein");
  throws(() => validateMeal(sampleMeal({ proteinGrams: "2.25" }), today), "one decimal", "excess protein precision");
  throws(() => validateMeal(sampleMeal({ proteinGrams: "Infinity" }), today), "valid number", "non-finite protein");
});

test("entry add, edit, and delete preserve identity and update daily totals", () => {
  const initial = createEmptyState();
  const added = addMeal(initial, sampleMeal(), "meal-1", today);
  equal(added.entries.length, 1, "entry count after add");
  equal(calculateProgress(added, today).calorieTotal, 250, "calories after add");

  const updated = updateMeal(added, "meal-1", sampleMeal({
    name: "Oatmeal bowl",
    calories: "300",
    proteinGrams: "9",
  }), today);
  equal(updated.entries[0].id, "meal-1", "stable ID after edit");
  equal(calculateProgress(updated, today).calorieTotal, 300, "calories after edit");

  const deleted = deleteMeal(updated, "meal-1");
  equal(deleted.entries.length, 0, "entry count after delete");
  equal(calculateProgress(deleted, today).calorieTotal, 0, "calories after delete");
});

test("zero nutrition is valid for a named meal", () => {
  const state = addMeal(createEmptyState(), sampleMeal({
    calories: "0",
    proteinGrams: "0",
  }), "zero-meal", today);
  equal(state.entries.length, 1, "zero-nutrition entry count");
  equal(calculateProgress(state, today).calorieTotal, 0, "zero calorie total");
});

test("target values must be positive", () => {
  throws(() => validateTarget({ calories: "0", proteinGrams: "1", date: today }, today), "greater than zero", "zero calorie target");
  throws(() => validateTarget({ calories: "2000", proteinGrams: "-1", date: today }, today), "greater than zero", "negative protein target");
  throws(() => validateTarget({ calories: "2000", proteinGrams: "1.25", date: today }, today), "one decimal", "target precision");
});

test("progress sums entries and computes remaining, equality, and excess", () => {
  let state = addMeal(createEmptyState(), sampleMeal(), "meal-1", today);
  state = addMeal(state, sampleMeal({ name: "Fruit", calories: "100", proteinGrams: "1.5" }), "meal-2", today);
  state = setDailyTarget(state, { calories: "500", proteinGrams: "10", date: today }, today);
  let progress = calculateProgress(state, today);
  equal(progress.calorieTotal, 350, "calorie sum");
  equal(progress.proteinTotal, 10, "protein sum");
  equal(progress.caloriesRemaining, 150, "calorie remaining");
  equal(progress.proteinRemaining, 0, "protein remaining at target");
  equal(progress.proteinExcess, 0, "protein excess at target");

  state = setDailyTarget(state, { calories: "300", proteinGrams: "8", date: today }, today);
  progress = calculateProgress(state, today);
  equal(progress.caloriesRemaining, 0, "remaining above target");
  equal(progress.caloriesExcess, 50, "calorie excess");
  equal(progress.proteinExcess, 2, "protein excess");
});

test("target changes are isolated by calendar date", () => {
  let state = setDailyTarget(createEmptyState(), {
    calories: "2000", proteinGrams: "80", date: yesterday,
  }, today);
  state = setDailyTarget(state, { calories: "2200", proteinGrams: "90", date: today }, today);
  state = setDailyTarget(state, { calories: "2300", proteinGrams: "95", date: today }, today);
  equal(state.targets.length, 2, "one target per day");
  equal(calculateProgress(state, yesterday).target.calories, 2000, "past target retained");
  equal(calculateProgress(state, today).target.calories, 2300, "selected target updated");
});

test("entries and totals are isolated by calendar date", () => {
  let state = addMeal(createEmptyState(), sampleMeal(), "today-meal", today);
  state = addMeal(state, sampleMeal({
    name: "Past meal",
    calories: "100",
    proteinGrams: "2",
    date: yesterday,
  }), "past-meal", today);
  state = addMeal(state, sampleMeal({
    name: "Earlier meal",
    calories: "75",
    proteinGrams: "1",
    date: "2026-10-30",
  }), "earlier-meal", today);
  equal(calculateProgress(state, today).calorieTotal, 250, "today total");
  equal(calculateProgress(state, yesterday).calorieTotal, 100, "past total");
  equal(calculateProgress(state, "2026-10-30").calorieTotal, 75, "earlier total");
  equal(calculateProgress(state, tomorrow).entries.length, 0, "future day has no entries");
});

test("dates reject invalid calendar days and future dates", () => {
  throws(() => validateDate("2026-02-30", today), "valid calendar date", "invalid date");
  throws(() => validateDate(tomorrow, today), "Future dates", "future date");
  equal(validateDate(yesterday, today), yesterday, "past date");
});

test("empty days have zero totals and no invented target", () => {
  const progress = calculateProgress(createEmptyState(), yesterday);
  equal(progress.calorieTotal, 0, "empty calorie total");
  equal(progress.proteinTotal, 0, "empty protein total");
  equal(progress.target, null, "empty target");
  equal(progress.caloriesRemaining, null, "unset target comparison");
});

test("stored state rejects unsupported or malformed data", () => {
  throws(() => validateStoredState({ version: 2, entries: [], targets: [] }), "supported format", "unsupported version");
  throws(() => validateStoredState({ version: 1, entries: "not-an-array", targets: [] }), "supported format", "malformed collection");
});

test("browser storage round-trips valid state and preserves corrupt data on read failure", () => {
  const values = new Map();
  const fakeStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const state = addMeal(createEmptyState(), sampleMeal(), "meal-1", today);
  saveState(state, fakeStorage);
  equal(values.has(STORAGE_KEY), true, "saved storage key");
  equal(loadState(fakeStorage).entries[0].name, "Oatmeal", "loaded name");

  values.set(STORAGE_KEY, "{bad json");
  throws(() => loadState(fakeStorage), "not been changed", "corrupt JSON");
  equal(values.get(STORAGE_KEY), "{bad json", "corrupt value retained");
});

test("browser storage read and write failures are explicit", () => {
  const failingStorage = {
    getItem: () => { throw new Error("blocked"); },
    setItem: () => { throw new Error("quota"); },
  };
  throws(() => loadState(failingStorage), "could not be read", "storage read failure");
  throws(() => saveState(createEmptyState(), failingStorage), "could not save", "storage write failure");
});

test("local date formatting uses local calendar parts", () => {
  equal(localDateString(new Date(2026, 10, 1, 23, 30)), today, "local date");
});

const results = document.getElementById("results");
for (const check of checks) {
  const item = document.createElement("li");
  item.className = check.passed ? "pass" : "fail";
  item.textContent = check.passed ? `PASS: ${check.name}` : `FAIL: ${check.name} — ${check.error}`;
  results.append(item);
}

const passed = checks.filter((check) => check.passed).length;
const failed = checks.length - passed;
const summary = document.getElementById("summary");
summary.textContent = `${passed}/${checks.length} checks passed; ${failed} failed.`;
summary.className = failed === 0 ? "pass" : "fail";
