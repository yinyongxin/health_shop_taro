import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { Empty, SwipeCell } from "@taroify/core";
import { useAppUserStore } from "@/stores";
import { CartItem, getWxShopCartDelete } from "@/client";
import { appLoading, appToast } from "@/utils";
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
  const handleDelete = async (value: CartItem) => {
    appLoading.show("删除中...");
    const res = await getWxShopCartDelete({
      query: { cartItemId: value?.id?.toString() },
    });
    if (res.data?.code === 0) {
      await appUserStore.updateCartInfo();
      appToast.success("删除成功");
    } else {
      appToast.error(res?.data?.msg ?? "删除失败");
    }
  };
  if (data.length === 0) {
    return (
      <Empty>
        <Empty.Image />
        <Empty.Description>购物车空空如也</Empty.Description>
      </Empty>
    );
  }

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
                onClick={() => {
                  handleDelete(item);
                }}
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
