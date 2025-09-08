import { View } from "@tarojs/components"

type AddressCardProps = {

}

export const AddressCard = (props: AddressCardProps) => {
  return (
    <View className="bg-white rounded-lg shadow-md py-[24px] flex flex-col gap-[16px]">
      <View className="flex items-center gap-2 px-2">
        <View className="text-[28px] font-semibold">银永鑫</View>
        <View>17637810650</View>
      </View>
      <View className="flex items-center gap-2 px-2">
        <View>浙江省</View>
        <View>杭州市</View>
        <View>西湖区</View>
        <View>浙江大学</View>
      </View>
      <View className="px-2">
        <View>我是详细信息我是详细信息我是详细信息</View>
      </View>
    </View>
  )
}