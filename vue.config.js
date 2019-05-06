module.exports = {
  devServer: {
    open: true,
    // 设置代理
    proxy: {
      "/api": {
        // 代理地址
        target: "https://industrychaindev.knogen.com/", // 需要代理的地址
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/api": "/api" // 本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
        }
      }
    }
  }
};
