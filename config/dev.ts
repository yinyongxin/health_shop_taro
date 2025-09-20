import { APP_ENV_CONFIG } from "@/common";
import type { UserConfigExport } from "@tarojs/cli";

export default {
  mini: {
    debugReact: true,
  },
  h5: {
    devServer: {
      proxy: {
        "/wx": {
          target: `https://testpay.eh-med.com/zhfy`,
          changeOrigin: true,
        },
      },
    },
  },
} satisfies UserConfigExport<"vite">;
