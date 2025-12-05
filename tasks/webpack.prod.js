const webpack = require("webpack");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  optimization: {
    nodeEnv: "production",
    minimize: true,
    minimizer: [
      new (require('terser-webpack-plugin'))({
        terserOptions: {
          compress: { pure_funcs: ['console.log','console.info'] },
          mangle: true,           // manglar funktions-/variabelnamn
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
  optimization: {
    nodeEnv: "production",
    minimize: true,
    minimizer: [
      `...`,                     // behåller default TerserPlugin för JS
      new CssMinimizerPlugin(),  // detta minifierar CSS-filen
    ],
  },
});
