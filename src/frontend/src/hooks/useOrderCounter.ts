const BASE_COUNT = 127;
const STORAGE_KEY = "cozy-hook-order-count";

function getStoredIncrement(): number {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val ? Number.parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}

export function getOrderCount(): number {
  return BASE_COUNT + getStoredIncrement();
}

export function incrementOrderCount(): void {
  try {
    const current = getStoredIncrement();
    localStorage.setItem(STORAGE_KEY, String(current + 1));
  } catch {
    // ignore
  }
}
