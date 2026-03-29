import { createAppStore } from "./base";

interface useAppEnvState {
  orgId: string;
  updateOrgId: (orgId: string) => void;
  getOrgId: () => string;
}

export const useAppEnvStore = createAppStore<useAppEnvState>(
  (set, get) => ({
    orgId: "800001004",
    updateOrgId: (orgId) => set({ orgId }),
    getOrgId: () => get().orgId,
  }),
  "appShopEnv",
);
