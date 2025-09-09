import { createAppStore } from "./base";

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
  }),
  "appUser",
);
