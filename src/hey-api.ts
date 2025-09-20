import TaroAdapter from "./utils/taroAdapter";
import type { CreateClientConfig } from "./client/client.gen";
import { isWeapp } from "./utils";
import { APP_ENV_CONFIG } from "./common";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  baseURL: APP_ENV_CONFIG.API_PREFIX,
});
