import { getWxShopOrderDetail } from "@/client";
import { BasePage } from "@/components";
import { usePageParams, useRequest } from "@/hooks";

const OrderPayPage = () => {
  const pageParams = usePageParams<"orderPay">();
  const orderDetailRequest = useRequest(async () => {
    const res = await getWxShopOrderDetail({
      query: { orderNo: pageParams.orderNo },
    });
    return res?.data;
  });
  return <BasePage>支付订单</BasePage>;
};
export default OrderPayPage;
