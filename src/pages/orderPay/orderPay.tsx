import {
  AddressInfo,
  getWxShopOrderAddrChange,
  getWxShopOrderDetail,
  getWxShopOrderPay2,
} from "@/client";
import {
  AppButton,
  AppCell,
  AppPopup,
  BasePage,
  LucideIcon,
  AppFixedBottom,
  CartWareCard,
  NewServiceBlock,
  Box,
  AddressList,
  AddressCard,
  InfoCardItem,
} from "@/components";
import { usePageParams, usePopupControl, useRequest } from "@/hooks";
import { appRouter } from "@/router";
import { useAppAuthStore, useAppEnvStore, useAppUserStore } from "@/stores";
import { appLoading, appToast } from "@/utils";
import { Countdown, Dialog, Empty } from "@taroify/core";
import { View, Text } from "@tarojs/components";
import { navigateBack } from "@tarojs/taro";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { orderPay } from "@/utils/order";
import { Skeleton } from "./Skeleton";

const OrderPayPage = () => {
  const pageParams = usePageParams<"orderPay">();
  const appUserStore = useAppUserStore();
  const useAuthStore = useAppAuthStore();
  const { hospitalList } = useAppEnvStore();

  const selectAddressControl = usePopupControl();

  const [selectAddress, setSelectAddress] = useState<AddressInfo>();

  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo },
    });
    if (res.data?.code === 0) {
      const orderData = res.data?.data || {};

      return orderData;
    }
    throw new Error(res.data?.msg ?? "获取订单详情失败");
  });

  const { order: orderDetail } = orderDetailRequest.data || {};

  const orderPayRequest = useRequest(
    async () => {
      if (useAuthStore.isMiniprogram) {
        appToast.info("暂不支持小程序购买");
        return;
      }
      if (!orderDetail) {
        return;
      }

      if (!selectAddress?.idNo) {
        Dialog.confirm({
          theme: "rounded",
          title: "提示",
          backdrop: true,
          cancel: null,
          message: "需要证件号信息才能购买服务，请检查所选地址是否包括证件号？",
        });
        return;
      }
      appLoading.show("正在支付...");
      // 创建订单时没有地址
      if (appUserStore.addressList.length === 0) {
        appRouter.navigateTo("addAddress");
        return;
      }
      if (!orderDetail.orderNo) {
        return;
      }
      const payRes = await getWxShopOrderPay2({
        query: {
          orderNo: orderDetail.orderNo,
        },
      });
      if (payRes.data?.code !== 0 || !payRes?.data?.data) {
        appToast.error(payRes.data?.msg || "支付失败");
        return;
      }
      await orderPay(payRes.data.data, {
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

  const initAddress = async () => {
    setSelectAddress(orderDetailRequest.data?.addressInfo);
  };

  useEffect(() => {
    initAddress();
  }, [orderDetail]);

  if (!orderDetail) {
    return;
  }

  /** 是否取消订单 */
  const isCancel = orderDetail.status === 4;

  const updataOrderAddress = async (address: AddressInfo) => {
    try {
      appLoading.show("修改订单地址中...");
      const updateOrderAddressRes = await getWxShopOrderAddrChange({
        query: {
          orderNo: pageParams.orderNo,
          addId: address?.id,
        },
      });
      setSelectAddress(address);
      if (updateOrderAddressRes.data?.code === 0) {
        await orderDetailRequest.run();
      }
    } finally {
      appLoading.hide();
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
          actived={false}
          className="mt-[48px] w-[300px]"
          onClick={() => navigateBack()}
        >
          返回
        </AppButton>
      </Empty>
    );
  }

  if (orderDetailRequest.loading && !orderDetail) {
    return <Skeleton />;
  }

  const isFW = orderDetail.isService === 1;

  const itemListRender = () => {
    if (!isFW) {
      return orderDetail.itemList?.map((item) => (
        <CartWareCard
          itemName={item.itemName}
          price={item.price}
          key={item.itemId}
          product={{
            productName: item.productName,
            productImage: item.productImage,
            productId: item.productId,
          }}
          border={false}
          shadow={false}
        />
      ));
    }
    const serviceList = (orderDetail.itemList || [])?.map((item) => ({
      id: item.itemId,
      productId: 0,
      totalPrice: item.price,
      num: item.qty,
      itemId: item.itemId,
      itemName: item.itemName,
      price: item.price,
      selectedItems: [],
      itemDesc: item.itemDesc,
      createTime: "",
      updateTime: "",
      groupName: item.groupName,
      unit: item.unit,
    }));

    return (
      <View className="p-2">
        <NewServiceBlock serviceList={serviceList} />
      </View>
    );
  };

  const popupRender = () => {
    return (
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
        onClose={() => {
          selectAddressControl.setOpen(false);
        }}
        showClose
      >
        <AddressList
          addressCardProps={{
            showActions: false,
            showIdNo: true,
            handleClick: (info) => {
              updataOrderAddress(info);
              selectAddressControl.setOpen(false);
            },
          }}
        />
      </AppPopup>
    );
  };

  return (
    <>
      <BasePage className="pb-[200px]">
        {!isCancel && (
          <View className="text-[32px] font-semibold text-rose-500 flex-center gap-2 mt-2">
            <View>支付倒计时</View>
            <Countdown
              className="pt-0.5"
              value={dayjs(orderDetail.createdAt)
                .add(29, "minute")
                .diff(dayjs(), "ms")}
              format="mm:ss"
            />
          </View>
        )}
        {isCancel && (
          <View className="px-2 pt-2">
            <View className="text-[32px] font-semibold text-rose-500">
              订单已取消
            </View>
          </View>
        )}

        <View className="mt-2 px-2">
          <View className="bg-white rounded-lg">
            {itemListRender()}
            <View className="px-2 pb-2 flex flex-col gap-2">
              <InfoCardItem
                label="总金额"
                valueClassName="text-end"
                value={
                  <View className="text-[32px]">
                    <Text>￥</Text>
                    <Text>{orderDetail.totalAmount}</Text>
                  </View>
                }
              />
              <InfoCardItem
                label="快递费"
                valueClassName="text-end"
                value={
                  <View className="text-[32px]">
                    <Text>￥</Text>
                    <Text>{orderDetail.freightAmount}</Text>
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
                    <Text>{orderDetail.discountAmount}</Text>
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
                      <Text>{orderDetail.paymentAmount}</Text>
                    </View>
                  }
                />
              </View>
            </View>
          </View>
          <View className="mt-2">
            {selectAddress ? (
              <>
                <AddressCard
                  className="shadow-none!"
                  handleClick={() => {
                    selectAddressControl.setOpen(true);
                  }}
                  showIdNo
                  info={selectAddress}
                  showActions={false}
                  isMaskPhone
                  rightAction={
                    <View className="flex flex-col justify-center">
                      <LucideIcon
                        name="chevron-right text-gray-500 pr-2"
                        size={24}
                      />
                    </View>
                  }
                />
              </>
            ) : (
              <Box
                bgProps={{
                  className: "bg-white rounded-lg",
                }}
              >
                请选择地址
              </Box>
            )}
          </View>
          <View className="bg-white rounded-lg p-2 flex flex-col gap-2 mt-2">
            <InfoCardItem label="订单编号" value={orderDetail.orderNo} />
            <InfoCardItem label="下单时间" value={orderDetail.createdAt} />
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
          <View className="bg-white rounded-lg flex flex-col gap-[12px] mt-2">
            <AppCell
              right={
                <LucideIcon
                  name="check"
                  className="text-lime-500"
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
          <AppButton
            status="error"
            disabled={!orderDetail.orderNo}
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
      {popupRender()}
    </>
  );
};
export default OrderPayPage;
