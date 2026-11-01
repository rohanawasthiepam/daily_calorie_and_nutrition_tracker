import {
  addMeal,
  calculateProgress,
  deleteMeal,
  localDateString,
  setDailyTarget,
  updateMeal,
  validateDate,
} from "./domain.js";
import { loadState, saveState } from "./storage.js";

const byId = (id) => document.getElementById(id);
const mealForm = byId("meal-form");
const targetForm = byId("target-form");
const selectedDateInput = byId("selected-date");
const mealList = byId("meal-list");
const appMessage = byId("app-message");
const appError = byId("app-error");

let state;
let selectedDate = localDateString();
let editingId = null;

function clearError() {
  appError.hidden = true;
  appError.textContent = "";
  document.querySelectorAll("[aria-invalid='true']").forEach((input) => {
    input.removeAttribute("aria-invalid");
    input.removeAttribute("aria-describedby");
  });
}

function clearMessage() {
  appMessage.textContent = "";
}

function showError(error) {
  clearMessage();
  appError.textContent = error instanceof Error ? error.message : "The change could not be saved.";
  appError.hidden = false;
  const field = error?.field;
  if (field) {
    const form = field === "proteinGrams" || field === "calories"
      ? (document.activeElement?.form ?? mealForm)
      : mealForm;
    const input = field === "date" ? selectedDateInput : form.elements.namedItem(field);
    if (input) {
      input.setAttribute("aria-invalid", "true");
      input.setAttribute("aria-describedby", "app-error");
    }
  }
}

function showMessage(message) {
  clearError();
  appMessage.textContent = message;
}

function saveCandidate(nextState, message) {
  clearError();
  saveState(nextState);
  state = nextState;
  render();
  showMessage(message);
}

function renderComparison(element, total, target, unit) {
  if (!target) {
    element.textContent = "Set a target for this day.";
    return;
  }
  const targetValue = target;
  if (total < targetValue) {
    element.textContent = `${targetValue - total} ${unit} remaining of ${targetValue} ${unit}`;
  } else if (total > targetValue) {
    element.textContent = `${total - targetValue} ${unit} over the ${targetValue} ${unit} target`;
  } else {
    element.textContent = `Target met: ${targetValue} ${unit}`;
  }
}

function renderEntries(entries) {
  mealList.replaceChildren();
  byId("entry-count").textContent = String(entries.length);
  byId("empty-day").hidden = entries.length !== 0;

  for (const entry of entries) {
    const item = document.createElement("li");
    item.className = "meal-item";

    const details = document.createElement("div");
    details.className = "meal-details";
    const name = document.createElement("strong");
    name.textContent = entry.name;
    const nutrition = document.createElement("span");
    nutrition.textContent = `${entry.calories} kcal · ${entry.proteinGrams} g protein`;
    details.append(name, nutrition);

    const actions = document.createElement("div");
    actions.className = "meal-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.className = "button-secondary";
    edit.textContent = "Edit";
    edit.setAttribute("aria-label", `Edit ${entry.name}`);
    edit.addEventListener("click", () => beginEdit(entry));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "button-danger";
    remove.textContent = "Delete";
    remove.setAttribute("aria-label", `Delete ${entry.name}`);
    remove.addEventListener("click", () => removeEntry(entry));

    actions.append(edit, remove);
    item.append(details, actions);
    mealList.append(item);
  }
}

function render() {
  selectedDateInput.value = selectedDate;
  selectedDateInput.max = localDateString();
  const progress = calculateProgress(state, selectedDate);

  byId("calorie-total").textContent = String(progress.calorieTotal);
  byId("protein-total").textContent = String(progress.proteinTotal);
  renderComparison(
    byId("calorie-comparison"),
    progress.calorieTotal,
    progress.target?.calories,
    "kcal",
  );
  renderComparison(
    byId("protein-comparison"),
    progress.proteinTotal,
    progress.target?.proteinGrams,
    "g",
  );
  byId("target-calories").value = progress.target?.calories ?? "";
  byId("target-protein").value = progress.target?.proteinGrams ?? "";
  renderEntries(progress.entries);
}

function resetMealForm() {
  mealForm.reset();
  editingId = null;
  byId("meal-submit").textContent = "Add food";
  byId("meal-cancel").hidden = true;
}

function beginEdit(entry) {
  clearError();
  clearMessage();
  editingId = entry.id;
  mealForm.elements.name.value = entry.name;
  mealForm.elements.calories.value = String(entry.calories);
  mealForm.elements.proteinGrams.value = String(entry.proteinGrams);
  byId("meal-submit").textContent = "Save changes";
  byId("meal-cancel").hidden = false;
  byId("meal-name").focus();
}

function removeEntry(entry) {
  if (!globalThis.confirm(`Delete "${entry.name}" from this day?`)) return;
  try {
    saveCandidate(deleteMeal(state, entry.id), "Food entry deleted.");
    if (editingId === entry.id) resetMealForm();
  } catch (error) {
    showError(error);
  }
}

selectedDateInput.addEventListener("change", () => {
  clearError();
  clearMessage();
  try {
    selectedDate = validateDate(selectedDateInput.value);
    resetMealForm();
    render();
  } catch (error) {
    showError(error);
    selectedDateInput.value = selectedDate;
  }
});

mealForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();
  clearMessage();
  const input = {
    name: mealForm.elements.name.value,
    calories: mealForm.elements.calories.value,
    proteinGrams: mealForm.elements.proteinGrams.value,
    date: selectedDate,
  };
  try {
    const nextState = editingId
      ? updateMeal(state, editingId, input)
      : addMeal(state, input, globalThis.crypto.randomUUID());
    saveCandidate(nextState, editingId ? "Food entry updated." : "Food entry added.");
    resetMealForm();
  } catch (error) {
    showError(error);
  }
});

byId("meal-cancel").addEventListener("click", () => {
  clearError();
  resetMealForm();
});

targetForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearError();
  clearMessage();
  const input = {
    calories: targetForm.elements.calories.value,
    proteinGrams: targetForm.elements.proteinGrams.value,
    date: selectedDate,
  };
  try {
    saveCandidate(setDailyTarget(state, input), "Daily targets saved.");
  } catch (error) {
    showError(error);
  }
});

try {
  state = loadState();
  render();
} catch (error) {
  mealForm.querySelectorAll("input, button").forEach((element) => { element.disabled = true; });
  targetForm.querySelectorAll("input, button").forEach((element) => { element.disabled = true; });
  showError(error);
}
