import { r as reactExports } from "./index-DU0cLvqb.js";
const STORAGE_KEY = "cozy-hook-admin";
const AUTH_KEY = "cozy-hook-admin-auth";
const ADMIN_PASSWORD = "cozyhook2025";
const DEFAULT_SETTINGS = {
  heroTitle: "The Cozy Hook",
  heroTagline: "Handmade Crochet with Love",
  featuredProductIds: [
    "plush-001",
    "plush-007",
    "key-007",
    "acc-009",
    "decor-004"
  ]
};
function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
  }
  return DEFAULT_SETTINGS;
}
function saveSettings(s) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
  }
}
function loadAuth() {
  try {
    return localStorage.getItem(AUTH_KEY) === "1";
  } catch {
    return false;
  }
}
function useAdmin() {
  const [settings, setSettings] = reactExports.useState(loadSettings);
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(loadAuth);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    saveSettings(settings);
  }, [settings]);
  const login = reactExports.useCallback(async (password) => {
    setIsLoading(true);
    setError(null);
    try {
      if (password === ADMIN_PASSWORD) {
        setIsAuthenticated(true);
        try {
          localStorage.setItem(AUTH_KEY, "1");
        } catch {
        }
        return true;
      }
      setError("Incorrect password. Please try again.");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);
  const logout = reactExports.useCallback(() => {
    setIsAuthenticated(false);
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {
    }
  }, []);
  const updateHero = reactExports.useCallback((title, tagline) => {
    setSettings((prev) => ({
      ...prev,
      heroTitle: title,
      heroTagline: tagline
    }));
  }, []);
  const updateFeaturedProducts = reactExports.useCallback((ids) => {
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
    updateFeaturedProducts
  };
}
export {
  useAdmin as u
};
