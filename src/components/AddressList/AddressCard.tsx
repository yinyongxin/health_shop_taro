import { Checkbox } from "@taroify/core"
import { View } from "@tarojs/components"
import classNames from "classnames"

type AddressCardProps = {
  showActions?: boolean,
  className?: string
}

export const AddressCard = (props: AddressCardProps) => {
  const { showActions = true, className } = props
  return (
    <View className={classNames("bg-white rounded-lg app-shadow py-[24px] flex flex-col gap-[16px]", className)}>
      <View className="flex items-center gap-2 px-2">
        <View className="text-[28px] font-semibold">银永鑫</View>
        <View>17637810650</View>
      </View>
      <View className="flex items-center gap-2 px-2">
        <View>浙江省</View>
        <View>杭州市</View>
        <View>西湖区</View>
        <View>五常街道</View>
      </View>
      <View className="px-2">
        <View>我是详细信息我是详细信息我是详细信息</View>
      </View>
      <View className="border-t border-gray-200 px-2 pt-2 flex justify-between items-center">
        <Checkbox size={18} className="text-[24px]!">默认地址</Checkbox>
        {showActions && (
          <View className="flex gap-2 items-center">
            <View className="text-rose-500">删除</View>
            <View className="text-sky-500">编辑</View>
          </View>
        )}
      </View>
    </View>
  )
}