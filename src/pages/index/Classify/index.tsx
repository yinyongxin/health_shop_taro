import { BasePage } from "@/components";
import { View, Image, Text, ScrollView } from "@tarojs/components";
import { useRequest } from "@/hooks";
import { getGetClassifyList } from "@/client";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";

export const Classify = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetClassifyList();
    return res.data;
  });
  const list = dataRequest.data || [];
  return (
    <BasePage fullScreen>
      <View className="flex h-full w-full overflow-hidden">
        <View className="flex-1">
          <Sidebar />
        </View>
        <ScrollView scrollY className="flex-3">
          <View className="flex flex-wrap pr-2 pb-[144px]">
            {[...list, ...list, ...list, ...list, ...list].map(
              (item, index) => (
                <ClassifyItem key={item.id + index} info={item} />
              ),
            )}
          </View>
        </ScrollView>
      </View>
    </BasePage>
  );
};
