import { ProductInfo } from "@/client";
import { AppButton, AppPopup } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { usePopupControl } from "@/hooks";
import { isIOS } from "@/utils";
import { View } from "@tarojs/components";
import classNames from "classnames";

type ActionsProps = {
  info: ProductInfo;
  handleBuy: () => void;
};

export const Actions = (props: ActionsProps) => {
  const { handleBuy } = props;
  const popupControl = usePopupControl();
  return (
    <>
      <View
        className={classNames(
          "fixed bottom-0 left-0 right-0 px-[24px] bg-blur flex app-shadow-lg",
          {
            "pb-[24px]": isIOS(),
          },
        )}
      >
        {/* <View className="flex-1 flex items-center justify-around">
          <View
            className="flex flex-col active:text-blue-500 items-center gap-1"
            onClick={() => {
              appToast.info("功能开发中");
            }}
          >
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
          </View> */}
        <View className="flex-3 flex gap-[16px] py-[24px]">
          <AppButton
            status="error"
            className="flex-3"
            onClick={() => {
              handleBuy();
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
