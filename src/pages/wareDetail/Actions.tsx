import { WareInfo } from "@/client";
import { LucideIcon, AppButton, AppPopup } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { usePopupControl } from "@/hooks";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import classNames from "classnames";

type ActionsProps = {
  info: WareInfo;
};

export const Actions = (props: ActionsProps) => {
  const { info } = props;
  const appUserStore = useAppUserStore();
  const popupControl = usePopupControl();
  return (
    <>
      <View className="fixed bottom-0 left-0 right-0 pr-[24px] bg-blur flex app-shadow-lg">
        <View className="flex-1 flex items-center justify-around">
          <View className="flex flex-col active:text-blue-500 items-center gap-1">
            <LucideIcon name="headphones" size={18} />
            <Text className="text-[20px]">客服</Text>
          </View>
          <View className="flex flex-col active:text-blue-500 items-center gap-1">
            <LucideIcon
              name="star"
              className={classNames({
                "text-rose-500": info.liked,
              })}
              size={20}
            />
            <Text className="text-[20px]">收藏</Text>
          </View>
          {/* <View
            className="flex flex-col active:text-blue-500 items-center gap-1"
            onClick={() => {
              appUserStore.updateTabActive("cart");
              appRouter.reLaunch("index");
            }}
          >
            <LucideIcon name="shopping-cart" size={20} />
            <Text className="text-[20px]">购物车</Text>
          </View> */}
        </View>
        <View className="flex-3 flex gap-[16px] py-[24px]">
          <AppButton
            status="warning"
            className="flex-1"
            onClick={() => {
              appUserStore.addCart(info.id);
            }}
          >
            加入购物车
          </AppButton>
          <AppButton
            status="error"
            className="flex-1"
            onClick={() => {
              appRouter.navigateTo("settlement", {
                query: {
                  list: [
                    {
                      id: info.id,
                      num: 1,
                    },
                  ],
                },
              });
            }}
          >
            立即购买
          </AppButton>
        </View>
      </View>
      <AppPopup title="购物车" {...popupControl}>
        <CartWareCardList />
      </AppPopup>
    </>
  );
};
