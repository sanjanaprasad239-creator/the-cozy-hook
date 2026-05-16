import { useCallback, useEffect, useState } from "react";
import { SAMPLE_BUNDLES } from "../data/products";
import type { AdminSettings, Bundle, PressEntry } from "../types/product";

const STORAGE_KEY = "cozy-hook-admin";
const AUTH_KEY = "cozy-hook-admin-auth";
const ADMIN_PASSWORD = "cozyhook2025";

const DEFAULT_SETTINGS: AdminSettings = {
  heroTitle: "The Cozy Hook",
  heroTagline: "Handmade Crochet with Love",
  featuredProductIds: [
    "plush-001",
    "plush-007",
    "key-007",
    "acc-001",
    "decor-006",
  ],
  soldOutProductIds: [],
  bundles: SAMPLE_BUNDLES,
  pressEntries: [],
  currentlyCrafting:
    "currently crafting: strawberry costumed bunny plushies this week! 🌸",
  productTimers: {},
};

function loadSettings(): AdminSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    // ignore
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(s: AdminSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    // ignore
  }
}

function loadAuth(): boolean {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}

export function useAdmin() {
  const [settings, setSettings] = useState<AdminSettings>(loadSettings);
  const [isAuthenticated, setIsAuthenticated] = useState(loadAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persist settings whenever they change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  const login = useCallback(async (password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem(AUTH_KEY, "1");
        } catch {
          // ignore
        }
        return true;
      }
      setError("Incorrect password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
      // ignore
    }
  }, []);

  const updateHero = useCallback((title: string, tagline: string) => {
    setSettings((prev) => ({
      ...prev,
      heroTitle: title,
      heroTagline: tagline,
    }));
  }, []);

  const updateFeaturedProducts = useCallback((ids: string[]) => {
    setSettings((prev) => ({ ...prev, featuredProductIds: ids }));
  }, []);

  const toggleSoldOut = useCallback((productId: string) => {
    setSettings((prev) => {
      const ids = prev.soldOutProductIds ?? [];
      return {
        ...prev,
        soldOutProductIds: ids.includes(productId)
          ? ids.filter((id) => id !== productId)
          : [...ids, productId],
      };
    });
  }, []);

  const addBundle = useCallback((bundle: Bundle) => {
    setSettings((prev) => ({
      ...prev,
      bundles: [...(prev.bundles ?? []), bundle],
    }));
  }, []);

  const updateBundle = useCallback((updated: Bundle) => {
    setSettings((prev) => ({
      ...prev,
      bundles: (prev.bundles ?? []).map((b) =>
        b.id === updated.id ? updated : b,
      ),
    }));
  }, []);

  const removeBundle = useCallback((bundleId: string) => {
    setSettings((prev) => ({
      ...prev,
      bundles: (prev.bundles ?? []).filter((b) => b.id !== bundleId),
    }));
  }, []);

  const addPressEntry = useCallback((entry: PressEntry) => {
    setSettings((prev) => ({
      ...prev,
      pressEntries: [...(prev.pressEntries ?? []), entry],
    }));
  }, []);

  const updatePressEntry = useCallback((updated: PressEntry) => {
    setSettings((prev) => ({
      ...prev,
      pressEntries: (prev.pressEntries ?? []).map((e) =>
        e.id === updated.id ? updated : e,
      ),
    }));
  }, []);

  const removePressEntry = useCallback((entryId: string) => {
    setSettings((prev) => ({
      ...prev,
      pressEntries: (prev.pressEntries ?? []).filter((e) => e.id !== entryId),
    }));
  }, []);

  const updateCurrentlyCrafting = useCallback((text: string) => {
    setSettings((prev) => ({ ...prev, currentlyCrafting: text }));
  }, []);

  const setProductTimer = useCallback(
    (productId: string, timer: { label: string; endDate: string }) => {
      setSettings((prev) => ({
        ...prev,
        productTimers: { ...(prev.productTimers ?? {}), [productId]: timer },
      }));
    },
    [],
  );

  const removeProductTimer = useCallback((productId: string) => {
    setSettings((prev) => {
      const timers = { ...(prev.productTimers ?? {}) };
      delete timers[productId];
      return { ...prev, productTimers: timers };
    });
  }, []);

  return {
    settings,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateHero,
    updateFeaturedProducts,
    toggleSoldOut,
    addBundle,
    updateBundle,
    removeBundle,
    addPressEntry,
    updatePressEntry,
    removePressEntry,
    updateCurrentlyCrafting,
    setProductTimer,
    removeProductTimer,
  };
}
