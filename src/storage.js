import { createEmptyState, validateStoredState } from "./domain.js";

export const STORAGE_KEY = "calorie-nutrition-tracker-v1";

export function loadState(storage = globalThis.localStorage) {
  let serialized;
  try {
    serialized = storage.getItem(STORAGE_KEY);
  } catch {
    throw new Error("Browser storage could not be read. Your saved data has not been changed.");
  }
  if (serialized === null) return createEmptyState();

  let state;
  try {
    state = JSON.parse(serialized);
  } catch {
    throw new Error("Saved data could not be read. It has not been changed.");
  }
  return validateStoredState(state);
}

export function saveState(state, storage = globalThis.localStorage) {
  validateStoredState(state);
  let serialized;
  try {
    serialized = JSON.stringify(state);
    storage.setItem(STORAGE_KEY, serialized);
  } catch {
    throw new Error("Browser storage could not save this change. Your previous data is unchanged.");
  }
}
