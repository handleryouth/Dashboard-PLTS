import { LocalStorageKey } from "types";

export function setLocalStorage(key: LocalStorageKey, value: string) {
  localStorage.setItem(key, value);
}

export function getLocalStorage(key: LocalStorageKey) {
  return localStorage.getItem(key);
}
