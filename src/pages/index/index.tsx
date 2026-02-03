import { useAppUserStore } from "@/stores";
import { AppTabs } from "@/common";
import { Home } from "./Home";
import My from "./My";
import { TabBar } from "./TabBar";
import { Classify } from "./Classify";

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
        tabs={AppTabs.filter((tab) => tab.show)}
      />
    </>
  );
};
