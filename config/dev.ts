import type { UserConfigExport } from "@tarojs/cli";

export default (mode: string) => {
  const { API_PREFIX, PROXY_TARGET } = {
    test: {
      PROXY_TARGET: "https://chr.eh-med.com",
      API_PREFIX: "/zhfy",
    },
    prod: {
      PROXY_TARGET: "https://gt.eh-med.com",
      API_PREFIX: "/gt",
    },
  }[mode] as any;
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
