import type { UserConfigExport } from "@tarojs/cli";

export default {
  mini: {
    debugReact: true,
  },
  h5: {
    devServer: {
      proxy: {
        "/zhfy": {
          target: `https://testpay.eh-med.com`,
          changeOrigin: true,
        },
      },
    },
  },
} satisfies UserConfigExport<"vite">;
