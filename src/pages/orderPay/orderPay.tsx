import {
  AddressInfo,
  getWxShopOrderAddrChange,
  getWxShopOrderDetail,
  getWxShopOrderPay2,
  postWxShopAddrViewById,
} from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import {
  AppButton,
  AppCell,
  AppPopup,
  BasePage,
  LucideIcon,
  AppFixedBottom,
  CartWareCard,
} from "@/components";
import { AddressList } from "@/components/AddressList";
import { AddressCard } from "@/components/AddressList/AddressCard";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast } from "@/utils";
import { Countdown, Empty } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { navigateBack } from "@tarojs/taro";
import Box from "@/components/Box";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { orderPayByWx } from "@/utils/order";
import { Skeleton } from "./Skeleton";

const OrderPayPage = () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();
  const selectAddressControl = usePopupControl();
  const [currentAddress, setCurrentAddress] = useState<AddressInfo | undefined>(
    appUserStore.defaultAddress,
  );
  const [selectAddress, setSelectAddress] = useState<AddressInfo>();
  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo, orgId: APP_ENV_CONFIG.ORG_ID },
    });
    if (res.data?.code === 0) {
      return res?.data?.data;
    }
    throw new Error(res.data?.msg ?? "获取订单详情失败");
  });

  /** 是否取消订单 */
  const isCancel = orderDetailRequest.data?.order.status === 4;

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
    if (orderDetailRequest.data) {
      initAddress();
    }
  }, [orderDetailRequest.data?.order]);

  const updataOrderAddress = async () => {
    try {
      appLoading.show("修改订单地址中...");
      const updateOrderAddressRes = await getWxShopOrderAddrChange({
        query: {
          orderNo: pageParams.orderNo,
          addId: selectAddress?.id,
          orgId: APP_ENV_CONFIG.ORG_ID,
        },
      });
      if (updateOrderAddressRes.data?.code === 0) {
        await orderDetailRequest.run();
      }
    } finally {
      appLoading.hide();
    }
  };

  const orderPayRequest = useRequest(
    async () => {
      appLoading.show("正在支付...");
      // 创建订单时没有地址
      if (appUserStore.addressList.length === 0) {
        appRouter.navigateTo("addAddress");
        return;
      }
      if (!orderDetailRequest.data?.order.orderNo) {
        return;
      }
      const payRes = await getWxShopOrderPay2({
        query: {
          orderNo: orderDetailRequest.data.order.orderNo,
        },
      });
      if (payRes.data?.code !== 0 || !payRes?.data?.data) {
        appToast.error("支付失败");
        return;
      }
      await orderPayByWx(payRes.data.data, {
        success: () => {
          appToast.success("支付成功");
        },
      });
      appLoading.hide();
    },
    {
      manual: true,
    },
  );

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
  return (
    <>
      <BasePage className="pb-[200px]">
        {!isCancel && (
          <View className="text-[32px] font-semibold text-rose-500 flex justify-center items-center gap-2 mt-[24px]">
            支付倒计时
            <Countdown
              value={dayjs(orderDetailRequest.data?.order.createdAt)
                .add(30, "minute")
                .diff(dayjs(), "ms")}
              format="mm:ss"
            />
          </View>
        )}
        {isCancel && (
          <View className="px-[24px] pt-[24px]">
            <View className="text-[32px] font-semibold text-rose-500">
              订单已取消
            </View>
          </View>
        )}
        <View className="px-[24px] pt-[24px]">
          {currentAddress ? (
            <AddressCard
              className="shadow-none!"
              handleClick={() => {
                selectAddressControl.setOpen(true);
                setSelectAddress(currentAddress);
              }}
              info={currentAddress}
              showActions={false}
              rightAction={
                <View className="flex flex-col justify-center">
                  <LucideIcon
                    name="chevron-right text-gray-500 pr-[16px]"
                    size={24}
                  />
                </View>
              }
            />
          ) : (
            <Box>请选择地址</Box>
          )}
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
          <View className="bg-white rounded-lg flex flex-col gap-[12px] mt-[24px]">
            <AppCell
              right={
                <LucideIcon
                  name="check"
                  className="text-green-500"
                  size={20}
                ></LucideIcon>
              }
            >
              微信支付
            </AppCell>
          </View>
        </View>
      </BasePage>
      {!isCancel && (
        <AppFixedBottom className="flex gap-2">
          {/* <AppButton
            round
            disabled={!orderDetailRequest.data?.order.orderNo}
            className="flex-1"
            loading={orderPayRequest.loading}
            status="primary"
            actived={false}
            onClick={() => {
              navigateBack();
            }}
          >
            返回
          </AppButton> */}
          <AppButton
            status="error"
            disabled={!orderDetailRequest.data?.order.orderNo}
            className="flex-2"
            loading={orderPayRequest.loading}
            onClick={() => {
              orderPayRequest.run();
            }}
          >
            确认支付
          </AppButton>
        </AppFixedBottom>
      )}
      <AppPopup
        style={{
          height: "60vh",
        }}
        {...selectAddressControl}
        title="选择地址"
        leftAction={
          <Text
            onClick={() => {
              appRouter.navigateTo("addAddress");
            }}
            className="text-sky-500 font-bold"
          >
            新增地址
          </Text>
        }
        footer={
          <AppButton
            className="w-full"
            onClick={() => {
              selectAddressControl.setOpen(false);
              updataOrderAddress();
            }}
          >
            确定
          </AppButton>
        }
        onClose={() => {
          setSelectAddress(undefined);
          selectAddressControl.setOpen(false);
        }}
        showClose
      >
        <AddressList
          selectId={selectAddress?.id}
          addressCardProps={{
            showActions: false,
            handleClick: (info) => {
              setSelectAddress(info);
            },
          }}
        />
      </AppPopup>
    </>
  );
};
export default OrderPayPage;
