import { PayResult } from "@/client";
import { appToast } from ".";

const getPayParams = (payData: PayResult) => {
  const params = {
    appId: payData.app_id, //公众号ID，由商户传入
    timeStamp: payData.time_stamp, //时间戳，自1970年以来的秒数
    nonceStr: payData.nonce_str, //随机串
    package: payData.package,
    signType: payData.sign_type, //微信签名方式：
    paySign: payData.pay_sign, //微信签名
  };
  return params;
};

export const orderPayByMiniApp = (payData: PayResult) => {
  const seachParams = new URLSearchParams({
    urlData: JSON.stringify(getPayParams(payData)),
  });
  const queryStr = seachParams.toString();
  wx.miniProgram.navigateTo({
    url: `/pages/payPage/payPage?${queryStr}`,
  });
};

export const orderPay = async (
  payData: PayResult,
  options?: {
    success?: () => void;
    fail?: () => void;
  },
) => {
  const { success, fail } = options || {};
  const params = getPayParams(payData);
  wx.miniProgram.getEnv((getEnvRes) => {
    if (getEnvRes.miniprogram) {
      orderPayByMiniApp(payData);
    } else {
      try {
        WeixinJSBridge.invoke(
          "getBrandWCPayRequest",
          params,
          // @ts-ignore
          (getBrandWCPayRequestRes: any) => {
            if (
              getBrandWCPayRequestRes.err_msg == "get_brand_wcpay_request:ok"
            ) {
              success?.();
              return;
            }
            console.error("支付失败", getBrandWCPayRequestRes);
            appToast.error("支付失败");
            fail?.();
          },
        );
      } catch (error) {
        appToast.error("支付失败");
        throw new Error(error.message);
      }
    }
  });
};
