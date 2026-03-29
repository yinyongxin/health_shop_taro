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

let requestInterceptorId: number | null = null;

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set, get) => ({
    isMiniprogram: false,
    updateMiniprogram: (value) => {
      set({ isMiniprogram: value });
    },
    token: "",
    updateToken: (value) => {
      if (requestInterceptorId !== null) {
        client.instance.interceptors.request.eject(requestInterceptorId);
      }
      requestInterceptorId = client.instance.interceptors.request.use(
        (config) => {
          const token = get().token;
          if (token) {
            config.headers.set("Authorization", `Bearer ${token}`);
          }
          return config;
        },
      );
      set({ token: value, isLogged: true });
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
      set({ token: "", isLogged: false });
      jumpWxGetCode();
    },
  }),
  "appAuth",
);
