/**
 * Storage adapter for Zalo Mini App.
 * Docs: Zalo Mini App does NOT support browser localStorage;
 * use Native Storage via setStorage/getStorage from zmp-sdk.
 * @see https://mini.zalo.me/documents/api/setStorage/
 * @see https://mini.zalo.me/documents/api/getStorage/
 *
 * This adapter uses Zalo storage when running inside the app,
 * and falls back to localStorage when running in browser (e.g. dev).
 */

import { getStorage, setStorage } from "zmp-sdk/apis";

const CART_STORAGE_KEY = "zaui-coffee-cart";

function getItemSyncFallback(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function setItemSyncFallback(key: string, value: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

/**
 * Storage object compatible with recoil-persist.
 * getItem can return Promise (recoil-persist supports it).
 * In Zalo Mini App: uses setStorage/getStorage (Native Storage).
 * In browser: uses localStorage for dev.
 */
export const zaloStorage = {
  getItem(key: string): string | null | Promise<string | null> {
    if (typeof window === "undefined") return null;
    const promise = getStorage({ keys: [key] })
      .then((data) => {
        const val = data[key];
        if (val == null) return null;
        return typeof val === "string" ? val : JSON.stringify(val);
      })
      .catch(() => getItemSyncFallback(key));
    return promise;
  },

  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    setStorage({ data: { [key]: value } }).catch(() =>
      setItemSyncFallback(key, value)
    );
  },
};

export { CART_STORAGE_KEY };
