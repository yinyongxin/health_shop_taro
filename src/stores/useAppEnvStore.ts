import { createAppStore } from "./base";

interface useAppEnvState {
  orgId?: string;
  updateOrgId: (orgId?: string) => void;
  getOrgId: () => string | undefined;
}

export const useAppEnvStore = createAppStore<useAppEnvState>(
  (set, get) => ({
    updateOrgId: (orgId) => set({ orgId }),
    getOrgId: () => get()?.orgId,
  }),
  "appEnv",
);
