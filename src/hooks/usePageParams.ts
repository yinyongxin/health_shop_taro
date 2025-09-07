import { AllPageKey, AllPagesQueryType } from "@/router/base";
import Taro, { useLoad } from "@tarojs/taro";

export const usePageParams = <P extends AllPageKey>(
  call?: (params: AllPagesQueryType[P]) => void,
) => {
  const instance = Taro.getCurrentInstance();
  useLoad(() => {
    call?.(instance.router?.params as AllPagesQueryType[P]);
  });
  return instance.router?.params as AllPagesQueryType[P];
};
