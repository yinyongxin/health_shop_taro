import { ProductInfo } from "@/client";
import { AppTag } from "@/components";
import Box from "@/components/Box";
import { safeJson } from "@/utils";
import { View, Text } from "@tarojs/components";

type BaseInfoProps = {
  info: ProductInfo;
};

export const BaseInfo = (props: BaseInfoProps) => {
  const { info } = props;
  return (
    <Box
      bgProps={{
        className: "bg-white",
      }}
      className="px-[24px] py-[24px] flex flex-col gap-2"
    >
      <View className="flex items-end gap-3 font-bold ">
        <View className="text-rose-500 flex items-end">
          <Text className="text-[28px]">现价</Text>
          <Text className="text-[28px]">￥</Text>
          <Text className="text-[48px] leading-5 text-rose-500 align-baseline">
            {info.price}
          </Text>
        </View>

        {info.originalPrice && info.originalPrice !== info.price && (
          <View className="text-gray-500">
            <Text className="text-[28px]">原价</Text>
            <Text className="text-[28px]">￥</Text>
            <Text className="text-[28px] ">{info.originalPrice}</Text>
          </View>
        )}
      </View>
      <View className="text-[32px] font-bold">{info?.name}</View>

      <View className="text-gray-500">
        {info?.description || "没有任何描述"}
      </View>

      <View className="flex gap-[8px]">
        <View className="flex gap-1">
          {safeJson.parse(info?.productTags, []).map((tag) => (
            <AppTag key={tag} status="warning">
              {tag}
            </AppTag>
          ))}
        </View>
      </View>
    </Box>
  );
};
