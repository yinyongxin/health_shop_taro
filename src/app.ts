import { PropsWithChildren } from "react";
import { useLaunch } from "@tarojs/taro";
import { useAppUserStore } from "./stores";
import "./app.css";
import "./styles/index.css";

function App({ children }: PropsWithChildren<any>) {
  const appUser = useAppUserStore();

  useLaunch(async () => {});

  // children 是将要会渲染的页面
  return children;
}

export default App;
