import { PayResult } from "@/client";
import { appToast } from ".";

export const orderPayByWx = async (
  payData: PayResult,
  options?: {
    success?: () => void;
    fail?: () => void;
  },
) => {
  const { success, fail } = options || {};

  try {
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      {
        appId: payData.app_id, //公众号ID，由商户传入
        timeStamp: payData.time_stamp, //时间戳，自1970年以来的秒数
        nonceStr: payData.nonce_str, //随机串
        package: payData.package,
        signType: payData.sign_type, //微信签名方式：
        paySign: payData.pay_sign, //微信签名
      },
      // @ts-ignore
      (res: any) => {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          success?.();
          return;
        }
        appToast.error("支付失败");
        fail?.();
      },
    );
  } catch (error) {
    appToast.error("支付失败");
    throw new Error(error.message);
  }
};
