import { ProductInfo } from "@/client";
import Box from "@/components/Box";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { View } from "@tarojs/components";

export type ServiceBlockProps = {
  productInfo: ProductInfo;
};
export const ServiceBlock = (props: ServiceBlockProps) => {
  const { productInfo } = props;
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
      >
        <View className="p-[24px] flex flex-col">
          <View className="rounded-md p-[24px] bg-linear-to-r from-gray-100 to-white text-[28px] font-semibold flex gap-[16px]">
            服务内容
          </View>
          <View className="mt-[24px] flex flex-col gap-[24px]">
            <InfoCardItem
              value={
                <View className="flex flex-col gap-[16px]">
                  {productInfo.itemsList.map((item, index) => {
                    return (
                      <View className="flex gap-[24px]" key={item.id}>
                        <View className="text-amber-500">{index + 1}</View>
                        <View className="flex-1">{item.itemName}</View>
                        <View className="text-gray-300">{item.num}</View>
                      </View>
                    );
                  })}
                </View>
              }
            />
          </View>
        </View>
      </Box>
    </>
  );
};
