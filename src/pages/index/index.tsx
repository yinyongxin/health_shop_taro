import { useAppNavBarStore, useAppEnvStore } from "@/stores";
import { ReactNode } from "react";
import { AppTabs } from "@/common";
import { Classify, HospitalList } from "@/components";
import { View } from "@tarojs/components";
import { Home } from "./Home";
import My from "./My";
import { TabBar } from "./TabBar";

export default () => {
  const { tabActive, updateTabActive } = useAppNavBarStore();

  const { orgId } = useAppEnvStore();

  const contentRender = (content: ReactNode, condition: boolean[]) => {
    const show = condition.every((item) => item);
    console.log("contentRender", { content, condition, show });
    return (
      <View
        style={{
          display: show ? "block" : "none",
        }}
      >
        {content}
      </View>
    );
  };

  return (
    <>
      {contentRender(<Home />, [tabActive === "home"])}
      {contentRender(<Classify orgId={orgId} />, [tabActive === "classify"])}
      {contentRender(<HospitalList className="" />, [tabActive === "hospital"])}
      {contentRender(<My />, [tabActive === "my"])}
      <TabBar
        currentActive={tabActive}
        handleClick={(tab) => {
          updateTabActive(tab.value);
        }}
        tabs={AppTabs.filter((tab) => {
          if (tab.value === "hospital") {
            // 医院tab仅在orgId存在时显示
            return !orgId;
          }
          if (tab.value === "classify") {
            // 分类tab仅在orgId存在时显示
            return !!orgId;
          }
          return tab.show;
        })}
      />
    </>
  );
};
