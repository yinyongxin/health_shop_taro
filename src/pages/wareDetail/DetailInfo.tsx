import { ProductInfo } from "@/client";
import { RichText, View } from "@tarojs/components";

type DetailInfoProps = {
  info: ProductInfo;
};
export const DetailInfo = (props: DetailInfoProps) => {
  const { info } = props;
  return (
    <View className="pt-[32px] px-[24px]">
      <RichText
        nodes={info.detailContent.replace(
          /\<img/gi,
          '<img style="width:100%;height:auto"',
        )}
      />
    </View>
  );
};
