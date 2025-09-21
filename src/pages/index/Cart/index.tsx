import { AppButton, BasePage } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { useAppUserStore } from "@/stores";
import { isIOS } from "@/utils";
import { createOrder } from "@/utils/order";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";

export const Cart = () => {
  const appUserStore = useAppUserStore();
  const { cartInfo } = appUserStore;
  return (
    <BasePage>
      <View className="pt-[24px] pb-[300px]">
        <View className="px-[24px]">
          <CartWareCardList data={cartInfo.itemList} />
        </View>
      </View>
      <View
        className={classNames("fixed bottom-[150px] left-0 right-0 px-[24px]", {
          "bottom-[182px]": isIOS(),
        })}
      >
        <View className="bg-blur app-shadow rounded-full p-[16px] flex">
          <View className="flex-4 flex items-center px-[32px]">
            <View className="flex-center gap-[8px]">
              <Text className="text-[32px]">合计</Text>
              <Text className="text-[32px] font-semibold">
                ￥{appUserStore.totalPrice}
              </Text>
            </View>
          </View>
          <AppButton
            className="flex-1"
            round
            status="error"
            onClick={() => {
              createOrder({
                cartId: appUserStore.cartInfo?.id!,
                addressId: appUserStore.defaultAddress?.id!,
                itemList: cartInfo.itemList,
              });
            }}
          >
            去结算
          </AppButton>
        </View>
      </View>
    </BasePage>
  );
};
