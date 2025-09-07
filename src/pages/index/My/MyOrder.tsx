import { LucideIcon } from "@/components";
import { View, Text } from "@tarojs/components";
import { appRouter } from "@/router";
import { OrderTabOptions } from "@/options";
import { MyOrderItem } from "./MyOrderItem";

export const MyOrder = () => {
  return (
    <View className="bg-white rounded-[24px]">
      <View className="px-[24px] pt-[24px] flex justify-between items-center">
        <View className="text-[32px] font-semibold">我的订单</View>
        <View
          className="flex items-center gap-[8px] active:text-blue-500"
          onClick={() => {
            appRouter.navigateTo("orderList");
          }}
        >
          <Text>全部订单</Text>
          <LucideIcon name="chevron-right" />
        </View>
      </View>
      <View className="px-[24px] mt-[16px] pb-[24px] ">
        <View className="flex justify-between">
          {OrderTabOptions.map((option) => {
            return (
              <MyOrderItem
                key={option.value}
                className="w-1/6"
                title={option.label}
                icon={<LucideIcon name={option.icon} size={24} />}
                onClick={() => {
                  appRouter.navigateTo("orderList");
                }}
              />
            );
          })}
        </View>
      </View>
    </View>
  );
};
