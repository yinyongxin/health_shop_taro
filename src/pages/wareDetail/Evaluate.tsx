import { LucideIcon, AppTag, Box } from "@/components";
import { View } from "@tarojs/components";

/**
 * 评价
 */
export const Evaluate = () => {
  return (
    <Box
      bgProps={{
        className: "bg-white rounded-xl",
      }}
    >
      <View className="px-[24px] py-[24px] flex flex-col gap-2">
        <View className="flex justify-between items-center">
          <View className="text-[32px]">商品评价</View>
          <View className="text-gray-500 flex items-center">
            查看全部
            <LucideIcon name="chevron-right" size={20} />
          </View>
        </View>
        <View className="pt-[12px]">
          <View className="flex gap-2">
            <AppTag status="secondary">经济</AppTag>
            <AppTag status="secondary">耐用</AppTag>
          </View>
        </View>
        <View className="pt-[12px]">
          <View className="flex gap-2">
            <View className="flex-1 h-[150px] rounded-lg flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-lg flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-lg flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-lg flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
          </View>
        </View>
      </View>
    </Box>
  );
};
