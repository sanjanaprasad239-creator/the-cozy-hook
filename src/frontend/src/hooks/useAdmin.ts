import { createActor } from "@/backend";
import type {
  Bundle as BackendBundle,
  PressEntry as BackendPressEntry,
  ProductTimer as BackendProductTimer,
} from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AdminSettings,
  Bundle,
  PressEntry,
  WhatsappSubscriber,
} from "../types/product";
import { DEFAULT_ADMIN_SETTINGS, useAdminSettings } from "./useQueries";

// Page-facing endDate is a YYYY-MM-DD string; the backend stores nanosecond
// bigint timestamps. Convert through one shared helper.
function dateStringToTimestamp(dateStr: string): bigint {
  const date = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(date.getTime())) return BigInt(0);
  return BigInt(date.getTime()) * 1_000_000n;
}

function toBackendBundles(bundles: Bundle[]): BackendBundle[] {
  return bundles.map((b) => ({
    id: b.id,
    productIds: b.productIds,
    name: b.name,
    description: b.description,
    imageUrl: b.imageUrl ?? "",
    badge: b.badge ?? "",
    price: BigInt(Math.round(b.price)),
  }));
}

function toBackendPressEntries(entries: PressEntry[]): BackendPressEntry[] {
  return entries.map((e) => ({
    id: e.id,
    url: e.url ?? e.link,
    outlet: e.outlet ?? "",
    title: e.title,
    date: e.date,
  }));
}

function toBackendTimers(
  timers: Record<string, { label: string; endDate: string }>,
): BackendProductTimer[] {
  return Object.entries(timers).map(([productId, timer]) => ({
    productId,
    caption: timer.label,
    endTimestamp: dateStringToTimestamp(timer.endDate),
  }));
}

export function useAdmin() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  const [settings, setSettings] = useState<AdminSettings>(
    DEFAULT_ADMIN_SETTINGS,
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Keep the latest settings available to stable callbacks without re-creating
  // them on every settings change.
  const settingsRef = useRef(settings);
  useEffect(() => {
    settingsRef.current = settings;
  }, [settings]);

  // Load settings from the backend canister (shared query key with
  // useAdminSettings). Falls back to defaults while the actor is unavailable so
  // pages never render blank.
  const { data: backendSettings } = useAdminSettings();
  useEffect(() => {
    if (backendSettings) setSettings(backendSettings);
  }, [backendSettings]);

  const runSave = useCallback(
    async (save: () => Promise<unknown>) => {
      if (!actor) return;
      try {
        await save();
        void queryClient.invalidateQueries({ queryKey: ["adminSettings"] });
      } catch {
        setError("Could not save changes. Please try again.");
      }
    },
    [actor, queryClient],
  );

  const login = useCallback(
    async (password: string): Promise<boolean> => {
      setIsLoading(true);
      setError(null);
      try {
        if (!actor) {
          setError("Backend is not available yet. Please try again later.");
          return false;
        }
        const ok = await actor.adminLogin(password);
        if (ok) {
          setIsAuthenticated(true);
        } else {
          setError("Incorrect password. Please try again.");
        }
        return ok;
      } catch {
        setError("Could not reach the backend. Please try again.");
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [actor],
  );

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setError(null);
  }, []);

  const updateHero = useCallback(
    (title: string, tagline: string) => {
      setSettings((prev) => ({
        ...prev,
        heroTitle: title,
        heroTagline: tagline,
      }));
      const a = actor;
      if (a) void runSave(() => a.updateHeroText(title, tagline));
    },
    [actor, runSave],
  );

  const updateFeaturedProducts = useCallback(
    (ids: string[]) => {
      setSettings((prev) => ({ ...prev, featuredProductIds: ids }));
      const a = actor;
      if (a) void runSave(() => a.setFeaturedProducts(ids));
    },
    [actor, runSave],
  );

  const toggleSoldOut = useCallback(
    (productId: string) => {
      const ids = settingsRef.current.soldOutProductIds ?? [];
      const nextIds = ids.includes(productId)
        ? ids.filter((id) => id !== productId)
        : [...ids, productId];
      setSettings((prev) => ({ ...prev, soldOutProductIds: nextIds }));
      const a = actor;
      if (a) void runSave(() => a.setSoldOutProducts(nextIds));
    },
    [actor, runSave],
  );

  const addBundle = useCallback(
    (bundle: Bundle) => {
      const next = [...(settingsRef.current.bundles ?? []), bundle];
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave],
  );

  const updateBundle = useCallback(
    (updated: Bundle) => {
      const next = (settingsRef.current.bundles ?? []).map((b) =>
        b.id === updated.id ? updated : b,
      );
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave],
  );

  const removeBundle = useCallback(
    (bundleId: string) => {
      const next = (settingsRef.current.bundles ?? []).filter(
        (b) => b.id !== bundleId,
      );
      setSettings((prev) => ({ ...prev, bundles: next }));
      const a = actor;
      if (a) void runSave(() => a.setBundles(toBackendBundles(next)));
    },
    [actor, runSave],
  );

  const addPressEntry = useCallback(
    (entry: PressEntry) => {
      const next = [...(settingsRef.current.pressEntries ?? []), entry];
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave],
  );

  const updatePressEntry = useCallback(
    (updated: PressEntry) => {
      const next = (settingsRef.current.pressEntries ?? []).map((e) =>
        e.id === updated.id ? updated : e,
      );
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave],
  );

  const removePressEntry = useCallback(
    (entryId: string) => {
      const next = (settingsRef.current.pressEntries ?? []).filter(
        (e) => e.id !== entryId,
      );
      setSettings((prev) => ({ ...prev, pressEntries: next }));
      const a = actor;
      if (a) void runSave(() => a.setPressEntries(toBackendPressEntries(next)));
    },
    [actor, runSave],
  );

  const updateCurrentlyCrafting = useCallback(
    (text: string) => {
      setSettings((prev) => ({ ...prev, currentlyCrafting: text }));
      const a = actor;
      if (a) void runSave(() => a.setCurrentlyCrafting(text));
    },
    [actor, runSave],
  );

  const setProductTimer = useCallback(
    (productId: string, timer: { label: string; endDate: string }) => {
      const next = {
        ...settingsRef.current,
        productTimers: {
          ...(settingsRef.current.productTimers ?? {}),
          [productId]: timer,
        },
      };
      setSettings(next);
      const a = actor;
      if (a)
        void runSave(() =>
          a.setProductTimers(toBackendTimers(next.productTimers)),
        );
    },
    [actor, runSave],
  );

  const removeProductTimer = useCallback(
    (productId: string) => {
      const timers = { ...(settingsRef.current.productTimers ?? {}) };
      delete timers[productId];
      const next = { ...settingsRef.current, productTimers: timers };
      setSettings(next);
      const a = actor;
      if (a)
        void runSave(() =>
          a.setProductTimers(toBackendTimers(next.productTimers)),
        );
    },
    [actor, runSave],
  );

  const setWhatsappSubscribers = useCallback(
    (subscribers: WhatsappSubscriber[]) => {
      setSettings((prev) => ({ ...prev, whatsappSubscribers: subscribers }));
      const a = actor;
      if (a) void runSave(() => a.setWhatsappSubscribers(subscribers));
    },
    [actor, runSave],
  );

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
    setWhatsappSubscribers,
  };
}
