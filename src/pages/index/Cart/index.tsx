import { postWxShopOrderPay } from "@/client";
import { AppButton, BasePage } from "@/components";
import { CartWareCardList } from "@/components/CartWareCard/SearchWareCardList";
import { appRouter } from "@/router";
import { useAppAuthStore, useAppUserStore } from "@/stores";
import { appLoading, appToast, isIOS } from "@/utils";
import { createOrder } from "@/utils/order";
import { View, Text } from "@tarojs/components";
import classNames from "classnames";
import { useEffect } from "react";

export const Cart = () => {
  const appUserStore = useAppUserStore();
  const appAuthStore = useAppAuthStore();
  const { cartInfo } = appUserStore;

  const handlePay = async () => {
    if (cartInfo.itemList.length === 0) {
      return;
    }
    try {
      appLoading.show("创建支付中...");
      const res = await createOrder({
        addressId: appUserStore.defaultAddress?.id!,
        cartId: cartInfo.id,
        itemList: cartInfo.itemList,
      });

      const payData = await postWxShopOrderPay({
        body: {
          orderNo: res.orderNo,
        },
      });
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: payData.data?.data.app_id, //公众号ID，由商户传入
          timeStamp: payData.data?.data.time_stamp, //时间戳，自1970年以来的秒数
          nonceStr: payData.data?.data.nonce_str, //随机串
          package: payData.data?.data.package,
          signType: payData.data?.data.sign_type, //微信签名方式：
          paySign: payData.data?.data.pay_sign, //微信签名
        },
        (res) => {
          console.log(res);
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            appRouter.navigateTo("payResult");
            // 使用以上方式判断前端返回,微信团队郑重提示：
            //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠，商户需进一步调用后端查单确认支付结果。
          }
        },
      );
    } catch {
      appToast.error("支付失败，请稍后再试");
    } finally {
      appLoading.hide();
    }
  };
  useEffect(() => {
    if (appAuthStore.isLogged) {
      appUserStore.updateCartInfo();
    }
  }, [appAuthStore.isLogged]);
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
