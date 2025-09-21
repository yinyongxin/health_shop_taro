import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { SwipeCell } from "@taroify/core";
import { wareListMock } from "@/mock";
import { useAppUserStore } from "@/stores";
import { CartItem } from "@/client";
import { CartWareCard, CartWareCardProps } from ".";
import { LucideIcon } from "../LucideIcon";

export type CartWareCardListProps = {
  data?: CartItem[];
  className?: string;
  cartWareCardProps?: Partial<CartWareCardProps>;
};

export const CartWareCardList = (props: CartWareCardListProps) => {
  const appUserStore = useAppUserStore();

  const { data = [], className, cartWareCardProps } = props;

  return (
    <View className={classNames("flex flex-col gap-[24px]", className)}>
      {data.map((item) => {
        return (
          <SwipeCell key={item.id}>
            <CartWareCard
              info={item}
              defaultNum={item.quantity}
              {...cartWareCardProps}
            />
            <SwipeCell.Actions side="right">
              <View
                className="flex flex-col gap-[8px] justify-center items-center px-[40px] text-red-500"
                onClick={() => {}}
              >
                <LucideIcon name="trash" size={20} />
                <Text className="text-[28px] font-semibold">删除</Text>
              </View>
            </SwipeCell.Actions>
          </SwipeCell>
        );
      })}
    </View>
  );
};
