import {
  DictItem,
  getWxRedirectQueryDict,
  getWxShopContentList,
  getWxShopOrgList,
  ShopContentInfo,
} from "@/client";
import { createAppStore } from "./base";

interface UseAppEnvState {
  orgId?: string;
  updateOrgId: (orgId?: UseAppEnvState["orgId"]) => void;
  getOrgId: () => UseAppEnvState["orgId"];

  appId?: string;
  updateAppId: (orgId?: UseAppEnvState["appId"]) => void;
  getAppId: () => UseAppEnvState["appId"];

  hospitalList?: {
    orgId: string;
    orgName: string;
    main?: boolean;
  }[];
  initHospitalList?: () => void;

  orderStatusList: DictItem[];
  updateOrderStatus: () => void;

  cardTypeDictList: DictItem[];
  updateCardTypeDictList: () => void;

  agreementData?: ShopContentInfo;
  updataAgreementData: () => void;
}

export const useAppEnvStore = createAppStore<UseAppEnvState>(
  (set, get) => ({
    orgId: undefined,
    updateOrgId: (orgId) => set({ orgId }),
    getOrgId: () => get()?.orgId,

    appId: undefined,
    updateAppId: (appId) => set({ appId }),
    getAppId: () => get()?.appId,

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

    agreementData: undefined,
    updataAgreementData: async () => {
      let orgId = get()?.orgId;
      if (!orgId) {
        orgId = get()?.hospitalList?.find((item) => item.main)?.orgId;
      }

      const getWxShopContentListRes = await getWxShopContentList({
        query: {
          orgId,
          category: "患者服务包知情同意书",
        },
      });
      if (getWxShopContentListRes.data?.data?.[0]) {
        set({
          agreementData: getWxShopContentListRes.data?.data?.[0],
        });
      }
    },
  }),
  "appEnv",
);
