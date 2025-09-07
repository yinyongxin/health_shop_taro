import TaroAdapter from "./utils/taroAdapter";
import type { CreateClientConfig } from "./client/client.gen";
import { isWeapp } from "./utils";

export const createClientConfig: CreateClientConfig = (config) => ({
  ...config,
  // baseURL: APP_ENV_CONFIG.BASE_URL,
  baseURL: "https://m1.apifoxmock.com/m1/7075201-6796357-default",
  headers: {
    apifoxToken: "d-fQmu8_8liYe_Xs2fe8I",
  },
  adapter: isWeapp ? (TaroAdapter as any) : undefined,
});
