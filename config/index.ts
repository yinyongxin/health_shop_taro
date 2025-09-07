import { defineConfig, type UserConfigExport } from "@tarojs/cli";
import { UnifiedViteWeappTailwindcssPlugin } from "weapp-tailwindcss/vite";
import tailwindcss from "@tailwindcss/postcss";
import path from "path";
import devConfig from "./dev";
import prodConfig from "./prod";
// import tailwindcss from '@tailwindcss/vite'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<"vite">(async (merge, { command, mode }) => {
  console.log("command: ", command);
  console.log("mode: ", mode);
  // const { default: tailwindcss } = await import('@tailwindcss/vite')

  const baseConfig: UserConfigExport<"vite"> = {
    projectName: "患者管理",
    date: "2025-2-23",
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2,
    },
    alias: {
      "@/components": path.resolve(__dirname, "..", "src/components"),
      "@/utils": path.resolve(__dirname, "..", "src/utils"),
      "@/stores": path.resolve(__dirname, "..", "src/stores"),
      "@/options": path.resolve(__dirname, "..", "src/options"),
      "@/client": path.resolve(__dirname, "..", "src/client"),
      "@/common": path.resolve(__dirname, "..", "src/common"),
      "@/hooks": path.resolve(__dirname, "..", "src/hooks"),
      "@/pages": path.resolve(__dirname, "..", "src/pages"),
      "@/router": path.resolve(__dirname, "..", "src/router"),
    },
    sourceRoot: "src",
    outputRoot: "dist",
    plugins: ["@tarojs/plugin-platform-weapp-qy"],
    defineConstants: {},
    copy: {
      patterns: [],
      options: {},
    },
    framework: "react",
    compiler: {
      type: "vite",
      vitePlugins: [
        //  No "exports" main defined
        // tailwindcss(),
        {
          name: "postcss-config-loader-plugin",
          config(config) {
            // 加载 tailwindcss
            if (typeof config.css?.postcss === "object") {
              // @ts-ignore
              config.css?.postcss.plugins?.unshift(tailwindcss());
            }
          },
        },
        UnifiedViteWeappTailwindcssPlugin({
          rem2rpx: process.env.TARO_ENV === "weapp",
          // appType: 'taro'
        }),
      ],
    },
    mini: {
      enableSourceMap: false,
      postcss: {
        pxtransform: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    h5: {
      publicPath: "./",

      staticDirectory: "static",
      esnextModules: ["@taroify"],
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: "css/[name].[hash].css",
        chunkFilename: "css/[name].[chunkhash].css",
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {},
        },
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: "module", // 转换模式，取值为 global/module
            generateScopedName: "[name]__[local]___[hash:base64:5]",
          },
        },
      },
    },
    rn: {
      appName: "taroDemo",
      postcss: {
        cssModules: {
          enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        },
      },
    },
  };

  process.env.BROWSERSLIST_ENV = process.env.NODE_ENV;

  if (process.env.NODE_ENV === "development") {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig);
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig);
});
