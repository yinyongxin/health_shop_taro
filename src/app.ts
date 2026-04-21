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
import { getWxRedirectByAppIdGreet, getWxRedirectOrgIdAppId } from "./client";
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
    if (!isDev) {
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

  const checkLogin = async (orgId?: string) => {
    const { data } = await getWxRedirectOrgIdAppId({
      query: {
        orgId,
      },
    });
    const appId = data?.data;
    if (!appId) {
      appToast.error("未获取到医院信息，请确定是否正确访问");
      return;
    }
    // 获取URL中的微信登录码
    const wxLoginCode = getUrlCode();
    if (wxLoginCode) {
      // 使用微信登录码进行登录
      const res = await getWxRedirectByAppIdGreet({
        path: { appId },
        query: {
          code: wxLoginCode,
          orgId,
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
      jumpWxGetCode(appId);
    }
  };

  const urlCheck = () => {
    const url = new URL(window.location.href);
    const showVConsole = url.searchParams.get("openVConsole");
    if (showVConsole) {
      new VConsole();
    }
    const orgId = url.searchParams.get("orgId") || undefined;
    const isPublicPlatform =
      url.searchParams.get("isPublicPlatform") || undefined;
    if (isPublicPlatform === "true") {
      appEnvStore.updateOrgId(undefined);
      return undefined;
    } else if (isPublicPlatform === "false" && orgId) {
      appEnvStore.updateOrgId(orgId || undefined);
      return orgId;
    } else if (!orgId && !isPublicPlatform) {
      return appEnvStore.getOrgId();
    }
  };

  useLaunch(async () => {
    appEnvStore.initHospitalList?.();
    appNavBarStore.updateTabActive("home");
    appEnvStore.updateOrderStatus();
    appEnvStore.updateCardTypeDictList();
    wx.miniProgram.getEnv((res) => {
      appAuthStore.updateMiniprogram(res.miniprogram);
    });
    const checkRes = urlCheck();
    if (appAuthStore.isLogged) {
      appUserStore.updateAddressList();
      return;
    }
    await checkLogin(checkRes);
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
