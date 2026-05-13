const BASE_COUNT = 127;
const STORAGE_KEY = "cozy-hook-order-count";
function getStoredIncrement() {
  try {
    const val = localStorage.getItem(STORAGE_KEY);
    return val ? Number.parseInt(val, 10) : 0;
  } catch {
    return 0;
  }
}
function getOrderCount() {
  return BASE_COUNT + getStoredIncrement();
}
function incrementOrderCount() {
  try {
    const current = getStoredIncrement();
    localStorage.setItem(STORAGE_KEY, String(current + 1));
  } catch {
  }
}
export {
  getOrderCount as g,
  incrementOrderCount as i
};
