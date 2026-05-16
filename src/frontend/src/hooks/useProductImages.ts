import { useEffect, useState } from "react";

const STORAGE_KEY = "cozy-hook-product-images";

function readFromStorage(): Map<string, string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Map();
    const parsed = JSON.parse(raw) as Record<string, string>;
    if (typeof parsed !== "object" || parsed === null) return new Map();
    return new Map(Object.entries(parsed));
  } catch {
    return new Map();
  }
}

export function useProductImages(): Map<string, string> {
  const [images, setImages] = useState<Map<string, string>>(() =>
    readFromStorage(),
  );

  useEffect(() => {
    // Refresh when another tab (or admin page) writes to localStorage
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY || e.key === null) {
        setImages(readFromStorage());
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return images;
}
