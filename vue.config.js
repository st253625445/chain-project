module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();
    // 添加要替换的 loader
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      });
  },
  devServer: {
    // 设置代理
    proxy: {
      "/api": {
        // 代理地址
        target: "https://dev.knogen.com/", // 需要代理的地址
        changeOrigin: true, // 是否跨域
        secure: false,
        pathRewrite: {
          "^/api": "/api" // 本身的接口地址没有 '/api' 这种通用前缀，所以要rewrite，如果本身有则去掉
        }
      }
    }
  }
};
