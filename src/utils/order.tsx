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

export const orderPayByMiniApp = (params: { orderNo: string }) => {
  const seachParams = new URLSearchParams({
    urlData: JSON.stringify({
      orderInfo: {
        orderNo: params.orderNo,
      },
    }),
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
  const invokeCallback = (getBrandWCPayRequestRes: { err_msg: string }) => {
    if (getBrandWCPayRequestRes.err_msg === "get_brand_wcpay_request:ok") {
      success?.();
      return;
    }
    console.error("支付失败", getBrandWCPayRequestRes);
    appToast.error("支付失败");
    fail?.();
  };
  try {
    WeixinJSBridge.invoke(
      "getBrandWCPayRequest",
      getPayParams(payData),
      invokeCallback,
    );
  } catch (error) {
    appToast.error("支付失败");
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("支付失败");
  }
};
