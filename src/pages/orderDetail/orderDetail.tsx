import { AppButton, BasePage, LucideIcon } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { View, Text } from "@tarojs/components";
import { CartWareCard } from "@/components/CartWareCard";
import {
  AddressInfo,
  getWxShopOrderCancel,
  getWxShopOrderDetail,
  postWxShopAddrViewById,
} from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast } from "@/utils";
import { Dialog, Empty, Skeleton } from "@taroify/core";
import { useState, useEffect } from "react";
import { navigateBack } from "@tarojs/taro";
import { AddressCard } from "@/components/AddressList/AddressCard";
import { AppFixedBottom } from "@/components/AppFixedBottom";

export default () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();
  const [currentAddress, setCurrentAddress] = useState<AddressInfo | undefined>(
    appUserStore.defaultAddress,
  );
  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    if (res.data?.code === 0) {
      return res?.data?.data;
    }
    throw new Error(res.data?.msg ?? "获取订单详情失败");
  });

  /** 是否有非服务商品 */
  const hasNotServiceWare = orderDetailRequest.data?.itemList.some(
    (item) => item.isService === 2,
  );

  const isPayed =
    orderDetailRequest.data?.order.status &&
    orderDetailRequest.data?.order.status !== 0;

  console.log(orderDetailRequest.data?.order.status, isPayed);
  const initAddress = async () => {
    if (!orderDetailRequest.data?.order.addressId) {
      return;
    }
    const getAddressRes = await postWxShopAddrViewById({
      path: { id: orderDetailRequest.data?.order.addressId.toString() },
      query: { orgId: orderDetailRequest.data?.order.addressId.toString() },
    });
    if (getAddressRes.data?.code === 0) {
      setCurrentAddress(getAddressRes.data?.data);
    } else {
      appToast.error(getAddressRes.data?.msg ?? "获取地址失败");
    }
  };
  useEffect(() => {
    initAddress();
  }, [orderDetailRequest.data?.order.addressId]);

  const getStatusLabel = (status: string) => {
    return appUserStore.orderStatusList.find(
      (item) => item.dictValue === status,
    );
  };

  const cancelOrder = async () => {
    appLoading.show("取消订单中...");
    const res = await getWxShopOrderCancel({
      query: {
        orderNo: orderDetailRequest.data?.order.orderNo,
        orgId: APP_ENV_CONFIG.ORG_ID,
      },
    });
    if (res.data?.code !== 0) {
      appToast.error("取消订单失败");
      return;
    }
    appToast.success("取消订单成功");
    orderDetailRequest.run();
  };

  const renderBottomBtns = () => {
    if (orderDetailRequest.data?.order.status === 1) {
      return (
        <AppFixedBottom>
          <AppButton
            status="error"
            onClick={() => {
              Dialog.confirm({
                theme: "rounded",
                title: "提示",
                message: "取消后不能恢复，确定取消订单吗？",
                onConfirm: () => {
                  cancelOrder();
                },
              });
            }}
            round
          >
            取消订单并退款
          </AppButton>
        </AppFixedBottom>
      );
    }
  };

  if (orderDetailRequest.error) {
    return (
      <Empty>
        <Empty.Image></Empty.Image>
        <Empty.Description>
          {orderDetailRequest.error.message}
        </Empty.Description>
        <AppButton
          round
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
  return (
    <>
      <BasePage>
        <View className="px-[24px] pt-[24px]">
          <View className="text-[32px] font-semibold">
            {
              getStatusLabel(orderDetailRequest.data?.order?.status.toString()!)
                ?.dictLabel
            }
          </View>
        </View>

        <View className="mt-[24px] px-[24px]">
          <View className="bg-white rounded-lg">
            <View className="px-[24px] pt-[24px] text-[32px] font-semibold">
              <View>共{orderDetailRequest.data?.itemList.length}件商品</View>
            </View>
            {orderDetailRequest.data?.itemList?.map((item) => (
              <CartWareCard
                key={item.id}
                info={item}
                border={false}
                showNumControl={false}
                shadow={false}
              />
            ))}
            <View className="px-[24px] pb-[24px] flex flex-col gap-2">
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
        </View>

        <View className="px-[24px] mt-[24px]">
          {hasNotServiceWare && currentAddress && (
            <AddressCard
              className="shadow-none!"
              info={currentAddress}
              showActions={false}
            />
          )}
        </View>
      </BasePage>
      {renderBottomBtns()}
      {/* <AppFixedBottom></AppFixedBottom> */}
    </>
  );
};
