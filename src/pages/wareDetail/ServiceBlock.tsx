import { LucideIcon, AppTag } from "@/components";
import Box from "@/components/Box";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { View, Text } from "@tarojs/components";

export const ServiceBlock = () => {
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
      >
        <View className="p-[24px] flex flex-col">
          <View className="rounded-md p-[24px] bg-linear-to-r from-gray-100 to-white text-[28px] font-semibold flex gap-[16px]">
            <Text>按摩</Text>
            <Text>60分钟</Text>
          </View>
          <View className="mt-[24px] flex flex-col gap-[24px]">
            <InfoCardItem label="服务部位" value="全身" />
            <InfoCardItem
              label="服务流程"
              value={
                <View className="flex flex-col gap-[16px]">
                  <View className="flex gap-[24px]">
                    <View className="text-amber-500">1</View>
                    <View className="flex-1">颈部按摩</View>
                    <View className="text-gray-300">30分钟</View>
                  </View>
                  <View className="flex gap-[24px]">
                    <View className="text-amber-500">2</View>
                    <View className="flex-1">背部按摩</View>
                    <View className="text-gray-300">30分钟</View>
                  </View>
                </View>
              }
            />
            <InfoCardItem
              label="服务设施"
              value={
                <View className="flex  gap-[16px]">
                  <AppTag status="secondary">免费Wifi</AppTag>
                  <AppTag status="secondary">一次性床单</AppTag>
                  <AppTag status="secondary">一次性衣物</AppTag>
                </View>
              }
            />
          </View>
        </View>
      </Box>
    </>
  );
};
