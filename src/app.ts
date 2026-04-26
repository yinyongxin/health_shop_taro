import { PropsWithChildren, useEffect } from "react";
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

const getOrgId = () => {
  const url = new URL(window.location.href);
  const orgId = url.searchParams.get("orgId") || undefined;
  return orgId;
};

function App({ children }: PropsWithChildren<any>) {
  const appAuthStore = useAppAuthStore();
  const appUserStore = useAppUserStore();
  const appNavBarStore = useAppNavBarStore();
  const appEnvStore = useAppEnvStore();

  const startLogin = async (orgId?: string) => {
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

  useEffect(() => {
    const start = async () => {
      const orgId = getOrgId();
      // if (appAuthStore.isLogged) {
      if (appEnvStore.orgId !== orgId) {
        console.log("orgId", orgId);
        appEnvStore.updateOrgId(orgId);
        startLogin(orgId);
        return;
      }
      appUserStore.updateAddressList();
      return;
      // }
      await startLogin(orgId);
    };
    start();
  }, [appAuthStore.isLogged]);

  useLaunch(async () => {
    client.instance.interceptors.response.use((response) => {
      if (appAuthStore.isLogged && response.data?.code === 506) {
        if (!isDev) {
          appAuthStore.logout();
        }
      }
      return response;
    });
    const url = new URL(window.location.href);
    const showVConsole = url.searchParams.get("openVConsole");
    if (showVConsole) {
      new VConsole();
    }
    appNavBarStore.updateTabActive("home");
    appEnvStore.initHospitalList?.();
    appEnvStore.updateOrderStatus();
    appEnvStore.updateCardTypeDictList();
    wx.miniProgram.getEnv((res) => {
      appAuthStore.updateMiniprogram(res.miniprogram);
    });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
