import {
  AddressInfo,
  DictItem,
  getWxRedirectQueryDict,
  getWxShopAddrList,
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
    totalPrice: 0,
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
      const addressList = res.data?.data || [];
      set({
        addressList,
        defaultAddress: addressList.find((item) => item.isDefault),
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
