import { BasePage } from "@/components";
import { View, ScrollView } from "@tarojs/components";
import { useRequest } from "@/hooks";
import {  getWxShopCateList } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";

export const Classify = () => {
  const dataRequest = useRequest(async () => {
    const res = await getWxShopCateList({
      query: { orgId: APP_ENV_CONFIG.ORG_ID },
    });
    return res.data;
  });

  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="flex-1">
          <Sidebar />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-wrap pr-2 pb-[144px]">
            {dataRequest.data?.data?.map((item, index) => (
              <ClassifyItem key={item.id + index} info={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
