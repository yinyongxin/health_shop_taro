import Taro from "@tarojs/taro";
import { AllPages, AllPageKey, AllPagesQueryType } from "./base";

const navigateTo = async <P extends AllPageKey>(
  page: P,
  option?: {
    query?: AllPagesQueryType[P];
  },
  navigateToOpiton?: Omit<Taro.navigateTo.Option, "url">,
) => {
  const { query } = option || {};
  const url = AllPages.find((item) => item.name === page)?.path;
  const seachParams = new URLSearchParams(query);
  const queryStr = seachParams.toString();
  return Taro.navigateTo({
    url: `${url}?${queryStr}`,
    ...navigateToOpiton,
  });
};

const reLaunch = async <P extends AllPageKey>(
  page: P,
  option?: {
    query?: AllPagesQueryType[P];
  },
  navigateToOpiton?: Omit<Taro.reLaunch.Option, "url">,
) => {
  const { query } = option || {};
  const url = AllPages.find((item) => item.name === page)?.path;
  const seachParams = new URLSearchParams(query);
  const queryStr = seachParams.toString();
  return Taro.reLaunch({
    url: `${url}?${queryStr}`,
    ...navigateToOpiton,
  });
};
export const appRouter = {
  navigateTo,
  reLaunch,
};
