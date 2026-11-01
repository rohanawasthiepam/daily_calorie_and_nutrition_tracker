export function createEmptyState() {
  return { version: 1, entries: [], targets: [] };
}

export function localDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function fail(field, message) {
  const error = new Error(message);
  error.field = field;
  const labels = {
    name: "Food or meal name",
    calories: "Calories",
    proteinGrams: "Protein",
    date: "Date",
  };
  error.message = `${labels[field] ?? "Input"}: ${message}`;
  throw error;
}

export function validateDate(date, today = localDateString(), { allowFuture = false } = {}) {
  if (typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    fail("date", "Enter a valid calendar date.");
  }

  const [year, month, day] = date.split("-").map(Number);
  const parsed = new Date(year, month - 1, day);
  if (
    parsed.getFullYear() !== year ||
    parsed.getMonth() !== month - 1 ||
    parsed.getDate() !== day
  ) {
    fail("date", "Enter a valid calendar date.");
  }
  if (!allowFuture && date > today) {
    fail("date", "Future dates are not available for tracking.");
  }
  return date;
}

function parseAmount(value, field, { integer, positive = false } = {}) {
  const text = typeof value === "number" ? String(value) : String(value ?? "").trim();
  if (!text) fail(field, "Enter a value.");
  const amount = Number(text);
  if (!Number.isFinite(amount)) fail(field, "Enter a valid number.");
  if (positive ? amount <= 0 : amount < 0) {
    fail(field, positive ? "Enter a number greater than zero." : "Enter zero or a positive number.");
  }
  const pattern = integer ? /^\d+$/ : /^(?:\d+(?:\.\d)?|\.\d)$/;
  if (!pattern.test(text)) {
    fail(field, integer
      ? "Enter a whole number of calories."
      : "Enter a number with at most one decimal place.");
  }
  return amount;
}

export function validateMeal(input, today = localDateString()) {
  const name = typeof input.name === "string" ? input.name.trim() : "";
  if (!name) fail("name", "Enter a food or meal name.");

  return {
    name,
    calories: parseAmount(input.calories, "calories", { integer: true }),
    proteinGrams: parseAmount(input.proteinGrams, "proteinGrams", { integer: false }),
    date: validateDate(input.date, today),
  };
}

export function validateTarget(input, today = localDateString()) {
  return {
    calories: parseAmount(input.calories, "calories", { integer: true, positive: true }),
    proteinGrams: parseAmount(input.proteinGrams, "proteinGrams", { integer: false, positive: true }),
    date: validateDate(input.date, today),
  };
}

function validateStoredDate(date) {
  return validateDate(date, date, { allowFuture: true });
}

export function validateStoredState(state) {
  if (
    !state ||
    typeof state !== "object" ||
    state.version !== 1 ||
    !Array.isArray(state.entries) ||
    !Array.isArray(state.targets)
  ) {
    throw new Error("Saved data is not in a supported format. It has not been changed.");
  }

  const ids = new Set();
  for (const entry of state.entries) {
    if (
      !entry ||
      typeof entry.id !== "string" ||
      !entry.id ||
      ids.has(entry.id)
    ) {
      throw new Error("Saved meal entries are invalid. Saved data has not been changed.");
    }
    ids.add(entry.id);
    validateMeal({ ...entry, date: validateStoredDate(entry.date) }, entry.date);
  }

  const targetDates = new Set();
  for (const target of state.targets) {
    if (!target || targetDates.has(target.date)) {
      throw new Error("Saved daily targets are invalid. Saved data has not been changed.");
    }
    targetDates.add(target.date);
    validateTarget({ ...target, date: validateStoredDate(target.date) }, target.date);
  }
  return state;
}

export function addMeal(state, input, id, today = localDateString()) {
  if (typeof id !== "string" || !id) throw new Error("A meal entry ID is required.");
  if (state.entries.some((entry) => entry.id === id)) {
    throw new Error("A meal with this ID already exists.");
  }
  const meal = validateMeal(input, today);
  return { ...state, entries: [...state.entries, { id, ...meal }] };
}

export function updateMeal(state, id, input, today = localDateString()) {
  if (!state.entries.some((entry) => entry.id === id)) {
    throw new Error("That meal could not be found.");
  }
  const meal = validateMeal(input, today);
  return {
    ...state,
    entries: state.entries.map((entry) => entry.id === id ? { id, ...meal } : entry),
  };
}

export function deleteMeal(state, id) {
  if (!state.entries.some((entry) => entry.id === id)) {
    throw new Error("That meal could not be found.");
  }
  return { ...state, entries: state.entries.filter((entry) => entry.id !== id) };
}

export function setDailyTarget(state, input, today = localDateString()) {
  const target = validateTarget(input, today);
  const exists = state.targets.some((item) => item.date === target.date);
  const targets = exists
    ? state.targets.map((item) => item.date === target.date ? target : item)
    : [...state.targets, target];
  return { ...state, targets };
}

export function calculateProgress(state, date) {
  const entries = state.entries.filter((entry) => entry.date === date);
  const calorieTotal = entries.reduce((sum, entry) => sum + entry.calories, 0);
  const proteinTotal = entries.reduce((sum, entry) => sum + entry.proteinGrams, 0);
  const target = state.targets.find((item) => item.date === date) ?? null;

  return {
    entries,
    target,
    calorieTotal,
    proteinTotal: Math.round(proteinTotal * 10) / 10,
    caloriesRemaining: target ? Math.max(target.calories - calorieTotal, 0) : null,
    proteinRemaining: target
      ? Math.round(Math.max(target.proteinGrams - proteinTotal, 0) * 10) / 10
      : null,
    caloriesExcess: target ? Math.max(calorieTotal - target.calories, 0) : null,
    proteinExcess: target
      ? Math.round(Math.max(proteinTotal - target.proteinGrams, 0) * 10) / 10
      : null,
  };
}
