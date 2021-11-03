const path = require('path');
const LodashWebpackPlugin = require('lodash-webpack-plugin');
const webpack = require('webpack');
const version = require('./package.json').version;

const { VUE_APP_TITLE, DEVSERVERPORT, NODE_ENV } = process.env;

const resolve = dir => path.join(__dirname, dir);
const DEV = NODE_ENV === 'development';
const themePath = resolve('./src/view/styles/theme.less');

module.exports = {
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: DEV,
  devServer: {
    port: Number(DEVSERVERPORT),
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },

  },

  configureWebpack: {
    name: VUE_APP_TITLE,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        resolve('src/view/styles/_variables.scss'),
        resolve('src/view/styles/_mixins.scss'),
      ],
    },
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            hack: `true; @import "${themePath}";`,
          },
        },
      },
    },
  },
  chainWebpack(config) {
    config.set('name', VUE_APP_TITLE);
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config
      .plugin('__VERSION__')
      .use(
        new webpack.DefinePlugin({
          __VERSION__: JSON.stringify(version),
        }),
      )
      .end();

    if (!DEV) {
      config
        .plugin('loadshReplace')
        .use(new LodashWebpackPlugin())
        .end();
    }

    config
      .plugin('ProvidePlugin')
      .use(
        new webpack.ProvidePlugin({
          _: 'lodash',
        }),
      )
      .end();

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/view/components/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/view/components/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    config.when(DEV, config => config.devtool('source-map'));

    config.when(!DEV, config => {
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial',
          },
          vantUI: {
            name: 'chunk-vantUI',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vant(.*)/,
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      config.optimization.runtimeChunk('single');
    });
  },
};
