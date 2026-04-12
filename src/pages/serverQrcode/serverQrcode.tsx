import { AppButton, BasePage, Box } from "@/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopOrderDetail } from "@/client";
import { View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import { appToast } from "@/utils";
import { navigateBack } from "@tarojs/taro";
import { InfoCardItem } from "@/components/InfoCard/InfoCardItem";
import { Empty } from "@taroify/core";
import { Skeleton } from "./Skeleton";

const ServerQrcode = () => {
  const pageParams = usePageParams<"serverQrcode">();

  const [qrCodeData, setQrCodeData] = useState("");

  const orderDetailRequest = useRequest(async () => {
    if (!pageParams.orderNo) {
      throw new Error("订单号不存在");
    }
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo },
    });
    if (res.data?.code === 0) {
      return res?.data?.data;
    }
    throw new Error(res.data?.msg ?? "获取订单详情失败");
  });
  const orderDetail = orderDetailRequest.data?.order;
  const serverDetail = orderDetail?.itemList?.find(
    (item) => item.itemId.toString() === pageParams.serverId,
  );

  useEffect(() => {
    if (!orderDetail) {
      return;
    }

    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      margin: 1,
    } as const;
    QRCode.toDataURL(
      JSON.stringify({
        orderNo: pageParams.orderNo,
        serverId: pageParams.serverId,
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
  }, [orderDetail]);

  if (
    !orderDetailRequest.loading &&
    (orderDetailRequest.error || !orderDetail)
  ) {
    return (
      <Empty>
        <Empty.Image></Empty.Image>
        <Empty.Description>
          {orderDetailRequest.error?.message || "服务不存在"}
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

  if (orderDetail?.status !== undefined && orderDetail?.status !== 2) {
    return (
      <Empty>
        <Empty.Description>服务不存在</Empty.Description>
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
    <BasePage fullScreen className="p-2">
      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
        wapperProps={{ className: "flex-center flex-col gap-2 py-4" }}
      >
        <View>请出示以下二维码给工作人员扫码核销</View>
        <Image showMenuByLongpress className="size-[600px]" src={qrCodeData} />
        <View className="text-orange-500">
          二维码将于 {serverDetail?.qrCodeExpireTime} 过期
        </View>
      </Box>

      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
        wapperProps={{ className: "flex flex-col gap-2 p-2" }}
        className="mt-3"
      >
        {/* <InfoCardItem label="核销数量" value="1" /> */}
        <InfoCardItem label="商品名称" value={serverDetail?.productName} />
        <InfoCardItem label="服务名称" value={serverDetail?.itemName} />
        {/* <InfoCardItem label="价格" value={`${serverDetail?.price}元`} /> */}
      </Box>
    </BasePage>
  );
};

export default ServerQrcode;
