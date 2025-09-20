import { client } from "@/client/client.gen";
import { getUrlCode, jumpWxGetCode } from "@/utils";
import { getWxRedirectByAppIdGreet } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { createAppStore } from "./base";

export interface AppAuthFieldsState {
  token?: string;
  isLogged: boolean;
}

interface AppAuthState extends AppAuthFieldsState {
  updateToken: (value: string) => void;
  updateIsLogged: (value: boolean) => void;
  logout: () => void;
}

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set) => ({
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
    },
  }),
  "appAuth",
);
