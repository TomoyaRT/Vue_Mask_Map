const path = require('path');
const PurgecssPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  publicPath: './',
  css: {
    loaderOptions: {
      // 將 all.scss樣式檔案 引用到全域
      scss: {
        prependData: `@import "@/assets/scss/main.scss";`,
      },
    },
  },

  configureWebpack: {
    plugins: [
      // 將不必要的樣式，在編譯檔案時，一律清除。
      new PurgecssPlugin({
        paths: glob.sync(`${path.resolve(__dirname, "src")}/**/*`, {
          nodir: true,
        }),
      }),

      // 打包編譯後的檔案視覺化
      new BundleAnalyzerPlugin()
    ],
  },
};
