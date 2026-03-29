import { BasePage, Box } from "@/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopOrderDetail } from "@/client";
import { View, Image } from "@tarojs/components";
import { useEffect, useState } from "react";
import QRCode, { QRCodeToDataURLOptions } from "qrcode";
import { appToast } from "@/utils";

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
        qrcodeType: "fromShop",
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
  return (
    <BasePage fullScreen className="p-2">
      <View className="font-bold text-[32px] flex-center">
        {serverDetail?.itemName}-核销
      </View>
      <View>1次</View>
      <View>{serverDetail?.productName}</View>
      <View>{serverDetail?.orderNo}</View>
      <Box
        bgProps={{
          className: "bg-white rounded-xl",
        }}
        wapperProps={{ className: "flex-center flex-col gap-2 py-4" }}
      >
        <Image showMenuByLongpress className="size-[600px]" src={qrCodeData} />
        <View className="text-orange-500">
          二维码将于 {serverDetail?.qrCodeExpireTime} 过期
        </View>
      </Box>
    </BasePage>
  );
};

export default ServerQrcode;
