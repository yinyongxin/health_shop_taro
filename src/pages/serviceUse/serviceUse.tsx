import { AppButton, BasePage, Title } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { OrderDetailItemListItem, getWxShopOrderDetail } from "@/client";
import { useAppEnvStore } from "@/stores";
import { filter, groupBy, keyBy, orderBy } from "lodash-es";
import { getIsRefundNotCompleted, getServiceStatusText } from "@/utils";
import { Empty } from "@taroify/core";
import { navigateBack } from "@tarojs/taro";
import dayjs from "dayjs";
import { appRouter } from "@/router";
import { Skeleton } from "./Skeleton";
import { SaleStatusEnum } from "@/enums";

export default () => {
  const { hospitalList, orderStatusList } = useAppEnvStore();

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

  if (orderDetailRequest.loading && !orderDetailRequest.data) {
    return <Skeleton />;
  }

  const { order: orderDetail, afterSalesRefund } =
    orderDetailRequest.data || {};

  const isRefundNotCompleted = getIsRefundNotCompleted(
    afterSalesRefund?.refundStatus as SaleStatusEnum,
  );

  if (!orderDetail) {
    return (
      <Empty>
        <Empty.Image></Empty.Image>
        <Empty.Description>
          {orderDetailRequest.error?.message || "订单不存在"}
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

  const group = groupBy(orderDetail.itemList, (item) => item.groupName);
  const groupKeys = Object.keys(group);

  const handleUse = (info: OrderDetailItemListItem) => {
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
        <View className="px-2 mt-2">
          <View className="text-[32px] font-semibold">
            {isRefundNotCompleted
              ? "退款申请中"
              : getServiceStatusText(orderDetail.status, orderStatusList)}
          </View>
        </View>

        <View className="mt-2 px-2 flex flex-col gap-4">
          {groupKeys.map((groupName) => {
            const itemList = orderDetail.itemList.filter(
              (item) => item.groupName === groupName,
            );
            return (
              <View key={groupName} className="flex flex-col gap-2">
                <Title key={groupName}>{groupName}</Title>
                {itemList.map((item) => {
                  let btn = (
                    <AppButton
                      size="sm"
                      actived={false}
                      onClick={() => {
                        handleUse(item);
                      }}
                    >
                      去核销
                    </AppButton>
                  );

                  const surplus = item.qty - item.usedQty;
                  if (
                    surplus === 0 ||
                    orderDetail.status !== 2 ||
                    isRefundNotCompleted
                  ) {
                    btn = <></>;
                  }
                  return (
                    <View key={item.id} className="bg-white rounded-lg">
                      <View className="p-2 flex flex-col gap-2">
                        <View className="flex justify-between items-center">
                          <View className="text-[32px] font-semibold line-clamp-1">
                            {item.itemName}
                          </View>
                          <View>{btn}</View>
                        </View>
                        <View className="flex justify-between">
                          <View>共：</View>
                          <View className="shrink-0 text-sky-500">
                            {item.qty}
                            {item.unit || ""}
                          </View>
                        </View>
                        <View className="flex justify-between">
                          <View>已使用：</View>
                          <View className="shrink-0 text-rose-500">
                            {item.usedQty}
                            {item.unit || ""}
                          </View>
                        </View>
                        <View className="flex justify-between">
                          <View>剩余：</View>
                          <View className="shrink-0 text-lime-500">
                            {item.qty - item.usedQty}
                            {item.unit || ""}
                          </View>
                        </View>
                        <View className="flex justify-between">
                          <View>过期时间：</View>
                          <View className="shrink-0 text-gray-500">
                            {dayjs(item.qrCodeExpireTime).format("YYYY-MM-DD")}
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}
        </View>
        <View className="px-2 mt-2">
          <View className="p-2 bg-white rounded-md">
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
        <View className="mt-2 px-2">
          <View className="bg-white rounded-lg">
            <View className="p-2 flex flex-col gap-2">
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
              <View className="border-t-[1px] border-gray-200 pt-2">
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
          <View className="bg-white rounded-lg p-2 flex flex-col gap-2 mt-2">
            <InfoCardItem
              label="订单编号"
              value={orderDetailRequest.data?.order.orderNo}
            />
            <InfoCardItem
              label="下单时间"
              value={orderDetailRequest.data?.order.createdAt}
            />
          </View>
        </View>
      </BasePage>
    </>
  );
};
