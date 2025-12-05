const webpack = require("webpack");
const { merge } = require("webpack-merge");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  optimization: {
    nodeEnv: "production",
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: { pure_funcs: ["console.log", "console.info"] },
          mangle: true,
          format: { comments: false }
        },
        extractComments: false
      })
    ]
  },
  performance: {
    hints: false,
  },
  output: {
    path: `${__dirname}/../build/js`,
    filename: "swiper.min.js",
    libraryTarget: "var",
    libraryExport: "default",
    library: "Swiper",
  },
  devtool: false,
  mode: "production",
  module: {
    rules: [
    ],
  },
  plugins: [
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
});
