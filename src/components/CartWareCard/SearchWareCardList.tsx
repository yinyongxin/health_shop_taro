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

  const cartWareList = wareListMock.filter((item) => appUserStore.cartList.findIndex((cartItem) => cartItem.id === item.id) !== -1)

  const { data = cartWareList, className, cartWareCardProps } = props;

  const updateTotalPrice = () => {
    const totalPrice = data.reduce((pre, cur) => {
      const cartItem = appUserStore.cartList.find((item) => item.id === cur.id)
      if (cartItem) {
        return pre + cur.price * cartItem.num
      }
      return pre
    }, 0)
    props.totalPriceChange?.(Number(totalPrice.toFixed(2)))
  }

  useEffect(() => {
    updateTotalPrice()
  }, [appUserStore.cartList])
  return (
    <View
      className={classNames("pb-[64px] flex flex-col gap-[24px]", className)}
    >
      {data.map((item) => (
        <SwipeCell key={item.id}>
          <CartWareCard info={item} {...cartWareCardProps} numChange={(num) => {
            appUserStore.updateCartNum(item.id, num)
            updateTotalPrice()
          }} />
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
