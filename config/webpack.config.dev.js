const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");

const paths = require("./paths");
const baseConfig = require("./webpack.config.base");

const bundleEntries = [
  // Activate HMR for React
  "react-hot-loader/patch",

  // "webpack/hot/dev-server" - reloads when applying HMR fails
  // "webpack/hot/only-dev-server" - doesn't reload when applying HMR fails
  "webpack/hot/only-dev-server",

  // App entry point
  paths.appIndexJs
];

module.exports = {
  devtool: "cheap-module-eval-source-map",
  context: paths.appSrc,
  entry: {
    bundle: bundleEntries,
    vendor: baseConfig.entry.vendor
  },
  output: {
    path: paths.appPublic,
    pathinfo: true,
    filename: "[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.(js[x]*|[s]*css)$/,
        use: ["source-map-loader"]
      },
      {
        enforce: "pre",
        test: /\.js[x]*$/,
        exclude: /node_modules/,
        loader: "eslint-loader"
      },
      {
        test: /\.(gif|png|jpg|svg|jpeg\ttf|colored\.svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: "file-loader"
      },
      {
        test: /\.(js[x]*)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          query: {
            // This is a feature of "babel-loader" for webpack (not Babel itself).
            // It enables caching results in ./node_modules/.cache/babel-loader/
            // directory for faster rebuilds.
            cacheDirectory: true
          }
        }
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins: [
    new ProgressBarPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HtmlWebpackPlugin({
      template: paths.appIndexHtml,
      inject: true
    }),
    new CopyWebpackPlugin([
      { from: paths.appPublic }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      // if omitted default value is 3
      minChunks: Infinity,
      filename: "vendor.js"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "runtime"
    }),
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      children: true
    })
  ],
  devServer: {
    contentBase: paths.appSrc,
    disableHostCheck: true,
    overlay: true,
    historyApiFallback: true,
    port: 3000,
    hot: true,
    stats: "minimal",
    inline: true,
    compress: false,
    noInfo: false
  }
};
