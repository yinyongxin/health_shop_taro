import { AfterSaleStep, AppButton, BasePage, Title } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { getWxShopAfterSaleDetail, getWxShopOrderDetail } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { Empty, Skeleton } from "@taroify/core";
import { navigateBack } from "@tarojs/taro";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";
import { SaleStatusEnum } from "@/enums";

export default () => {
  const pageParams = usePageParams<"afterSaleDetail">();

  const detailRequest = useRequest(
    async () => {
      console.log("pageParams", pageParams);
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
          orgId: APP_ENV_CONFIG.ORG_ID,
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

  const product = {
    productId: orderDetail.itemList[0].productId!,
    productName: orderDetail.itemList[0].productName!,
    productImage: orderDetail.itemList[0].productImage!,
  };

  return (
    <>
      <BasePage className="pb-[200px]">
        <View className="mt-[32rpx] px-[24px]">
          <Title>商品信息</Title>
          <View className="bg-white rounded-lg mt-[24rpx]">
            <ServiceList
              product={product}
              isService={orderDetail.isService}
              serviceList={
                orderDetail.itemList.map((item) => {
                  return {
                    itemId: item.itemId,
                    itemName: item.itemName,
                    price: item.price,
                    qrCode: item.qrCode,
                    qty: item.qty,
                    serviceDate: item.serviceDate,
                    totalPrice: item.totalPrice,
                    usedQty: item.usedQty,
                  };
                }) || []
              }
            />
          </View>
          <Title className="mt-[32rpx]">订单信息</Title>
          <View className="bg-white rounded-lg p-[24px] flex flex-col gap-2 mt-[24px]">
            <InfoCardItem
              label="订单编号"
              value={orderDetailRequest.data?.order.orderNo}
            />
            <InfoCardItem
              label="下单时间"
              value={orderDetailRequest.data?.order.createdAt}
            />
            <View className="px-[24px] pb-[24px] flex flex-col gap-2">
              <View className="border-t-[1px] border-gray-200 pt-[24px]">
                <InfoCardItem
                  label="退款金额"
                  lableClassName="text-[32rpx] font-semibold w-auto"
                  valueClassName="text-end"
                  value={
                    <View className="text-[32rpx] font-semibold text-red-500">
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
        </View>

        {detailRequest.data && (
          <>
            <View className="mt-[32rpx] px-[24rpx]">
              <Title>进度</Title>
            </View>
            <View className="px-[24rpx]  mt-[24rpx] rounded-lg">
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
