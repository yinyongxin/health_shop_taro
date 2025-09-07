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
