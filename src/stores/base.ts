import Taro from "@tarojs/taro";
import { create, StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

const StoreName = "eye_health_shop";

export const storage = createJSONStorage(() => {
  if (process.env.TARO_ENV === "h5") {
    return window.localStorage;
  }
  return {
    setItem: Taro.setStorageSync,
    getItem: Taro.getStorageSync,
    removeItem: Taro.removeStorageSync,
  };
});
export const createAppStore = <T>(f: StateCreator<T>, name: string) =>
  create<T>()(
    devtools(
      persist(f, {
        name: `${StoreName}_${name}`,
        storage,
      }),
    ),
  );
