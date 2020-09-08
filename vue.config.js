const path = require('path');

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      }
    }
  },

  chainWebpack(config) {
    // 非开发环境
    config.when(process.env.NODE_ENV !== 'development', config => {
      // 代码切割
      config.optimization.splitChunks({
        chunks: 'all',
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial'
          },
          vue: {
            name: 'chunk-vue',
            priority: 20,
            test: /[\\/]node_modules[\\/]_?vue(.*)/
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'),
            minChunks: 3,
            priority: 5,
            reuseExistingChunk: true
          }
        }
      });
    })


    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/components/YDUI/packages/Icon'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/components/YDUI/packages/Icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
