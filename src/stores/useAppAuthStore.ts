import { client } from "@/client/client.gen";
import { jumpWxGetCode } from "@/utils";
import { createAppStore } from "./base";

export interface AppAuthFieldsState {
  token?: string;
  isLogged: boolean;
}

interface AppAuthState extends AppAuthFieldsState {
  updateToken: (value: string) => void;
  updateIsLogged: (value: boolean) => void;
  logout: () => void;
  isMiniprogram: boolean;
  updateMiniprogram: (value: boolean) => void;
}

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set) => ({
    isMiniprogram: false,
    updateMiniprogram: (value) => {
      set({ isMiniprogram: value });
    },
    token: "",
    updateToken: (value) => {
      client.instance.interceptors.request.use((config) => {
        config.headers.set("Authorization", `Bearer ${value}`);
        return config;
      });
      set({ token: value, isLogged: true });
    },
    isLogged: false,
    updateIsLogged: (value) => {
      set({ isLogged: value });
    },
    logout: () => {
      set({ token: "", isLogged: false });
      jumpWxGetCode();
    },
  }),
  "appAuth",
);
