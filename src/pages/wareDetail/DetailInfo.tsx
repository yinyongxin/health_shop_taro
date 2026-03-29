import { ProductDetail } from "@/client";
import { RichText, View } from "@tarojs/components";

type DetailInfoProps = {
  info: ProductDetail;
};
export const DetailInfo = (props: DetailInfoProps) => {
  const { info } = props;
  if (!info.detailContent) {
    return null;
  }
  return (
    <View className="pt-[32px] px-[24px]">
      <View className="flex-center gap-4 pb-3">
        <View className="h-[2px] w-10 bg-sky-400"></View>
        <View className="flex-center">详情</View>
        <View className="h-[2px] w-10 bg-sky-400"></View>
      </View>
      <RichText
        nodes={info.detailContent.replace(
          /\<img/gi,
          '<img style="width:100%;height:auto"',
        )}
      />
    </View>
  );
};
