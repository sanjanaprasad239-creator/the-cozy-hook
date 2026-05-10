import { useCallback, useEffect, useState } from "react";
import type { AdminSettings } from "../types/product";

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
    "acc-009",
    "decor-004",
  ],
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

  return {
    settings,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    updateHero,
    updateFeaturedProducts,
  };
}
