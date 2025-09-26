import type { UserConfigExport } from "@tarojs/cli";

const prod: UserConfigExport<"vite"> = {
  mini: {},
  h5: {
    // 确保产物为 es5
    publicPath: "./",
    legacy: false,
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    output: {
      //   path: path.resolve(__dirname, "dist"),
    },

    webpackChain(chain) {
      console.log("chain", chain);
      chain.optimization.minimize(true);
      chain.optimization.nodeEnv("production");
      chain.optimization.splitChunks({
        chunks: "initial", // 仅拆分同步加载的代码（异步加载的代码不处理）
        hidePathInfo: true, // 隐藏路径信息（避免泄露文件结构）
        minSize: 0, // 允许拆分包的最小大小为 0（强制拆分小模块）
        cacheGroups: {
          // 自定义拆包规则
          default: false, // 禁用默认拆包规则
          defaultVendors: false, // 禁用默认的 `node_modules` 拆包规则
          // 自定义公共模块组
          common: {
            name: false, // 自动生成名称
            minChunks: 2, // 被 2 个及以上 Chunk 引用的模块
            priority: 1, // 优先级较低
          },
          // 自定义第三方库组
          vendors: {
            name: false,
            minChunks: 2, // 被 2 个及以上 Chunk 引用的第三方库
            test: (module) => /[\\/]node_modules[\\/]/.test(module.resource),
            priority: 10, // 优先级高于 common
          },
          // Taro 框架专用组
          taro: {
            name: false,
            test: (module) => /@tarojs[\\/][a-z]+/.test(module.context),
            priority: 100, // 最高优先级（优先单独打包）
          },
        },
      });
      //   /**
      //    * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
      //    * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
      //    */
      chain
        .plugin("analyzer")
        .use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin, []);
      //   /**
      //    * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
      //    * @docs https://github.com/chrisvfritz/prerender-spa-plugin
      //    */
      //   const path = require('path')
      //   const Prerender = require('prerender-spa-plugin')
      //   const staticDir = path.join(__dirname, '..', 'dist')
      //   chain
      //     .plugin('prerender')
      //     .use(new Prerender({
      //       staticDir,
      //       routes: [ '/pages/index/index' ],
      //       postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
      //     }))
    },
  },
} satisfies UserConfigExport<"vite">;

export default prod;
