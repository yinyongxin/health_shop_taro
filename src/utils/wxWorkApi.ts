import Taro from "@tarojs/taro";

type QyWxLoginSuccessResult = {
  code: string;
  errMsg: string;
};
export const qyWxLogin = () => {
  return new Promise<QyWxLoginSuccessResult>((resolve, reject) => {
    Taro.qy.login({
      success: (res) => {
        resolve(res);
        console.error("qy.login", res);
      },
      fail: (err) => {
        reject(err);
        console.error("qy.login", err);
      },
    });
  });
};
