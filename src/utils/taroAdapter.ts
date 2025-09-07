import Taro, { eventCenter } from "@tarojs/taro";
import { AxiosAdapter, Method } from "axios";
import { isWeapp } from "../utils";

type Res = {
  data: any;
  status: number;
  headers: any;
  request: any;
  error?: {
    message: string;
    statusCode: number;
  } | null;
};
function settle(
  resolve: Function,
  reject: Function,
  res: Res,
  failed?: boolean,
) {
  if (!failed) {
    resolve(res);
  } else {
    reject(res);
  }
}

const taroAdapter: AxiosAdapter = (config) => {
  const { url, data, method, timeout, responseType } = config;
  return new Promise((resolve, reject) => {
    Taro.request({
      url: url || "",
      data,
      method,
      timeout,
      header: config.headers.toJSON(),
      responseType: isWeapp ? undefined : responseType,
      success: (res) => {
        const isSuccess = res.statusCode >= 200 && res.statusCode < 300;
        var response = {
          data: isSuccess ? res.data : null,
          error: isSuccess ? null : res.data,
          status: res.statusCode,
          config: config,
          request: null,
          headers: config.headers,
        };
        const isNotLoin = res.statusCode === 401;
        if (isNotLoin) {
          eventCenter.trigger("reLogin");
        }
        settle(resolve, reject, response, isSuccess);
      },
      fail: (res) => {
        var response = {
          ...res,
          config: config,
          data: null,
          error: {
            message: res.errMsg,
            statusCode: 400,
          },
          headers: config.headers,
          status: 400,
          request: null,
        };
        settle(resolve, reject, response, false);
      },
    });
  });
};

export default taroAdapter;
