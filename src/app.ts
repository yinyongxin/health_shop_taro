import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import VConsole from "vconsole";
import { useAppAuthStore, useAppUserStore } from "./stores";
import "./app.css";
import { APP_ENV_CONFIG } from "./common";
import { getWxRedirectByAppIdGreet } from "./client";
import {
  appToast,
  getUrlCode,
  isDev,
  jumpWxGetCode,
  removeUrlParameter,
} from "./utils";
import { client } from "./client/client.gen";

function App({ children }: PropsWithChildren<any>) {
  const appAuthStore = useAppAuthStore();
  const appUserStore = useAppUserStore();
  const checkLogin = async () => {
    // 如果已经登录，则返回true
    if (appAuthStore.isLogged) {
      return;
    }
    // 获取URL中的微信登录码
    const wxLoginCode = getUrlCode();
    if (wxLoginCode) {
      // 使用微信登录码进行登录
      const res = await getWxRedirectByAppIdGreet({
        path: { appId: APP_ENV_CONFIG.APPID },
        query: {
          code: wxLoginCode,
          orgId: APP_ENV_CONFIG.ORG_ID,
          state: "1",
        },
      });
      // 如果登录成功并获得访问令牌，则更新应用状态
      if (res.data?.code !== 0) {
        return;
      }
      appAuthStore.updateIsLogged(true);
      removeUrlParameter(["code"]);
    } else {
      // 如果没有登录码，则直接调用登录函数
      if (isDev) {
        return;
      }
      jumpWxGetCode();
    }
  };

  useLaunch(async () => {
    wx.miniProgram.getEnv((res) => {
      appAuthStore.updateMiniprogram(res.miniprogram);
    });
    const url = new URL(window.location.href);
    const showVConsole = url.searchParams.get("vConsole");
    if (showVConsole) {
      new VConsole();
    }
    appUserStore.updateTabActive("home");
    appUserStore.updateOrderStatus();
    await checkLogin();
    client.instance.interceptors.response.use((response) => {
      if (appAuthStore.isLogged && response.data.code === 506) {
        if (isDev) {
          appToast.error("登录已过期，请重新登录");
        } else {
          appAuthStore.logout();
        }
      }
      return response;
    });
    appUserStore.updateAddressList();
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
