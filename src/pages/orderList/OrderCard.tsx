import { OrderInfo } from "@/client";
import { AppButton } from "@/components";
import { CartWareCard } from "@/components/CartWareCard";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View, Text } from "@tarojs/components";

type OrderCardProps = {
  info: OrderInfo;
};
export const OrderCard = (props: OrderCardProps) => {
  const { info } = props;

  const appUserStore = useAppUserStore();

  const getActions = () => {
    if (info.status === 0) {
      return (
        <AppButton
          actived={false}
          size="sm"
          status="error"
          onClick={() => {
            appRouter.navigateTo("orderPay", {
              query: { orderNo: info.orderNo },
            });
          }}
        >
          去支付
        </AppButton>
      );
    }
    return (
      <AppButton
        actived={false}
        size="sm"
        onClick={() => {
          appRouter.navigateTo("orderDetail", {
            query: { orderNo: info.orderNo },
          });
        }}
      >
        查看详情
      </AppButton>
    );
    // }
    return (
      <>
        <AppButton status="secondary" actived={false} size="sm">
          查看物流
        </AppButton>
        <AppButton size="sm" actived={false}>
          确认收货
        </AppButton>
      </>
    );
  };

  const getStatusText = () => {
    return appUserStore.orderStatusList.find((item) => {
      return item.dictValue === info.status.toString();
    })?.dictLabel;
  };

  return (
    <View className="rounded-lg bg-white app-shadow">
      <View className="py-[24px] px-[24px] flex items-center justify-between">
        <View className="text-[28px] font-semibold">{info.createdAt}</View>
        <View className="text-amber-500">{getStatusText()}</View>
      </View>
       <View className="mt-[24px] px-[24px]">
                <View className="bg-white rounded-lg">
                  <View className="px-[24px] pt-[24px] text-[32px] font-semibold">
                    <View>共{info.itemList.length}件商品</View>
                  </View>
                  {info.itemList?.map((item) => (
                    <CartWareCard
                      key={item.id}
                      info={item}
                      border={false}
                      showNumControl={false}
                    />
                  ))}
                  <View className="px-[24px] pb-[24px] flex flex-col gap-2">
                    <InfoCardItem
                      label="总金额"
                      valueClassName="text-end"
                      value={
                        <View className="text-[32px]">
                          <Text>￥</Text>
                          <Text>{info.order.totalAmount}</Text>
                        </View>
                      }
                    />
                    <InfoCardItem
                      label="快递费"
                      valueClassName="text-end"
                      value={
                        <View className="text-[32px]">
                          <Text>￥</Text>
                          <Text>{info.order.freightAmount}</Text>
                        </View>
                      }
                    />
                    <InfoCardItem
                      label="折扣"
                      valueClassName="text-end"
                      value={
                        <View className="text-[32px] text-rose-500">
                          <Text>-</Text>
                          <Text>￥</Text>
                          <Text>{info.order.discountAmount}</Text>
                        </View>
                      }
                    />
                    <View className="border-t-[1px] border-gray-200 pt-[24px]">
                      <InfoCardItem
                        label="付款金额"
                        lableClassName="text-[32px] font-semibold w-auto"
                        valueClassName="text-end"
                        value={
                          <View className="text-[32px] font-semibold">
                            <Text>￥</Text>
                            <Text>
                              {info.order.paymentAmount}
                            </Text>
                          </View>
                        }
                      />
                    </View>
                  </View>
                </View>
                <View className="bg-white rounded-lg p-[24px] flex flex-col gap-2 mt-[24px]">
                  <InfoCardItem
                    label="订单编号"
                    value={info.order.orderNo}
                  />
                  <InfoCardItem
                    label="下单时间"
                    value={info.order.createdAt}
                  />
                </View>
              </View>
      <View className="flex items-center px-[24px] pb-[24px]">
        <View className="flex-1">
          <View className="text-gray-500 text-[28px]">更多</View>
        </View>
        <View className=" flex gap-2">{getActions()}</View>
      </View>
    </View>
  );
};
