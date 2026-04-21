import { client } from "@/client/client.gen";
import { jumpWxGetCode } from "@/utils";
import { createAppStore } from "./base";
import { useAppEnvStore } from "./useAppEnvStore";

export interface AppAuthFieldsState {
  isLogged: boolean;
  isMiniprogram: boolean;
}

interface AppAuthState extends AppAuthFieldsState {
  updateIsLogged: (value: boolean) => void;
  logout: () => void;
  updateMiniprogram: (value: boolean) => void;
}

let requestInterceptorId: number | null = null;

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
      if (requestInterceptorId !== null) {
        client.instance.interceptors.request.eject(requestInterceptorId);
        requestInterceptorId = null;
      }
      set({ isLogged: false });
    },
  }),
  "appAuth",
);
