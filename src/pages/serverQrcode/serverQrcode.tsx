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
  const serverIds = pageParams.serverIds;
  const serverDetails = orderDetail?.itemList?.filter((item) =>
    serverIds?.includes(item.itemId),
  );

  useEffect(() => {
    if (!orderDetail || !serverDetails?.length) {
      return;
    }

    const opts: QRCodeToDataURLOptions = {
      errorCorrectionLevel: "H",
      type: "image/jpeg",
      margin: 1,
    } as const;
    const data = {
      orderNo: pageParams.orderNo,
      serverIds,
    };
    QRCode.toDataURL(JSON.stringify(data), opts, function (err, url) {
      if (err) {
        appToast.error("生成二维码失败");
        return;
      }
      setQrCodeData(url);
    });
  }, [orderDetail, serverDetails]);

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
          二维码将于 {serverDetails?.[0]?.qrCodeExpireTime} 过期
        </View>
      </Box>

      <Box
        bgProps={{
          className: "bg-white rounded-lg",
        }}
        wapperProps={{ className: "flex flex-col gap-2 p-2" }}
        className="mt-3"
      >
        <View className="text-[28px] font-semibold">
          共 {serverDetails?.length} 项服务
        </View>
        {serverDetails?.map((item) => (
          <View key={item.id} className="border-t border-gray-100 pt-2">
            <InfoCardItem label="商品名称" value={item.productName} />
            <InfoCardItem label="服务名称" value={item.itemName} />
          </View>
        ))}
      </Box>
    </BasePage>
  );
};

export default ServerQrcode;
