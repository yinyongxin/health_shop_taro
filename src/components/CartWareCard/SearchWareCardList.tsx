import { getGetWaresPage, WareInfo } from "@/client";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useRequest } from "@/hooks";
import { Button, SwipeCell } from "@taroify/core";
import { CartWareCard, CartWareCardProps } from ".";
import { LucideIcon } from "../LucideIcon";

export type CartWareCardListProps = {
  data?: WareInfo[];
  className?: string;
  cartWareCardProps?: Partial<CartWareCardProps>;
};

export const CartWareCardList = (props: CartWareCardListProps) => {
  const dataRequest = useRequest(async () => {
    const res = await getGetWaresPage();
    return res.data;
  });
  const { data = [], className, cartWareCardProps } = props;
  return (
    <View
      className={classNames("pb-[64px] flex flex-col gap-[24px]", className)}
    >
      {(data.length ? data : dataRequest.data?.list || []).map((item) => (
        <SwipeCell key={item.id}>
          <CartWareCard info={item} {...cartWareCardProps} />
          <SwipeCell.Actions side="right">
            <View className="flex flex-col gap-[8px] justify-center items-center px-[40px] text-red-500">
              <LucideIcon name="trash" size={20} />
              <Text className="text-[28px] font-semibold">删除</Text>
            </View>
          </SwipeCell.Actions>
        </SwipeCell>
      ))}
    </View>
  );
};
