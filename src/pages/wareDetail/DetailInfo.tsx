import { LucideIcon } from "@/components"
import { View } from "@tarojs/components"

export const DetailInfo = () => {
  return (
    <View className="pt-[32px]">
      <View className="flex justify-center text-[32px] font-semibold">
        商品详情
      </View>
      <View className="h-[500px] flex-center">
        <LucideIcon name="image" size={120} />
      </View>
      <View className="h-[500px] flex-center">
        <LucideIcon name="image" size={120} />
      </View>
      <View className="h-[500px] flex-center">
        <LucideIcon name="image" size={120} />
      </View>
      <View className="h-[500px] flex-center">
        <LucideIcon name="image" size={120} />
      </View>
      <View className="h-[500px] flex-center">
        <LucideIcon name="image" size={120} />
      </View>
    </View>
  )
}