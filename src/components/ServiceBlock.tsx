import { ServiceInfo } from "@/client";
import Box from "@/components/Box";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { View } from "@tarojs/components";

export type ServiceBlockProps = {
  serviceList: ServiceInfo[];
};
export const ServiceBlock = (props: ServiceBlockProps) => {
  const { serviceList = [] } = props;
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
                  {serviceList.map((item, index) => {
                    return (
                      <View
                        className="flex items-center gap-[24px]"
                        key={item.id}
                      >
                        <View className="text-gray-500 bg-gray-200 w-[32px] h-[32px] flex items-center justify-center rounded-full">
                          {index + 1}
                        </View>
                        <View className="flex-1">{item.itemName}</View>
                        <View className="text-amber-500 font-semibold">
                          {item?.num || item?.qty}
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
