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
  development: window.devConfig as AppEnvConfig,
  //@ts-ignore
  production: window.prodConfig as AppEnvConfig,
}[process.env.NODE_ENV];
