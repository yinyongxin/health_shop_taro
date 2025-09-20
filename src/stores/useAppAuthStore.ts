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
  logout: () => void;
}

export const useAppAuthStore = createAppStore<AppAuthState>(
  (set, get) => ({
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
    checkLogin: async () => {
      // 获取URL中的微信登录码
      const wxLoginCode = getUrlCode();
      const state = get();
      // 如果已经登录，则返回true
      if (state.isLogged) {
        return true;
      }
      if (wxLoginCode) {
        // 使用微信登录码进行登录
        const res = await getWxRedirectByAppIdGreet({
          path: { appId: APP_ENV_CONFIG.APPID },
          query: {
            code: wxLoginCode,
            orgId: APP_ENV_CONFIG.ORG_ID,
            state: "wx_login",
          },
        });
        // 如果登录成功并获得访问令牌，则更新应用状态
        if (res.data.code === 0) {
          set({ isLogged: true });
          const url = new URL(window.location.href);
          url.searchParams.delete("code");
          url.searchParams.delete("state");
          window.location.href = url.toString();
        }
      } else {
        // 如果没有登录码，则直接调用登录函数
        jumpWxGetCode();
      }
    },
  }),
  "appAuth",
);
