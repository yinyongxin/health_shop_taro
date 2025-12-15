import { useAppUserStore } from "@/stores";
import { LucideIcon, TabBar } from "@/components";
import { Home } from "./Home";
import My from "./My";
import { Classify } from "./Classify";

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
    label: "我的",
    value: "my",
    icon: () => {
      return <LucideIcon name="user"></LucideIcon>;
    },
    show: true,
  },
] as const;

export default () => {
  const appUserStore = useAppUserStore();

  return (
    <>
      <div
        style={{
          display: appUserStore.tabActive === "home" ? "block" : "none",
        }}
      >
        <Home />
      </div>
      <div
        style={{
          display: appUserStore.tabActive === "my" ? "block" : "none",
        }}
      >
        <My />
      </div>
      <div
        style={{
          display: appUserStore.tabActive === "classify" ? "block" : "none",
        }}
      >
        <Classify />
      </div>

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
