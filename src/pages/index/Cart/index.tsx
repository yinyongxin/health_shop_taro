import { postWxShopOrderPay } from "@/client";
import { AppButton, BasePage } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { useAppUserStore } from "@/stores";
import { appLoading, appToast, isIOS } from "@/utils";
import { createOrder } from "@/utils/order";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useEffect } from "react";

export const Cart = () => {
  const appUserStore = useAppUserStore();
  const { cartInfo } = appUserStore;

  const handlePay = async () => {
    if (cartInfo.itemList.length === 0) {
      return;
    }
    try {
      appLoading.show("创建支付中...");
      const createOrderRes = await createOrder({
        addressId: appUserStore.defaultAddress?.id!,
        cartId: cartInfo.id,
        itemList: cartInfo.itemList,
      });
      appRouter.navigateTo("orderPay", {
        query: {
          orderNo: createOrderRes.orderNo,
        },
      });
      appLoading.hide();
    } catch {
      appToast.error("创建失败");
    } finally {
      appUserStore.updateCartInfo();
    }
  };
  useEffect(() => {
    appUserStore.updateCartInfo();
  }, []);
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
              handlePay();
            }}
          >
            去结算
          </AppButton>
        </View>
      </View>
    </BasePage>
  );
};
