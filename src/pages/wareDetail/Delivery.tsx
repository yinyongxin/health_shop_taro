import { SkuListItem } from "@/client";
import { LucideIcon } from "@/components";
import Box from "@/components/Box";
import { View } from "@tarojs/components";

type DeliveryProps = {
  handleClick?: () => void;
  sku?: SkuListItem;
};

/**
 * 邮寄
 */
export const Delivery = (props: DeliveryProps) => {
  const { sku, handleClick } = props;
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-xl",
        }}
        onClick={() => handleClick?.()}
      >
        <View className="px-[24px] py-[12px] flex flex-col">
          <View className="flex justify-between items-center gap-2 py-[12px]">
            <View className="text-gray-400">规格</View>
            <View className="flex-1">{sku ? sku?.specs : "请选择"}</View>
            <View className="text-gray-400">
              <LucideIcon name="chevron-right" size={20} />
            </View>
          </View>
        </View>
      </Box>
    </>
  );
};
