import { DictItem, getWxRedirectQueryDict, getWxShopOrgList } from "@/client";
import { createAppStore } from "./base";

interface UseAppEnvState {
  orgId?: string;
  updateOrgId: (orgId?: UseAppEnvState["orgId"]) => void;
  getOrgId: () => UseAppEnvState["orgId"];

  hospitalList?: any[];
  initHospitalList?: () => void;

  orderStatusList: DictItem[];
  updateOrderStatus: () => void;

  cardTypeDictList: DictItem[];
  updateCardTypeDictList: () => void;
}

export const useAppEnvStore = createAppStore<UseAppEnvState>(
  (set, get) => ({
    orgId: undefined,
    updateOrgId: (orgId) => set({ orgId }),
    getOrgId: () => get()?.orgId,
    hospitalList: [],
    initHospitalList: async () => {
      const res = await getWxShopOrgList();
      set({
        hospitalList: res.data?.data || [],
      });
    },

    cardTypeDictList: [],
    updateCardTypeDictList: async () => {
      const res = await getWxRedirectQueryDict({
        query: {
          dictType: "card_type",
        },
      });
      set({
        cardTypeDictList: res?.data?.data || [],
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
  "appEnv",
);
