import { createAppStore } from "./base";

export interface AppAuthFieldsState {
  isLogged: boolean;
  isMiniprogram: boolean;
}

interface AppAuthState extends AppAuthFieldsState {
  updateIsLogged: (value: boolean) => void;
  logout: () => void;
  updateMiniprogram: (value: boolean) => void;
}

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set) => ({
    isMiniprogram: false,
    updateMiniprogram: (value) => {
      set({ isMiniprogram: value });
    },

    isLogged: false,
    updateIsLogged: (value) => {
      set({ isLogged: value });
    },

    logout: () => {
      set({ isLogged: false });
    },
  }),
  "appAuth",
);
