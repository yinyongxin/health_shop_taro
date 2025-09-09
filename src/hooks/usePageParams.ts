import { AllPageKey, AllPagesQueryType } from "@/router/base";
import Taro, { useLoad } from "@tarojs/taro";

export const usePageParams = <P extends AllPageKey>(
  call?: (params: AllPagesQueryType[P]) => void,
) => {
  const instance = Taro.getCurrentInstance();
 const data = JSON.parse(decodeURIComponent(instance.router?.params.data || '')) as unknown as  AllPagesQueryType[P]
  useLoad(() => {
    call?.(data);
  });
  return data;
};
