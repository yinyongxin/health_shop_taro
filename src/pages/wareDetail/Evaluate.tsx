import { LucideIcon, AppTag } from "@/components"
import Box from "@/components/Box"
import { View } from "@tarojs/components"

export const Evaluate = () => {
  return (
    <Box
      bgProps={{
        className: "bg-white rounded-lg",
      }}
    >
      <View className="px-[24px] py-[24px] flex flex-col gap-[16px]">
        <View className="flex justify-between items-center">
          <View className="text-[32px]">商品评价</View>
          <View className="text-gray-500 flex items-center">
            查看全部
            <LucideIcon name="chevron-right" size={20} />
          </View>
        </View>
        <View className="pt-[12px]">
          <View className="flex gap-[16px]">
            <AppTag status="secondary">经济</AppTag>
            <AppTag status="secondary">耐用</AppTag>
          </View>
        </View>
        <View className="pt-[12px]">
          <View className="flex gap-[16px]">
            <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
            <View className="flex-1 h-[150px] rounded-md flex-center bg-gray-100">
              <LucideIcon name="image" size={16} />
            </View>
          </View>
        </View>
      </View>
    </Box>
  )
}