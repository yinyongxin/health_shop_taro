import { ProductInfo } from "@/client";
import { View } from "@tarojs/components";

type SkuSelectContentProps = {
  data: ProductInfo;
};
export const SkuSelectContent = (props: SkuSelectContentProps) => {
  return <View className="pt-[32px]">{props.data.detailContent}</View>;
};
