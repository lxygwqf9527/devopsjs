const path = require('path');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');

function resolve(dir) {
  return path.join(__dirname, dir);
}
const isProd = process.env.NODE_ENV === 'production';

const { VueCDN, AxiosCDN, VueRouterCDN, VuexCDN } = require('./src/plugins/cdn');

const cdn = {
  css: [],
  js: [VueCDN, AxiosCDN, VueRouterCDN, VuexCDN],
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios'
  }
};

module.exports = {
  productionSourceMap: false,
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 部署应用包时的基本 URL， 用法和 webpack 本身的 output.publicPath 一致。
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: !isProd,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/styles/variables.scss";`
      }
    }
  },
  configureWebpack: {
    name: process.env.VUE_APP_BASE_NAME,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    externals: isProd ? cdn.externals : {}
  },
  chainWebpack(config) {
    // 设置svg
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();
  }
};
