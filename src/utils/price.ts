export type PriceItem = {
  price?: number;
  qty?: number;
};

export const calculateTotalPrice = (cartList: PriceItem[]) => {
  const totalPrice = cartList.reduce((pre, cur) => {
    const { price = 0, qty = 1 } = cur;
    return pre + price * qty;
  }, 0);
  return Number(totalPrice.toFixed(2));
};
