import { ProductInfo, SkuInfo } from "@/client";
import { LucideIcon, AppTag } from "@/components";
import Box from "@/components/Box";
import { safeJson } from "@/utils";
import { ScrollView, View } from "@tarojs/components";

type DeliveryProps = {
  info: ProductInfo;
};

/**
 * 邮寄
 */
export const Delivery = (props: DeliveryProps) => {
  const { info } = props;
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
      >
        <View className="px-[24px] py-[12px] flex flex-col">
          <View className="flex justify-between items-center gap-2 py-[12px]">
            <View className="text-gray-400">规格</View>
            <View className="text-gray-400">
              <LucideIcon name="chevron-right" size={20} />
            </View>
          </View>
        </View>
      </Box>
    </>
  );
};
