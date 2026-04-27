import type { UserConfigExport } from "@tarojs/cli";
// @ts-ignore
import { APP_CONFIG_OPTION } from "./appConfig.ts";

export default (mode: string) => {
  const { API_PREFIX, PROXY_TARGET } = APP_CONFIG_OPTION[mode];
  console.log("APP_CONFIG_OPTION", APP_CONFIG_OPTION[mode]);
  return {
    mini: {
      debugReact: true,
    },
    h5: {
      devServer: {
        proxy: {
          [API_PREFIX]: {
            target: PROXY_TARGET,
            changeOrigin: true,
          },
        },
      },
    },
  } satisfies UserConfigExport<"vite">;
};
