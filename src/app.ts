import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import VConsole from "vconsole";
import {
  useAppAuthStore,
  useAppUserStore,
  useAppNavBarStore,
  useAppEnvStore,
} from "./stores";
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

client.instance.interceptors.response.use((response) => {
  const appAuthStore = useAppAuthStore.getState();
  if (appAuthStore.isLogged && response.data?.code === 506) {
    if (isDev) {
      appToast.error("登录已过期，请重新登录");
    } else {
      appAuthStore.logout();
    }
  }
  return response;
});

function App({ children }: PropsWithChildren<any>) {
  const appAuthStore = useAppAuthStore();
  const appUserStore = useAppUserStore();
  const appNavBarStore = useAppNavBarStore();
  const appEnvStore = useAppEnvStore();

  const checkLogin = async () => {
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
          orgId: appEnvStore.orgId,
          state: "1",
        },
      });
      // 如果登录成功并获得访问令牌，则更新应用状态
      if (res.data?.code !== 0) {
        return;
      }
      appAuthStore.updateIsLogged(true);
      removeUrlParameter(["code"]);
      removeUrlParameter(["state"]);
    } else {
      // 如果没有登录码，则直接调用登录函数
      if (isDev) {
        return;
      }
      jumpWxGetCode();
    }
  };

  const urlCheck = () => {
    const url = new URL(window.location.href);
    const orgId = url.searchParams.get("orgId");
    const isPublicPlatform = url.searchParams.get("isPublicPlatform");
    if (isPublicPlatform === "false") {
      orgId && appEnvStore.updateOrgId(orgId);
      appEnvStore.updateIsPublicPlatform(false);
    }
    if (isPublicPlatform === "true") {
      appEnvStore.updateOrgId("800001004");
      appEnvStore.updateIsPublicPlatform(true);
    }

    const showVConsole = url.searchParams.get("openVConsole");
    if (showVConsole) {
      new VConsole();
    }
    removeUrlParameter(["orgId", "isPublicPlatform"]);
  };

  useLaunch(async () => {
    urlCheck();
    appNavBarStore.updateTabActive("home");
    appUserStore.updateOrderStatus();
    wx.miniProgram.getEnv((res) => {
      appAuthStore.updateMiniprogram(res.miniprogram);
    });
    await checkLogin();

    appUserStore.updateAddressList();
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
