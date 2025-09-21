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
        className: "bg-white rounded-lg",
      }}
    >
      <View className="px-[24px] py-[24px] flex flex-col gap-[16px]">
        <View className="flex justify-between items-center">
          <View className=" font-bold text-rose-500">
            <Text className="text-[28px]">￥</Text>
            <Text className="text-[40px] text-rose-500">{info?.price}</Text>
            <Text className="text-[32px] text-gray-500 line-through ml-2">
              {info.originalPrice}
            </Text>
          </View>
          <View className="text-gray-500">{/* 已售：{info?.sales} */}</View>
        </View>
        <View className="text-[32px] font-bold">{info?.name}</View>
        <View className="text-gray-500">{info?.description}</View>
        <View className="flex gap-[8px]">
          <View className="flex gap-1">
            {safeJson.parse(info?.productTags, []).map((tag) => (
              <AppTag key={tag} status="warning">
                {tag}
              </AppTag>
            ))}
          </View>
        </View>
      </View>
    </Box>
  );
};
