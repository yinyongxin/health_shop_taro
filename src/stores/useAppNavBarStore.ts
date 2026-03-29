import { AppTabs } from "@/common";
import { createAppStore } from "./base";

interface AppNavBarState {
  tabActive: (typeof AppTabs)[number]["value"];
  updateTabActive: (value: (typeof AppTabs)[number]["value"]) => void;
}

export const useAppNavBarStore = createAppStore<AppNavBarState>(
  (set) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
  }),
  "appNavBar",
);
