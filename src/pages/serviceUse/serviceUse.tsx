import { AppButton, BasePage } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { CartItem, getWxShopOrderDetail } from "@/client";
import { useAppEnvStore, useAppUserStore } from "@/stores";
import { getServiceStatusText } from "@/utils";
import { Empty, Skeleton } from "@taroify/core";
import { navigateBack } from "@tarojs/taro";
import dayjs from "dayjs";
import { appRouter } from "@/router";

export default () => {
  const appUserStore = useAppUserStore();
  const { hospitalList } = useAppEnvStore();

  const pageParams = usePageParams<"orderPay">();

  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo },
    });
    if (res.data?.code === 0) {
      return res?.data?.data;
    }
    throw new Error(res.data?.msg ?? "获取订单详情失败");
  });

  if (orderDetailRequest.error) {
    return (
      <Empty>
        <Empty.Image></Empty.Image>
        <Empty.Description>
          {orderDetailRequest.error.message}
        </Empty.Description>
        <AppButton
          actived={false}
          className="mt-[48px] w-[300px]"
          onClick={() => navigateBack()}
        >
          返回
        </AppButton>
      </Empty>
    );
  }

  if (orderDetailRequest.loading && !orderDetailRequest.data) {
    return <Skeleton />;
  }

  if (!orderDetailRequest.data) {
    return;
  }

  const { order: orderDetail } = orderDetailRequest.data;

  const handleUse = (info: CartItem) => {
    appRouter.navigateTo("serverQrcode", {
      query: {
        orderNo: orderDetail.orderNo,
        serverId: info.itemId.toString(),
      },
    });
  };

  return (
    <>
      <BasePage className="pb-[200px]">
        <View className="px-[24px] pt-[24px]">
          <View className="text-[32px] font-semibold">
            {getServiceStatusText(
              orderDetail.status,
              appUserStore.orderStatusList,
            )}
          </View>
        </View>
        <View className="mt-[24px] px-[24px] flex flex-col gap-[24px]">
          {orderDetail.itemList.map((item) => {
            let btn = (
              <AppButton
                size="sm"
                onClick={() => {
                  handleUse(item);
                }}
              >
                点击核销
              </AppButton>
            );

            const surplus = item.qty - item.usedQty;
            if (surplus === 0) {
              btn = (
                <AppButton size="sm" status="error" disabled>
                  剩余0次，不可使用
                </AppButton>
              );
            }
            return (
              <View key={item.id} className="bg-white rounded-lg">
                <View className="p-[24px] flex flex-col gap-2">
                  <View className="flex justify-between items-center">
                    <View className="text-[32px] font-semibold line-clamp-1">
                      {item.itemName}
                    </View>
                    <View className="shrink-0 text-red-500">
                      {dayjs(item.qrCodeExpireTime).format("YYYY-MM-DD")}过期
                    </View>
                  </View>
                  <View className="flex gap-2">
                    <View className="flex-1 text-sky-500 bg-sky-100 py-2 flex-center rounded">
                      共{item.qty}次
                    </View>
                    <View className="flex-1 text-green-500  text-red-500  bg-red-100 bg-green-100 py-2 flex-center rounded">
                      已使用{item.usedQty}次
                    </View>
                    <View className="flex-1 text-green-500 bg-green-100 py-2 flex-center rounded">
                      剩余{item.qty - item.usedQty}次
                    </View>
                  </View>
                  <View>{btn}</View>
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-[24px] px-[24px]">
          <View className="bg-white rounded-lg">
            <View className="p-[24px] flex flex-col gap-2">
              <InfoCardItem
                label="总金额"
                valueClassName="text-end"
                value={
                  <View className="text-[32px]">
                    <Text>￥</Text>
                    <Text>{orderDetailRequest.data?.order.totalAmount}</Text>
                  </View>
                }
              />
              <InfoCardItem
                label="快递费"
                valueClassName="text-end"
                value={
                  <View className="text-[32px]">
                    <Text>￥</Text>
                    <Text>{orderDetailRequest.data?.order.freightAmount}</Text>
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
                    <Text>{orderDetailRequest.data?.order.discountAmount}</Text>
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
                        {orderDetailRequest.data?.order.paymentAmount}
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
              value={orderDetailRequest.data?.order.orderNo}
            />
            <InfoCardItem
              label="下单时间"
              value={orderDetailRequest.data?.order.createdAt}
            />
          </View>

          <View className="p-2 bg-white rounded-md mt-2">
            <View className="text-[28px] font-bold">
              {
                hospitalList?.find(
                  (item) => item.orgId === orderDetailRequest.data?.order.orgId,
                )?.orgName
              }
            </View>
            <View className="color-gray-500 mt-2">
              {orderDetailRequest.data?.order.orgId}
            </View>
          </View>
        </View>
      </BasePage>
    </>
  );
};
