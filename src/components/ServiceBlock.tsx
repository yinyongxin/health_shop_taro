import { OrderListItem } from "@/client";
import { Box } from "@/components";
import { View } from "@tarojs/components";
import { InfoCardItem } from "./InfoCard/InfoCardItem";

export type ServiceBlockProps = {
  serviceList: OrderListItem["productList"][number]["services"];
  productName?: string;
};
export const ServiceBlock = (props: ServiceBlockProps) => {
  const { serviceList = [], productName = "服务内容" } = props;
  return (
    <>
      <Box
        bgProps={{
          className: "bg-white rounded-xl",
        }}
      >
        <View className="p-[24px] flex flex-col">
          <View className="rounded-lg p-[24px] bg-linear-to-r from-gray-100 to-white text-[28px] font-semibold flex gap-2">
            {productName}
          </View>
          <View className="mt-[24px] flex flex-col gap-[24px]">
            <InfoCardItem
              value={
                <View className="flex flex-col gap-2">
                  {serviceList.map((item, index) => {
                    return (
                      <View
                        className="flex items-center gap-[24px]"
                        key={item.itemId}
                      >
                        <View className="text-gray-500 bg-gray-200 w-[32px] h-[32px] flex items-center justify-center rounded-full">
                          {index + 1}
                        </View>
                        <View className="flex-1">{item.itemName}</View>
                        <View className="text-amber-500 font-semibold">
                          {item?.qty}
                        </View>
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
