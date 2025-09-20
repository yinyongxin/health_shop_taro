import { APP_ENV_CONFIG } from "@/common";
import type { UserConfigExport } from "@tarojs/cli";

export default {
  mini: {
    debugReact: true,
  },
  h5: {
    devServer: {
      proxy: {
        "/shopH5Api": {
          target: `https://testpay.eh-med.com/zhfy`,
          changeOrigin: true,
        },
      },
    },
  },
} satisfies UserConfigExport<"vite">;
