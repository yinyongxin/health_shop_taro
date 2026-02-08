import { AppButton, AppPopup, BasePage } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text, Radio, RadioGroup } from "@tarojs/components";
import {
  AddressInfo,
  getWxShopOrderDetail,
  postWxShopAddrViewById,
  postWxShopAfterSaleApply,
} from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast } from "@/utils";
import { Dialog, Empty, Skeleton } from "@taroify/core";
import { useState, useEffect } from "react";
import { navigateBack } from "@tarojs/taro";
import { AddressCard } from "@/components/AddressList/AddressCard";
import { AppFixedBottom } from "@/components/AppFixedBottom";
import { ServiceList } from "@/components/ServiceList";
import { appRouter } from "@/router";
import { reduce } from "lodash-es";
import { RefundReasonMap } from "./common";

export default () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();
  const [refundReasonOpen, setRefundReasonOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
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

  const cancelOrder = async () => {
    if (!orderDetailRequest.data) {
      return;
    }
    appLoading.show("申请中...");
    const res = await postWxShopAfterSaleApply({
      body: {
        orderNo: orderDetailRequest.data?.order.orderNo,
        applyAmount: orderDetailRequest.data?.order.paymentAmount,
        refundReason,
      },
    });
    if (res.data?.code !== 0) {
      appToast.error(res.data?.msg || "申请失败");
      return;
    }
    appToast.success("申请成功");
    orderDetailRequest.run();
  };

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

  const renderBottomBtns = () => {
    if (orderDetail.isService === 1) {
      if ([2].includes(orderDetail.status)) {
        const allQty = reduce(
          orderDetail.itemList.map((item) => item.qty),
          (a, b) => a + b,
          0,
        );
        const allUsedQty = reduce(
          orderDetail.itemList.map((item) => item.usedQty),
          (a, b) => a + b,
          0,
        );
        const notUse = allQty === allUsedQty;
        return (
          <AppFixedBottom className="flex flex-col gap-[24px]">
            <AppButton
              onClick={() => {
                appRouter.navigateTo("serviceUse", {
                  query: {
                    orderNo: orderDetail.orderNo,
                  },
                });
              }}
            >
              使用
            </AppButton>
            {notUse && (
              <AppButton
                status="error"
                onClick={() => {
                  setRefundReason("");
                  setRefundReasonOpen(true);
                }}
              >
                申请退款
              </AppButton>
            )}
          </AppFixedBottom>
        );
      } else if ([3].includes(orderDetail.status)) {
        return (
          <AppFixedBottom className="flex flex-col gap-[24px]">
            <AppButton
              onClick={() => {
                appRouter.navigateTo("serviceUse", {
                  query: {
                    orderNo: orderDetail.orderNo,
                  },
                });
              }}
            >
              查看
            </AppButton>
          </AppFixedBottom>
        );
      }
    }
    if ([1].includes(orderDetail.status)) {
      return (
        <AppFixedBottom>
          <AppButton
            status="error"
            onClick={() => {
              setRefundReason("");
              setRefundReasonOpen(true);
            }}
          >
            申请退款
          </AppButton>
        </AppFixedBottom>
      );
    }
  };

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
      <BasePage className="pb-[400px]">
        <View className="px-[24px] pt-[24px]">
          <View className="text-[32px] font-semibold">{getStatusText()}</View>
        </View>

        <View className="mt-[24px] px-[24px]">
          <View className="bg-white rounded-xl">
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
          <View className="bg-white rounded-xl p-[24px] flex flex-col gap-2 mt-[24px]">
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
          {currentAddress && (
            <AddressCard
              className="shadow-none!"
              info={currentAddress}
              isMaskPhone
              showActions={false}
            />
          )}
        </View>
      </BasePage>
      {renderBottomBtns()}
      <AppPopup
        title="申请原因"
        open={refundReasonOpen}
        showClose
        onClose={() => {
          setRefundReasonOpen(false);
        }}
        footer={
          <AppButton
            disabled={!refundReason}
            status="error"
            onClick={() => {
              setRefundReasonOpen(false);
              Dialog.confirm({
                theme: "rounded",
                title: "提示",
                message: "确定申请退款吗？",
                onConfirm: () => {
                  cancelOrder();
                },
              });
            }}
          >
            确定
          </AppButton>
        }
      >
        <RadioGroup
          onChange={(e) => {
            setRefundReason(e.detail.value);
          }}
        >
          <View className="px-[32px]">
            {RefundReasonMap.map((item) => {
              return (
                <View
                  className="py-[24px] flex justify-between"
                  key={item.reason}
                  onClick={() => {}}
                >
                  <View className="text-[28px] font-bold">{item.reason}</View>
                  <Radio
                    name={item.reason}
                    value={item.reason}
                    checked={item.reason === refundReason}
                  />
                </View>
              );
            })}
          </View>
        </RadioGroup>
      </AppPopup>
    </>
  );
};
