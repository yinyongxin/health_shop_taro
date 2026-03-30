import { createAppStore } from "./base";

interface useAppEnvState {
  orgId: string;
  isPublicPlatform: boolean;
  updateOrgId: (orgId?: string) => void;
  getOrgId: () => string | undefined;
  updateIsPublicPlatform: (isPublicPlatform: boolean) => void;
  getIsPublicPlatform: () => boolean | undefined;
}

export const useAppEnvStore = createAppStore<useAppEnvState>(
  (set, get) => ({
    orgId: "800001004",
    updateOrgId: (orgId) => set({ orgId }),
    getOrgId: () => get()?.orgId,
    isPublicPlatform: false,
    updateIsPublicPlatform: (isPublicPlatform) => set({ isPublicPlatform }),
    getIsPublicPlatform: () => get()?.isPublicPlatform,
  }),
  "appEnv",
);
