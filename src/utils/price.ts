import { wareListMock } from "@/mock"
import { CartListItem } from "@/stores"

export const calculateTotalPrice = (cartList: CartListItem[]) => {
  const totalPrice = cartList.reduce((pre, cur) => {
    const wareInfo = wareListMock.find((item) => item.id === cur.id)
    if (wareInfo) {
      return pre + wareInfo.price * cur.num
    }
    return pre
  }, 0)
  return Number(totalPrice.toFixed(2))
}