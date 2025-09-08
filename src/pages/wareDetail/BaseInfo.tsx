import { WareInfo } from "@/client"
import { AppTag } from "@/components"
import Box from "@/components/Box"
import { View } from "@tarojs/components"

type BaseInfoProps = {
  info: WareInfo
}

export const BaseInfo = (props: BaseInfoProps) => {
  const { info } = props
  return (
    <Box
      bgProps={{
        className: "bg-white rounded-lg",
      }}
    >
      <View className="px-[24px] py-[24px] flex flex-col gap-[16px]">
        <View className="flex justify-between items-center">
          <View className="text-[40px] font-bold text-rose-500">
            ￥{info?.price}
          </View>
          <View className="text-gray-500">
            库存剩余：{info?.inventory}
          </View>
        </View>
        <View className="text-[32px] font-bold">{info?.name}</View>
        <View className="text-gray-500">{info?.deac}</View>
        <View className="flex gap-[8px]">
          <View>
            <AppTag size="lg" status="error">
              热销榜第一
            </AppTag>
          </View>
        </View>
      </View>
    </Box>
  )
}