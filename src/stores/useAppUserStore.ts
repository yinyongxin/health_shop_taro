import { wareListMock } from "@/mock";
import { createAppStore } from "./base";
import Taro from "@tarojs/taro";

type CartListItem = {
  id: string,
  num: number
}

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  totalPrice: number,
  cartList: CartListItem[]
  addCart: (id: string) => void,
  deleteCard: (id: string) => void
  updateCartNum: (id: string, num: number) => void,
}

const calculateTotalPrice = (cartList: CartListItem[]) => {
  const totalPrice = cartList.reduce((pre, cur) => {
    const wareInfo = wareListMock.find((item) => item.id === cur.id)
    if (wareInfo) {
      return pre + wareInfo.price * cur.num
    }
    return pre
  }, 0)
  return Number(totalPrice.toFixed(2))
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, get) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
    totalPrice: 0,
    cartList: [],
    addCart: (id) => {
      const currentList = get().cartList
      const isIn = currentList.some((item) => item.id === id);
      if (isIn) {
        Taro.showToast({
          title: '请勿重复添加',
          icon: 'error',
          duration: 2000
        })
        return
      }
      const newCartList = [...currentList, { id, num: 1 }]
      set({
        cartList: newCartList,
        totalPrice: calculateTotalPrice(newCartList)
      });
      Taro.showToast({
        title: '加入购物车成功',
        icon: 'success',
        duration: 2000
      })
    },
    deleteCard: (id) => {
      const currentList = get().cartList
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList.splice(index, 1);
      }
      set({ cartList: currentList, totalPrice: calculateTotalPrice(currentList) })
    },
    updateCartNum: (id, num) => {
      const currentList = get().cartList
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList[index].num = num;
      }
      set({ cartList: currentList, totalPrice: calculateTotalPrice(currentList) })
    },
  }),
  "appUser",
);
