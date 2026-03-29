import { useAppUserStore, useAppEnvStore } from "@/stores";
import { AppTabs } from "@/common";
import { Classify } from "@/components";
import { Home } from "./Home";
import My from "./My";
import { TabBar } from "./TabBar";

export default () => {
  const appUserStore = useAppUserStore();
  const { orgId } = useAppEnvStore();

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
        <Classify orgId={orgId} />
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
