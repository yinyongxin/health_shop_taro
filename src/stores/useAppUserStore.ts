import { calculateTotalPrice } from "@/utils/price";
import {
  AddressInfo,
  CartInfo,
  DictItem,
  getWxRedirectQueryDict,
  getWxShopAddrList,
  getWxShopCartLoad,
} from "@/client";
import { APP_ENV_CONFIG } from "@/common";
import { createAppStore } from "./base";

export type CartListItem = {
  id: string;
  num: number;
};

interface AppUserState {
  tabActive: string;
  updateTabActive: (value: string) => void;
  cartInfo: CartInfo;
  updateCartInfo: () => void;
  addressList: AddressInfo[];
  updateAddressList: () => void;
  defaultAddress?: AddressInfo;
  totalPrice: number;
  orderStatusList: DictItem[];
  updateOrderStatus: () => void;
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
    totalPrice: 0,
    updateCartInfo: async () => {
      const res = await getWxShopCartLoad({
        query: {
          orgId: APP_ENV_CONFIG.ORG_ID,
        },
      });
      if (res.data?.code !== 0) {
        return;
      }
      set({
        cartInfo: res.data.data,
        totalPrice: calculateTotalPrice(res.data.data.itemList),
      });
    },
    addressList: [],
    updateAddressList: async () => {
      const res = await getWxShopAddrList({
        query: {
          orgId: APP_ENV_CONFIG.ORG_ID,
        },
      });
      if (res.data?.code !== 0) {
        return;
      }
      set({
        addressList: res.data.data,
        defaultAddress: res.data.data.find((item) => item.isDefault),
      });
    },

    orderStatusList: [],
    updateOrderStatus: async () => {
      const res = await getWxRedirectQueryDict({
        query: {
          dictType: "shop_order_status",
        },
      });
      if (res.data?.code !== 0) {
        return;
      }
      set({
        orderStatusList: res.data.data,
      });
    },
  }),
  "appUser",
);
