import { APP_ENV_CONFIG } from "@/common";
import Taro from "@tarojs/taro";
import { areaList } from "@vant/area-data";
import dayjs from "dayjs";

export const getAreaChinese = (areaValue: string[]) => {
  const values = Object.values(areaList);
  return areaValue.map((val, index) => {
    return values[index][val];
  });
};

export const isH5 = process.env.TARO_ENV === "h5";

export const isWeapp = process.env.TARO_ENV === "weapp";

const systemInfo = isWeapp
  ? Taro.getSystemInfoSync()
  : {
      environment: "h5",
    };

/**
 * 是否是企业微信
 */
export const isWorkMini = systemInfo.environment === "wxwork";

export const getBirthByCardNo = (
  no = "",
  slipt = "-",
  isDate = false,
  isRreverse = false,
) => {
  if (!no) return no;
  const toStr = no.toString();
  const yearStr = toStr.substring(6, 10);
  const dateStr = `${toStr.substring(10, 12)}${slipt}${toStr.substring(12, 14)}`;
  const reulst = isDate ? dateStr : `${yearStr}${slipt}${dateStr}`;
  return isRreverse ? reulst.split(slipt).reverse().join(slipt) : reulst;
};

export const getImagePath = (path: string) => {
  return APP_ENV_CONFIG.BASE_URL + APP_ENV_CONFIG.FILE_PREFIX + path;
};

export const getAge = (birthday?: string) => {
  return birthday ? dayjs().diff(dayjs(birthday), "year") : 0;
};

export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

export const safeJson = {
  stringify: (data: unknown, defaultValue: string = "") => {
    try {
      return JSON.stringify(data);
    } catch (error) {
      return JSON.stringify(defaultValue);
    }
  },
  parse: <D extends Record<string, any>>(data: string, defaultValue: D) => {
    try {
      return JSON.parse(data) as D;
    } catch (error) {
      return defaultValue;
    }
  },
};

export const getUrlCode = () => {
  const url = new URL(window.location.href);
  return url.searchParams.get("code");
};

export const getWinxinLoginUrl = () => {
  const { APPID } = APP_ENV_CONFIG;
  const redirect_uri = encodeURI(
    // window.location.origin + window.location.pathname + window.location.search,
    "https://chr.eh-med.com/hmall/",
  );
  const url = new URL(
    `https://open.weixin.qq.com/connect/oauth2/authorize#wechat_redirect`,
  );
  url.searchParams.set("appid", APPID);
  url.searchParams.set("redirect_uri", redirect_uri);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", "snsapi_userinfo");
  // url.searchParams.set("scope", "snsapi_base");
  // url.searchParams.set("state", "STATE");
  // https://open.weixin.qq.com/connect/oauth2/authorize?
  // appid=wxfaaff87825f44139
  // &redirect_uri=https%3A%2F%2Fchr.eh-med.com
  // &response_type=code
  // &scope=snsapi_userinfo
  // #wechat_redirect

  // https://open.weixin.qq.com/connect/oauth2/authorize?
  // appid=wx520c15f417810387
  // &redirect_uri=https%3A%2F%2Fchong.qq.com%2Fphp%2Findex.php%3Fd%3D%26c%3DwxAdapter%26m%3DmobileDeal%26showwxpaytitle%3D1%26vb2ctag%3D4_2030_5_1194_60
  // &response_type=code
  // &scope=snsapi_base
  // &state=123
  // #wechat_redirect
  return url.href;
};
export const jumpWxGetCode = () => {
  window.location.href = getWinxinLoginUrl();
};
