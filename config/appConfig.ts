export type AppConfigType = {
  PROXY_TARGET: string;
  BASE_URL: string;
  API_PREFIX: string;
  FILE_PREFIX: string;
};

export const APP_CONFIG_OPTION = {
  test: {
    PROXY_TARGET: "https://chr.eh-med.com",
    BASE_URL: "",
    FILE_PREFIX: "",
    API_PREFIX: "/zhfy",
  },
  prod: {
    PROXY_TARGET: "https://gt.eh-med.com",
    BASE_URL: "",
    FILE_PREFIX: "",
    API_PREFIX: "/gt",
  },
};

export const isWechat = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("micromessenger");
};

export const isWechatMP = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("miniprogram");
};

export const APP_CONFIG = APP_CONFIG_OPTION[
  process.env?.TARO_APP_API as any
] as AppConfigType;

console.log("APP_CONFIG", process.env?.TARO_APP_API, APP_CONFIG);
