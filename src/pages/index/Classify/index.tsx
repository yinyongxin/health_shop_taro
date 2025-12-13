import { BasePage } from "@/components";
import { View, ScrollView } from "@tarojs/components";
import { CateInfo, getWxShopCateList } from "@/client";
import { useState } from "react";
import { APP_ENV_CONFIG } from "@/common";
import { useRequest } from "@/hooks";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";
import { Skeleton } from "./Skeleton";

export const Classify = () => {
  const [mainActive, setMainActive] = useState<CateInfo>();
  const { subCategoryList = [] } = mainActive || {};
  const { data, loading } = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    setMainActive(res.data?.data[0]);
    return res.data;
  });
  if (loading && !data) {
    return <Skeleton />;
  }

  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="flex-1">
          <Sidebar
            cateList={data?.data || []}
            mainActive={mainActive}
            setMainActive={setMainActive}
          />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-wrap pr-2 pb-[180px]">
            {[...subCategoryList].map((item) => (
              <ClassifyItem key={item.id} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
