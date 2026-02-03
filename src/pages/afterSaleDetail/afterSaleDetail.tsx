import { AppButton, BasePage } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { getWxShopOrderDetail } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useAppUserStore } from "@/stores";
import { Empty, Skeleton } from "@taroify/core";
import { navigateBack } from "@tarojs/taro";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";

export default () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();

  const detailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    if (res.data?.code === 0) {
      return res?.data?.data;
    }
    throw new Error(res.data?.msg ?? "获取详情失败");
  });

  const { order: orderDetail } = detailRequest.data || {};

  if (detailRequest.error) {
    return (
      <Empty>
        <Empty.Image></Empty.Image>
        <Empty.Description>{detailRequest.error.message}</Empty.Description>
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

  if (detailRequest.loading && !detailRequest.data) {
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

  const getStatusText = () => {
    return appUserStore.orderStatusList.find((item) => {
      return item.dictValue === orderDetail.status.toString();
    })?.dictLabel;
  };

  return (
    <>
      <BasePage className="pb-[200px]">
        <View className="px-[24px] pt-[24px]">
          <View className="text-[32px] font-semibold">{getStatusText()}</View>
        </View>

        <View className="mt-[24px] px-[24px]">
          <View className="bg-white rounded-lg">
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
            <View className="px-[24px] pb-[24px] flex flex-col gap-2">
              <View className="border-t-[1px] border-gray-200 pt-[24px]">
                <InfoCardItem
                  label="付款金额"
                  lableClassName="text-[32px] font-semibold w-auto"
                  valueClassName="text-end"
                  value={
                    <View className="text-[32px] font-semibold">
                      <Text>￥</Text>
                      <Text>{detailRequest.data?.order.paymentAmount}</Text>
                    </View>
                  }
                />
              </View>
            </View>
          </View>
          <View className="bg-white rounded-lg p-[24px] flex flex-col gap-2 mt-[24px]">
            <InfoCardItem
              label="订单编号"
              value={detailRequest.data?.order.orderNo}
            />
            <InfoCardItem
              label="下单时间"
              value={detailRequest.data?.order.createdAt}
            />
          </View>
        </View>
      </BasePage>
      <AppFixedBottom>
        <AppButton
          onClick={() => {
            appRouter.navigateTo("orderDetail", {
              query: {
                orderNo: pageParams.orderNo,
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
