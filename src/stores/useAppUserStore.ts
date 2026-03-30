import {
  AddressInfo,
  DictItem,
  getWxRedirectQueryDict,
  getWxShopAddrList,
} from "@/client";
import { createAppStore } from "./base";

interface AppUserState {
  totalPrice: number;

  defaultAddress?: AddressInfo;
  addressList: AddressInfo[];
  updateAddressList: () => void;

  orderStatusList: DictItem[];
  updateOrderStatus: () => void;
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, get) => ({
    totalPrice: 0,
    addressList: [],
    updateAddressList: async () => {
      const res = await getWxShopAddrList({});

      const addressList = res?.data?.data || [];
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
      set({
        orderStatusList: res?.data?.data || [],
      });
    },
  }),
  "appUser",
);
