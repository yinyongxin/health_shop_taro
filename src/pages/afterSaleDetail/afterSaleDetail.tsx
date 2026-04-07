import { AfterSaleStep, AppButton, BasePage, Title } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { getWxShopAfterSaleDetail, getWxShopOrderDetail } from "@/client";
import { Empty, Skeleton } from "@taroify/core";
import { navigateBack } from "@tarojs/taro";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";

/**
 * 售后详情页
 */
export default () => {
  const pageParams = usePageParams<"afterSaleDetail">();

  const detailRequest = useRequest(
    async () => {
      if (!pageParams?.id) {
        return;
      }
      const res = await getWxShopAfterSaleDetail({
        query: {
          id: Number(pageParams.id),
        },
      });
      return res.data?.data;
    },
    {
      refreshDeps: [pageParams?.id],
    },
  );

  const orderDetailRequest = useRequest(
    async () => {
      if (!detailRequest.data) {
        return;
      }
      const res = await getWxShopOrderDetail({
        query: {
          orderNo: detailRequest.data.orderNo,
        },
      });
      if (res.data?.code === 0) {
        return res?.data?.data;
      }
      throw new Error(res.data?.msg ?? "获取详情失败");
    },
    {
      refreshDeps: [detailRequest.data],
    },
  );

  const { order: orderDetail } = orderDetailRequest.data || {};

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

  if (!orderDetail) {
    return;
  }

  return (
    <>
      <BasePage className="pb-[200px]">
        <View className="px-2">
          <Title className="mt-3">订单信息</Title>
          <View className="bg-white rounded-lg p-2 flex flex-col gap-2 mt-2">
            <InfoCardItem
              label="订单编号"
              value={orderDetailRequest.data?.order.orderNo}
              valueClassName="text-end"
            />
            <InfoCardItem
              label="下单时间"
              value={orderDetailRequest.data?.order.createdAt}
              valueClassName="text-end"
            />
            <View className="border-t-[1px] border-gray-200 pt-2">
              <InfoCardItem
                label="退款金额"
                lableClassName="text-3 font-semibold w-auto"
                valueClassName="text-end"
                value={
                  <View className="text-3 font-semibold text-rose-500">
                    <Text>￥</Text>
                    <Text>{orderDetailRequest.data?.order.paymentAmount}</Text>
                  </View>
                }
              />
            </View>
          </View>
        </View>
        {detailRequest.data && (
          <>
            <View className="mt-3 px-2">
              <Title>进度</Title>
            </View>
            <View className="px-2  mt-2 rounded-lg">
              <AfterSaleStep info={detailRequest.data} />
            </View>
          </>
        )}
      </BasePage>
      <AppFixedBottom>
        <AppButton
          onClick={() => {
            if (!detailRequest.data) {
              return;
            }
            appRouter.navigateTo("orderDetail", {
              query: {
                orderNo: detailRequest.data.orderNo,
              },
            });
          }}
        >
          查看订单
        </AppButton>
      </AppFixedBottom>
    </>
  );
};
