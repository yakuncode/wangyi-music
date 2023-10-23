const path = require('path');
// const webpack = require('webpack');  // 引入 webpack
module.exports = {
  // 插件
  webpack: {
    // 配置别名
    alias: {
      // 约定：使用 @ 表示 src 文件所在路径
      "@": path.resolve(__dirname, "src"),
      // 约定：使用 @ 表示 src/components 文件所在路径
      "@comp": path.resolve(__dirname, "src", "components"),
    },
  }
}

