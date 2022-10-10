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
      }
    }
  },

})
