import { CartItem } from "@/client";

export const calculateTotalPrice = (cartList: CartItem[]) => {
  const totalPrice = cartList.reduce((pre, cur) => {
    const { price = 0, quantity = 1 } = cur;
    return pre + price * quantity;
  }, 0);
  return Number(totalPrice.toFixed(2));
};
