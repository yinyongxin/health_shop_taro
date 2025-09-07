import { client } from "@/client/client.gen";
import { createAppStore } from "./base";

export interface AppAuthFieldsState {
  token?: string;
  isLogged: boolean;
}

interface AppAuthState extends AppAuthFieldsState {
  updateToken: (value: string) => void;
  logout: () => void;
}

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set) => ({
    token: "",
    isLogged: false,
    updateToken: (value) => {
      client.instance.interceptors.request.use((config) => {
        config.headers.set("Authorization", `Bearer ${value}`);
        return config;
      });
      set({ token: value, isLogged: true });
    },
    logout: () => {
      set({ token: "", isLogged: false });
    },
  }),
  "appAuth",
);
