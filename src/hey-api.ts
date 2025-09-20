import type { CreateClientConfig } from "./client/client.gen";
import { APP_ENV_CONFIG } from "./common";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: APP_ENV_CONFIG.API_PREFIX,
});
