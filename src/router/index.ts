import Taro from "@tarojs/taro";
import { AllPages, AllPageKey, AllPagesQueryType } from "./base";

const navigateTo = async <P extends AllPageKey>(
  page: P,
  option?: {
    query?: AllPagesQueryType[P];
  },
  navigateToOpiton?: Omit<Taro.navigateTo.Option, "url">,
) => {
  const { query = {} } = option || {};
  const url = AllPages.find((item) => item.name === page)?.path;
  const seachParams = new URLSearchParams({
    data: JSON.stringify(query)
  });
  const seachParamsStr = seachParams.toString();
  return Taro.navigateTo({
    url: `${url}?${seachParamsStr}`,
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
  const { query = {} } = option || {};
  const url = AllPages.find((item) => item.name === page)?.path;
  const seachParams = new URLSearchParams({
    data: JSON.stringify(query)
  });
  const seachParamsStr = seachParams.toString();
  return Taro.reLaunch({
    url: `${url}?${seachParamsStr}`,
    ...navigateToOpiton,
  });
};
export const appRouter = {
  navigateTo,
  reLaunch,
};
