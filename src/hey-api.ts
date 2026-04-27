import { APP_CONFIG } from "@/appConfig";
import type { CreateClientConfig } from "./client/client.gen";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: APP_CONFIG.API_PREFIX,
});
