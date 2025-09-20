import devConfig from "../../public/configuration/dev.config";
import prodConfig from "../../public/configuration/prod.config";

type AppEnvConfig = {
  ENV: string;
  APPID: string;
  BASE_URL: string;
  API_PREFIX: string;
  FILE_PREFIX: string;
  ORG_ID: string;
};

export const APP_ENV_CONFIG = {
  //@ts-ignore
  development: devConfig as AppEnvConfig,
  //@ts-ignore
  production: prodConfig as AppEnvConfig,
}[process.env.NODE_ENV];
