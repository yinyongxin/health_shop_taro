import { LucideIcon, AppTag } from "@/components";
import Box from "@/components/Box";
import { View } from "@tarojs/components";

/**
 * 邮寄
 */
export const Delivery = () => {
  return (
    <Box
      bgProps={{
        className: "bg-white rounded-lg",
      }}
    >
      <View className="px-[24px] py-[12px] flex flex-col">
        <View className="flex justify-between items-center gap-2 py-[12px]">
          <View className="text-gray-400">已选</View>
          <View className="flex-1 text-black">我是已经选择的内容</View>
          <View className="text-gray-400">
            <LucideIcon name="chevron-right" size={20} />
          </View>
        </View>
        <View className="flex justify-between gap-2 py-[12px]">
          <View className="text-gray-400">地址</View>
          <View className="flex-1 text-black">浙江省 杭州市 西湖区</View>
          <View className="text-gray-400">
            <LucideIcon name="chevron-right" size={20} />
          </View>
        </View>
        <View className="">
          <View className="flex flex-col gap-[16px]">
            <View className="bg-gray-100 rounded">
              <View className="px-[24px] py-[24px]">
                <View className="flex justify-between items-center">
                  <View className="flex items-center gap-[8px]">
                    <LucideIcon size={14} name="truck" />
                    <View>商品配送</View>
                  </View>
                  <LucideIcon
                    size={14}
                    name="square-check"
                    className="text-orange-500"
                  />
                </View>
                <View className="flex  items-center gap-2 pt-1">
                  <View className="text-orange-500">有现货</View>
                  <View>今日18:00前付款</View>
                  <View> 预计2025-01-02送达</View>
                </View>
              </View>
            </View>
            <View className="rounded">
              <View className="px-[24px] py-[24px]">
                <View className="flex justify-between items-center">
                  <View className="flex items-center gap-[8px]">
                    <LucideIcon size={14} name="truck" />
                    <View>到店自取</View>
                  </View>
                  <LucideIcon
                    size={14}
                    name="square-check"
                    className="text-gray-500"
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="flex justify-between items-center gap-2 py-[12px]">
          <View className="text-gray-400">服务</View>
          <View className="flex-1 text-black flex gap-2">
            <AppTag
              size="default"
              status="secondary"
              prefix={<LucideIcon name="truck" />}
            >
              包邮
            </AppTag>
            <AppTag
              size="default"
              status="secondary"
              prefix={<LucideIcon name="truck" />}
            >
              包退
            </AppTag>
            <AppTag
              size="default"
              status="secondary"
              prefix={<LucideIcon name="truck" />}
            >
              包换
            </AppTag>
            <AppTag
              size="default"
              status="secondary"
              prefix={<LucideIcon name="truck" />}
            >
              七天无理由
            </AppTag>
          </View>
          <View className="text-gray-400">
            <LucideIcon name="chevron-right" size={20} />
          </View>
        </View>
      </View>
    </Box>
  );
};
