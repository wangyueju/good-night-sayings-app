const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // https: true, // 开启https模式
    // 配置服务器代理
    proxy: {
      '/api': { // 匹配访问路径中含有 '/api' 的路径
        target: 'http://m.msckeji.com', // 测试地址、目标地址
        changeOrigin: true,
        // ws: true, // 是否开启 webSocket 代理
        pathRewrite: { // 请求路径重写
          '^/api': '',   //重写请求路径
        },
      },

      '/a': { // 匹配访问路径中含有 '/api' 的路径
        target: 'http://112.126.69.9', // 测试地址、目标地址
        changeOrigin: true,
        // ws: true, // 是否开启 webSocket 代理
        pathRewrite: { // 请求路径重写
          '^/a': '',   //重写请求路径
        },
      },

      '/xiaodu': { // 匹配访问路径中含有 '/api' 的路径
        target: 'http://api.peace-read.com', // 测试地址、目标地址
        changeOrigin: true,
        // ws: true, // 是否开启 webSocket 代理
        pathRewrite: { // 请求路径重写
          '^/xiaodu': '',   //重写请求路径
        },
      },

    }
  },

})
