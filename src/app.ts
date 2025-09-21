import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { useAppAuthStore, useAppUserStore } from "./stores";
import "./app.css";
import { APP_ENV_CONFIG } from "./common";
import {
  getWxRedirectByAppIdGreet,
  getWxShopAddrList,
  getWxShopCartLoad,
} from "./client";
import { getUrlCode, getWinxinLoginUrl, jumpWxGetCode } from "./utils";

function App({ children }: PropsWithChildren<any>) {
  const appAuthStore = useAppAuthStore();
  const appUserStore = useAppUserStore();
  const checkLogin = async () => {
    // 获取URL中的微信登录码
    const wxLoginCode = getUrlCode();
    console.log("getWinxinLoginUrl", getWinxinLoginUrl());
    // 如果已经登录，则返回true
    if (appAuthStore.isLogged) {
      return;
    }
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
      const url = new URL(window.location.href);
      url.searchParams.delete("code");
      url.searchParams.delete("state");
      window.location.href = url.toString();
    } else {
      // 如果没有登录码，则直接调用登录函数
      // jumpWxGetCode();
    }
  };
  const initCart = async () => {
    const res = await getWxShopCartLoad({
      query: {
        orgId: APP_ENV_CONFIG.ORG_ID,
      },
    });
    if (res.data?.code !== 0) {
      return;
    }
    appUserStore.updateCartInfo(res.data.data);
  };

 

  useLaunch(async () => {
    await checkLogin();
    initCart();
    appUserStore.updateAddressList();
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
