import { BasePage, HospitalList } from "@/components";
import { usePageParams, useRequest } from "@/hooks";
import { getWxShopOrderDetail } from "@/client";
import { View } from "@tarojs/components";

const ServerQrcode = () => {
  const pageParams = usePageParams<"serverQrcode">();
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
  return (
    <BasePage fullScreen>
      <View>{orderDetail?.orderNo}</View>
    </BasePage>
  );
};

export default ServerQrcode;
