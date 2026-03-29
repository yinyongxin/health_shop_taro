import {
  AddressInfo,
  DictItem,
  getWxRedirectQueryDict,
  getWxShopAddrList,
} from "@/client";
import { createAppStore } from "./base";

interface AppUserState {
  addressList: AddressInfo[];
  updateAddressList: () => void;
  defaultAddress?: AddressInfo;
  totalPrice: number;
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
