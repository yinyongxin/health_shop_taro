import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { useAppUserStore } from "./stores";
import "./app.css";
import { APP_ENV_CONFIG } from "./common";

function App({ children }: PropsWithChildren<any>) {
  const appUser = useAppUserStore();

  useLaunch(async () => {
    console.log("App Launch", APP_ENV_CONFIG);
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
