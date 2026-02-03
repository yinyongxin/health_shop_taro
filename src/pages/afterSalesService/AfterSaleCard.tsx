import { SafeInfo } from "@/client";
import { AppButton } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { SaleStatusEnum } from "@/enums";
import { appRouter } from "@/router";
import { View, Text } from "@tarojs/components";

type AfterSaleCardProps = {
  info: SafeInfo;
};
export const AfterSaleCard = (props: AfterSaleCardProps) => {
  const { info } = props;
  const getActions = () => {
    return (
      <View className="flex gap-[24rpx]">
        <AppButton
          actived
          size="sm"
          onClick={() => {
            appRouter.navigateTo("afterSaleDetail", {
              query: { id: info.id },
            });
          }}
        >
          查看详情
        </AppButton>
      </View>
    );
  };

  return (
    <View className="rounded-xl bg-white">
      <View className="py-[24px] px-[24px] flex justify-end">
        <View className="text-amber-500">
          {SaleStatusEnum[info.refundStatus].label}
        </View>
      </View>
      <View className="bg-white rounded-xl">
        <View className="flex flex-col gap-2 px-[24px]">
          <View className="border-y-[1px] border-gray-200 py-[24px] flex flex-col gap-[24rpx]">
            <InfoCardItem
              label="订单编号"
              valueClassName="text-end"
              value={
                <View className="text-[32px] font-semibold">
                  {info.orderNo}
                </View>
              }
            />
            <InfoCardItem
              label="支付时间"
              valueClassName="text-end"
              value={
                <View className="text-[32px] font-semibold">
                  {info.applyTime}
                </View>
              }
            />
            <InfoCardItem
              label="退款金额"
              lableClassName="text-[32px] font-semibold w-auto"
              valueClassName="text-end"
              value={
                <View className="text-[32px] font-semibold text-red-500">
                  <Text>￥</Text>
                  <Text>{info.applyAmount}</Text>
                </View>
              }
            />
          </View>
        </View>
      </View>

      <View className="flex items-center px-[24px] pb-[24px] pt-[24px]">
        <View className="flex-1">{info?.createTime}</View>
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
