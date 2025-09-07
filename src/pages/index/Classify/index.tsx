import { BasePage } from "@/components";
import { View, Image, Text } from "@tarojs/components";
import { useRequest } from "@/hooks";
import { getGetClassifyList } from "@/client";
import { Sidebar } from "./Sidebar";
import { ClassifyItem } from "./ClassifyItem";

export const Classify = () => {
  const dataRequest = useRequest(async () => {
    const res = await getGetClassifyList();
    return res.data;
  });
  return (
    <BasePage fullScreen className="pb-[120px]">
      <View className="flex h-full w-full ">
        <View className="flex-1">
          <Sidebar />
        </View>
        <View className="flex-3 ">
          <View className="flex flex-wrap pr-2 ">
            {dataRequest.data?.map((item) => (
              <ClassifyItem key={item.id} info={item} />
            ))}
          </View>
        </View>
      </View>
    </BasePage>
  );
};
