import { showToast } from "@tarojs/taro";
import { calculateTotalPrice } from "@/utils/price";
import { AddressInfo, CartInfo } from "@/client";
import { createAppStore } from "./base";

export type CartListItem = {
  id: string;
  num: number;
};

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  cartInfo: CartInfo;
  updateCartInfo: (cartInfo: Partial<CartInfo>) => void;
  addressList: AddressInfo[];
  updateAddressList: (addressList: AddressInfo[]) => void;
  totalPrice: number;
  cartList: CartListItem[];
  addCart: (id: string) => void;
  deleteCard: (id: string) => void;
  updateCartNum: (id: string, num: number) => void;
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, get) => ({
    tabActive: "home",
    updateTabActive: (tabActive) => {
      set({ tabActive });
    },
    cartInfo: {
      id: 0,
      userId: "",
      orgId: "",
      sessionId: undefined,
      createdAt: "",
      updatedAt: "",
      itemList: [],
    },
    updateCartInfo: (cartInfo) => {
      const currentCartInfo = get().cartInfo;
      set({ cartInfo: { ...currentCartInfo, ...cartInfo } });
    },
    addressList: [],
    updateAddressList: (addressList) => {
      set({ addressList });
    },
    totalPrice: 0,
    cartList: [],
    addCart: (id) => {
      const currentList = get().cartList;
      const isIn = currentList.some((item) => item.id === id);
      if (isIn) {
        showToast({
          title: "请勿重复添加",
          icon: "error",
          duration: 2000,
        });
        return;
      }
      const newCartList = [...currentList, { id, num: 1 }];
      set({
        cartList: newCartList,
        totalPrice: calculateTotalPrice(newCartList),
      });
      showToast({
        title: "加入购物车成功",
        icon: "success",
        duration: 2000,
      });
    },
    deleteCard: (id) => {
      const currentList = get().cartList;
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList.splice(index, 1);
      }
      set({
        cartList: currentList,
        totalPrice: calculateTotalPrice(currentList),
      });
    },
    updateCartNum: (id, num) => {
      const currentList = get().cartList;
      const index = currentList.findIndex((item) => item.id === id);
      if (index !== -1) {
        currentList[index].num = num;
      }
      set({
        cartList: currentList,
        totalPrice: calculateTotalPrice(currentList),
      });
    },
  }),
  "appUser",
);
