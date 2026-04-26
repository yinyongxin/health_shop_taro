import {
  AppButton,
  BasePage,
  Title,
  ServiceProgress,
  AppFixedBottom,
} from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { Checkbox } from "@taroify/core";
import { getWxShopOrderDetail } from "@/client";
import { useAppEnvStore } from "@/stores";
import { useState } from "react";
import { groupBy } from "lodash-es";
import { getIsRefundNotCompleted, getServiceStatusText } from "@/utils";
import { appRouter } from "@/router";
import { SaleStatusEnum } from "@/enums";
import { Skeleton } from "./Skeleton";

export default () => {
  const { hospitalList, orderStatusList } = useAppEnvStore();

  const pageParams = usePageParams<"orderPay">();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

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

  const itemList = orderDetail?.itemList ?? [];
  const allSelected = itemList
    .filter((item) => item.qty - item.usedQty > 0)
    .map((item) => item.id);

  const isAllSelected =
    allSelected.length > 0 &&
    allSelected.every((id) => selectedIds.includes(id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allSelected || []);
    }
  };

  const handleVerify = () => {
    if (selectedIds.length === 0) return;
    const firstItem = itemList.find((item) => item.id === selectedIds[0]);
    if (!firstItem) return;
    appRouter.navigateTo("serverQrcode", {
      query: {
        orderNo: orderDetail?.orderNo!,
        serverId: firstItem.itemId.toString(),
      },
    });
  };

  const group = groupBy(itemList, (item) => item.groupName);
  const groupKeys = Object.keys(group);

  return (
    <>
      <BasePage className="pb-[200px]">
        {orderDetail && (
          <View className="px-2 mt-2">
            <View className="text-[32px] font-semibold">
              {isRefundNotCompleted
                ? "退款申请中"
                : getServiceStatusText(orderDetail?.status, orderStatusList)}
            </View>
          </View>
        )}

        <View className="mt-2 px-2 flex flex-col gap-4">
          <View className="flex items-center justify-between bg-white rounded-lg px-2 py-3">
            <Text className="text-[28px]">全选</Text>
            <Checkbox checked={isAllSelected} onChange={handleSelectAll} />
          </View>
          {groupKeys.map((groupName) => {
            const filteredItems = itemList.filter(
              (item) => item.groupName === groupName,
            );
            return (
              <View key={groupName} className="flex flex-col gap-2">
                <Title key={groupName}>{groupName}</Title>
                {filteredItems.map((item) => {
                  const surplus = item.qty - item.usedQty;
                  const disabled =
                    surplus === 0 ||
                    orderDetail?.status !== 2 ||
                    isRefundNotCompleted;
                  return (
                    <View key={item.id} className="bg-white rounded-lg">
                      <View className="p-2 flex flex-col gap-3">
                        <View className="flex items-center gap-2">
                          <Checkbox
                            checked={selectedIds.includes(item.id)}
                            disabled={disabled}
                            onChange={() => toggleSelect(item.id)}
                          />
                          <View className="flex-1 text-[32px] font-semibold line-clamp-1">
                            {item.itemName}
                          </View>
                        </View>
                        <ServiceProgress
                          total={item.qty}
                          used={item.usedQty}
                          remaining={surplus}
                          unit={item.unit}
                        />
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
        <AppFixedBottom className="flex justify-between items-center">
          <Text className="text-[28px]">已选 {selectedIds.length} 项</Text>
          <AppButton actived={selectedIds.length > 0} onClick={handleVerify}>
            统一核销
          </AppButton>
        </AppFixedBottom>
      </BasePage>
    </>
  );
};
