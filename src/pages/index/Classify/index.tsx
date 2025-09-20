import { BasePage } from "@/components";
import { View, ScrollView } from "@tarojs/components";
import { CateInfo } from "@/client";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";

export const Classify = () => {
  const [mainActive, setMainActive] = useState<CateInfo>();
  const { subCategoryList = [] } = mainActive || {};

  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="flex-1">
          <Sidebar mainActive={mainActive} setMainActive={setMainActive} />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-wrap pr-2 pb-[144px]">
            {subCategoryList.map((item, index) => (
              <ClassifyItem key={item.id + index} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
