import { ProductInfo, SkuInfo } from "@/client";
import { View, Text } from "@tarojs/components";
import { ReactNode, useState } from "react";
import { isIOS, safeJson } from "@/utils";
import classNames from "classnames";
import { AppImage } from "../AppImage";
import { Title } from "../Title";
import { AppTag } from "../AppTag";

type SkuSelectContentProps = {
  data: ProductInfo;
  currentSku: SkuInfo;
  setCurrentSku: (sku: SkuInfo) => void;
  btns: (sku: SkuInfo) => ReactNode;
  quantity: number;
  quantityChange: (quantity: number) => void;
};
export const SkuSelectContent = (props: SkuSelectContentProps) => {
  const { data, btns, currentSku, setCurrentSku, quantity, quantityChange } =
    props;
  const handleAdd = () => {
    if (quantity >= currentSku.stock) {
      return;
    }
    quantityChange(quantity + 1);
  };
  const handleReduce = () => {
    if (quantity > 1) {
      quantityChange(quantity - 1);
    }
  };

  return (
    <View className="pt-[32px] pb-[32px] min-h-[50vh] relative">
      <View className="flex gap-[16px] px-[24px]">
        <AppImage
          className="size-[120px] bg-gray-200 rounded-[12px]"
          src={currentSku?.image || "/fixed-files/images/my-patient.png"}
          mode="aspectFill"
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
        <View className="flex gap-[24px] flex-wrap mt-[24px]">
          {data.skuList.map((sku) => {
            const skuName = safeJson.parse(sku.specs, { 规格: "默认" });
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
        <View className="flex justify-between items-center mt-[48px]">
          <Title>数量</Title>
          <View className="flex gap-[8px] flex-wrap">
            <View className="shirnk-0 flex items-center gap-2">
              <AppTag
                status="secondary"
                className="size-[48px]"
                onClick={() => {
                  handleReduce();
                }}
              >
                -
              </AppTag>
              <View className="text-[28px]">{quantity}</View>
              <AppTag
                status="secondary"
                className="size-[48px]"
                onClick={() => {
                  handleAdd();
                }}
              >
                +
              </AppTag>
            </View>
          </View>
        </View>
      </View>
      <View
        className={classNames("p-[24px] absolute bottom-0 left-0 right-0", {
          "pb-[40px]": isIOS(),
        })}
      >
        {btns?.(currentSku)}
      </View>
    </View>
  );
};
