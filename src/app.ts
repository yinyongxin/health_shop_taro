import { PropsWithChildren, useEffect } from "react";
import { useLaunch } from "@tarojs/taro";
import VConsole from "vconsole";
import {
  useAppAuthStore,
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

let loginRetryCount = 0;
const MAX_LOGIN_RETRY = 3;
let lastRetryTime = 0;
const RETRY_INTERVAL = 5000;

const getOrgId = () => {
  const url = new URL(window.location.href);
  const orgId = url.searchParams.get("orgId") || undefined;
  return orgId;
};

const startLogin = async (orgId?: string) => {
  try {
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
    const wxLoginCode = getUrlCode();
    if (wxLoginCode) {
      const res = await getWxRedirectByAppIdGreet({
        path: { appId },
        query: {
          code: wxLoginCode,
          orgId,
          state: "1",
        },
      });
      if (res.data?.code !== 0) {
        appToast.error("登录失败，请重试");
        return;
      }
      useAppAuthStore.getState().updateIsLogged(true);
      removeUrlParameter(["code"]);
      removeUrlParameter(["state"]);
    } else {
      if (isDev) {
        return;
      }
      jumpWxGetCode(appId);
    }
  } catch (error) {
    console.error("登录请求失败:", error);
    appToast.error("网络错误，请检查网络连接");
  }
};

client.instance.interceptors.response.use((response) => {
  if (response.data?.code === 506) {
    if (!isDev) {
      const now = Date.now();
      if (now - lastRetryTime > RETRY_INTERVAL) {
        loginRetryCount = 0;
      }
      if (loginRetryCount < MAX_LOGIN_RETRY) {
        loginRetryCount++;
        lastRetryTime = now;
        useAppAuthStore.getState().logout();
        startLogin(getOrgId()).catch(() => {});
      } else {
        appToast.error("登录重试次数已用尽，请刷新页面重试");
        loginRetryCount = 0;
      }
    }
  }
  return response;
});

function App({ children }: PropsWithChildren<any>) {
  const appAuthStore = useAppAuthStore();
  const appNavBarStore = useAppNavBarStore();
  const appEnvStore = useAppEnvStore();

  useEffect(() => {
    const start = async () => {
      const orgId = getOrgId();
      if (appEnvStore.orgId !== orgId) {
        appEnvStore.updateOrgId(orgId);
        appAuthStore.logout();
        return;
      }
      await startLogin(orgId);
    };
    start();
  }, [appAuthStore.isLogged]);

  useLaunch(async () => {
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

  return children;
}

export default App;
