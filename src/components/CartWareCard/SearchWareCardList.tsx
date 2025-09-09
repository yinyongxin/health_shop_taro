import { getGetWaresPage, WareInfo } from "@/client";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useRequest } from "@/hooks";
import { SwipeCell } from "@taroify/core";
import { wareListMock } from "@/mock";
import { CartWareCard, CartWareCardProps } from ".";
import { LucideIcon } from "../LucideIcon";
import { useAppUserStore } from "@/stores";
import { useEffect } from "react";

export type CartWareCardListProps = {
  data?: WareInfo[];
  className?: string;
  cartWareCardProps?: Partial<CartWareCardProps>;
  totalPriceChange?: (price: number) => void
};

export const CartWareCardList = (props: CartWareCardListProps) => {
  const appUserStore = useAppUserStore()

  const cartWareList = wareListMock.filter((item) => appUserStore.cartList.includes(item.id))

  const { data = cartWareList, className, cartWareCardProps } = props;

  useEffect(() => {
    const totalPrice = cartWareList.reduce((pre, cur) => {
      return pre + cur.price
    }, 0)
    props.totalPriceChange?.(totalPrice)
  }, [appUserStore.cartList.length])
  return (
    <View
      className={classNames("pb-[64px] flex flex-col gap-[24px]", className)}
    >
      {data.map((item) => (
        <SwipeCell key={item.id}>
          <CartWareCard info={item} {...cartWareCardProps} />
          <SwipeCell.Actions side="right">
            <View className="flex flex-col gap-[8px] justify-center items-center px-[40px] text-red-500"
              onClick={() => {
                appUserStore.deleteCard(item.id)
              }}
            >
              <LucideIcon name="trash" size={20} />
              <Text className="text-[28px] font-semibold">删除</Text>
            </View>
          </SwipeCell.Actions>
        </SwipeCell>
      ))}
    </View>
  );
};
