import { CartItem, CreateOrderBody, postWxShopOrderCreate } from "@/client";
import { APP_ENV_CONFIG } from "@/common";

export const createOrder = async (data: {
  addressId: number;
  itemList: CartItem[];
}) => {
  const { addressId, itemList } = data;
  //   const res = await request.post("/order/create", data);
  //   return res;
  const paymentAmount = itemList.reduce((acc, item) => {
    return acc + (item?.price || 0) * (item?.quantity || 1);
  }, 0);
  const freightAmount = 0;
  const discountAmount = 0;
  const body: CreateOrderBody = {
    addressId,
    orgId: APP_ENV_CONFIG.ORG_ID,
    totalAmount: discountAmount + paymentAmount + freightAmount,
    paymentAmount,
    freightAmount,
    discountAmount,
    itemList,
  };
  console.log("body", body);
  const res = await postWxShopOrderCreate({ body });
  if (res.data?.code === 0) {
    return res.data.data;
  }
  throw new Error(res.data.msg);
};
