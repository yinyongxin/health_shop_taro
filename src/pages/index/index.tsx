import { useAppUserStore } from "@/stores";
import { LucideIcon, TabBar } from "@/components";
import { usePageParams } from "@/hooks";
import { useLoad } from "@tarojs/taro";
import { ReactNode } from "react";
import { Home } from "./Home";
import My from "./My";
import { Classify } from "./Classify";
import { Cart } from "./Cart";

const tabs = [
  {
    label: "首页",
    value: "home",
    icon: () => {
      // return <LucideIcon name="house"></LucideIcon>;
      return <LucideIcon name="house"></LucideIcon>;
    },
    show: true,
  },
  {
    label: "分类",
    value: "classify",
    icon: () => {
      return <LucideIcon name="layout-grid"></LucideIcon>;
    },
    show: true,
  },
  {
    label: "购物车",
    value: "cart",
    icon: () => {
      return <LucideIcon name="shopping-cart"></LucideIcon>;
    },
    show: false,
  },
  {
    label: "我的",
    value: "my",
    icon: () => {
      return <LucideIcon name="user"></LucideIcon>;
    },
    show: true,
  },
] as const;

type Values = (typeof tabs)[number]["value"];

export default () => {
  const appUserStore = useAppUserStore();

  const content: Record<Values, ReactNode> = {
    home: <Home />,
    my: <My />,
    classify: <Classify />,
    cart: <Cart />,
  };

  return (
    <>
      {content[appUserStore.tabActive as Values]}

      <TabBar
        currentActive={appUserStore.tabActive}
        handleClick={(tab) => {
          appUserStore.updateTabActive(tab.value);
        }}
        tabs={tabs.filter((tab) => tab.show)}
      />
    </>
  );
};
