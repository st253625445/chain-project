module.exports = {
  baseUrl: "./", //vueConf.baseUrl, // 根域上下文目录
  outputDir: "dist", // 构建输出目录
  assetsDir: "static",
  devServer: {
    open:true,
    // 设置代理
    proxy: {
      "/api": {
        // 代理地址
        target: "http://tapi.d2k.io:8030/v3.0/industryChain/", // 需要代理的地址
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/api": "/" // 本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
        }
      }
    }
  }
};
