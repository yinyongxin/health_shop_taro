import { ProductInfo, SkuInfo } from "@/client";
import { View, Text } from "@tarojs/components";
import { ReactNode, useState } from "react";
import { safeJson } from "@/utils";
import { AppImage } from "../AppImage";
import { Title } from "../Title";
import { AppTag } from "../AppTag";

type SkuSelectContentProps = {
  data: ProductInfo;
  btns: (sku: SkuInfo) => ReactNode;
};
export const SkuSelectContent = (props: SkuSelectContentProps) => {
  const { data, btns } = props;
  const [currentSku, setCurrentSku] = useState<SkuInfo>(data.skuList[0]);

  return (
    <View className="pt-[32px] pb-[32px]">
      <View className="flex gap-[16px] px-[24px]">
        <AppImage
          className="size-[120px] bg-gray-200"
          src={currentSku?.image || "/fixed-files/images/my-patient.png"}
        />
        <View className="flex flex-col justify-center gap-[16px]">
          <View className=" font-bold text-rose-500">
            <Text className="text-[28px]">￥</Text>
            <Text className="text-[40px] text-rose-500">{data?.price}</Text>
            <Text className="text-[32px] text-gray-500 line-through ml-2">
              {data.originalPrice}
            </Text>
          </View>
          <View>库存：{currentSku?.stock}</View>
        </View>
      </View>
      <View className="mt-[32px] px-[24px]">
        <Title>规格</Title>
        <View className="flex gap-[8px] flex-wrap mt-[24px]">
          {data.skuList.map((sku) => {
            const skuName = safeJson.parse(sku.specs, {});
            return (
              <AppTag
                key={sku.id}
                size="lg"
                actived={currentSku?.id === sku.id}
                onClick={() => setCurrentSku(sku)}
              >
                {skuName["规格"]}
              </AppTag>
            );
          })}
        </View>
      </View>
      <View className="mt-[32px] px-[24px]">{btns?.(currentSku)}</View>
    </View>
  );
};
