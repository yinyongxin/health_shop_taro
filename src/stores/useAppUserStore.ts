import { AddressInfo, getWxShopAddrList } from "@/client";
import { createAppStore } from "./base";

interface AppUserState {
  totalPrice: number;
  currentAddress?: AddressInfo;
  updateCurrentAddress: (address: AddressInfo) => void;
  defaultAddress?: AddressInfo;
  addressList: AddressInfo[];
  updateAddressList: () => void;
}

export const useAppUserStore = createAppStore<AppUserState>(
  (set, _get) => ({
    totalPrice: 0,
    currentAddress: undefined,
    updateCurrentAddress: (address) => {
      set({
        currentAddress: address,
      });
    },
    addressList: [],
    updateAddressList: async () => {
      const res = await getWxShopAddrList({});
      const addressList = res?.data?.data || [];
      set({
        addressList,
        defaultAddress: addressList.find((item) => item.isDefault),
        currentAddress:
          addressList.find((item) => item.isDefault) || addressList[0],
      });
    },
  }),
  "appUser",
);
