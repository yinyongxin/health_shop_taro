import { useAppNavBarStore, useAppEnvStore } from "@/stores";
import { AppTabs } from "@/common";
import { Classify } from "@/components";
import { Home } from "./Home";
import My from "./My";
import { TabBar } from "./TabBar";

export default () => {
  const { tabActive, updateTabActive } = useAppNavBarStore();

  const { orgId } = useAppEnvStore();

  return (
    <>
      <div
        style={{
          display: tabActive === "home" ? "block" : "none",
        }}
      >
        <Home />
      </div>
      <div
        style={{
          display: tabActive === "my" ? "block" : "none",
        }}
      >
        <My />
      </div>
      <div
        style={{
          display: tabActive === "classify" ? "block" : "none",
        }}
      >
        <Classify orgId={orgId} />
      </div>

      <TabBar
        currentActive={tabActive}
        handleClick={(tab) => {
          updateTabActive(tab.value);
        }}
        tabs={AppTabs.filter((tab) => tab.show)}
      />
    </>
  );
};
