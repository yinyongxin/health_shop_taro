import { AppButton, BasePage, AppPopup } from "@/components";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { usePageParams, useRequest } from "@/hooks";
import { View, Text, Image } from "@tarojs/components";
import {
  AddressInfo,
  CartItem,
  getWxShopOrderDetail,
  postWxShopAddrViewById,
} from "@/client";
import { useAppUserStore } from "@/stores";
import { appToast, getServiceStatusText } from "@/utils";
import { Empty, Skeleton } from "@taroify/core";
import { useState, useEffect } from "react";
import { navigateBack } from "@tarojs/taro";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import dayjs from "dayjs";

export default () => {
  const appUserStore = useAppUserStore();
  const pageParams = usePageParams<"orderPay">();
  const [address, setAddress] = useState<AddressInfo>();
  const [qrCodeData, setQrCodeData] = useState("");

  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo },
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
    });
    if (getAddressRes.data?.code === 0) {
      setAddress(getAddressRes.data?.data);
    } else {
      appToast.error(getAddressRes.data?.msg ?? "获取地址失败");
    }
  };
  useEffect(() => {
    initAddress();
  }, [orderDetailRequest.data?.order.addressId]);

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
    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      margin: 1,
    } as const;

    QRCode.toDataURL(
      JSON.stringify({
        qrcodeType: "fromShop",
        phone: address?.receiverPhone,
        orderNo: info.orderNo,
        serviceId: info.itemId,
      }),
      opts,
      function (err, url) {
        if (err) {
          appToast.error("生成二维码失败");
          return;
        }
        setQrCodeData(url);
      },
    );
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
          <View className="bg-white rounded-xl">
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
      </BasePage>
      <AppPopup
        title="服务核销"
        open={!!qrCodeData}
        onClose={() => {
          setQrCodeData("");
          orderDetailRequest.run();
        }}
        showClose
      >
        <View className="flex-center">
          <Image
            showMenuByLongpress
            className="size-[600px]"
            src={qrCodeData}
          />
        </View>
        <View className="text-center text-orange-500 text-[32px] mt-[24px]">
          请将二维码出示给服务人员
        </View>
      </AppPopup>
    </>
  );
};
