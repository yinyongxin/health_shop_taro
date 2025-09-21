import { CartItem, CreateOrderBody, postWxShopOrderCreate } from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { calculateTotalPrice } from "./price";

export const createOrder = async (data: {
  addressId: number;
  cartId: number;
  itemList: CartItem[];
}) => {
  const { addressId, itemList, cartId } = data;
  //   const res = await request.post("/order/create", data);
  //   return res;
  const paymentAmount = calculateTotalPrice(itemList);
  const freightAmount = 0;
  const discountAmount = 0;
  const body: CreateOrderBody = {
    addressId,
    cartId,
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
};
