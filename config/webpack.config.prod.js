const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const PreloadWebpackPlugin = require("preload-webpack-plugin");
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const paths = require("./paths");
const baseConfig = require("./webpack.config.base");

const bundleEntries = [
  // App entry point
  paths.appIndexJs
];

const pathsToClean = [
  // Removes all files in 'build' folder
  "build/**.*"
];

const plugins = [
  // new BundleAnalyzerPlugin(),
  new ProgressBarPlugin(),
  /**
   * Prevent generation of modules for `import` or `require` calls
   */
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  new webpack.IgnorePlugin(/webpack-stats\.json$/),
  new webpack.IgnorePlugin(/redux-logger/),
  /**
   * This plugin to remove/clean your build folder(s) before building.
   * @link https://github.com/johnagan/clean-webpack-plugin
   */
  new CleanWebpackPlugin(pathsToClean, {
    root: paths.appRoot
  }),
  /**
   * assign the module and chunk ids by occurrence count,
   * Ids that are used often get lower (shorter) ids.
   */
  new webpack.optimize.OccurrenceOrderPlugin(),
  /**
   * This plugin will cause hashes to be based on the relative path of the module,
   * generating a four character string as the module id. Suggested for production.
   */
  new webpack.HashedModuleIdsPlugin(),
  /**
   * This plugin provides an opt-in feature that creates a separate file
   * (known as a chunk)
   * @description https://webpack.js.org/plugins/commons-chunk-plugin/
   */
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
    filename: "static/js/[name].[chunkhash:8].js"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: "runtime"
  }),
  new webpack.optimize.CommonsChunkPlugin({
    async: true,
    children: true,
    minChunks: 3
  }),
  /**
   * UglifyJS plugin for webpack
   * @description https://webpack.js.org/plugins/uglifyjs-webpack-plugin/
   */
  new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    mangle: true,
    debug: false,
    minimize: true,
    compress: {
      drop_console: true,
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      if_return: true,
      join_vars: true
    },
    sourceMap: true
  }),
  /**
   * This plugin create HTML file to serve your webpack bundles, especially useful
   * for webpack bundles that include a hash in the filename which changes every compilation
   * @link https://github.com/jantimon/html-webpack-plugin
   * @description https://webpack.js.org/plugins/html-webpack-plugin/
   */
  new HtmlWebpackPlugin({
    template: paths.appIndexHtml,
    PRODUCTION: process.env.NODE_ENV,
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  }),
  /**
   * This plugin automatically wiring up asynchronous (and other types) of
   * JavaScript chunks using <link rel='preload'>. This helps with lazy-loading.
   * @link https://github.com/GoogleChrome/preload-webpack-plugin
   */
  new PreloadWebpackPlugin({
    rel: "preload",
    as: "script",
    include: ["vendor", "bundle", "runtime"],
    fileBlacklist: [/\.map/, /styles/]
  }),
  /**
   * Copies individual files or entire directories to the build directory.
   * @link https://github.com/webpack-contrib/copy-webpack-plugin
   */
  new CopyWebpackPlugin([{
    from: path.join(paths.appPublic, "/icons"),
    to: path.join(paths.appBuild, "/icons")
  }])
];

module.exports = {
  devtool: "source-map",
  context: baseConfig.context,
  entry: {
    bundle: bundleEntries,
    vendor: baseConfig.entry.vendor
  },
  output: {
    path: paths.appBuild,
    filename: "static/js/[name].[chunkhash:8].js",
    chunkFilename: "static/js/[name].[chunkhash:8].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.js[x]*$/,
        exclude: /node_modules/,
        loader: "eslint-loader",
      },
      {
        test: /\.(gif|png|jpg|jpeg\ttf|colored\.svg|eot|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[hash:8].[ext]",
            outputPath: "static/assets/"
          }
        }]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            query: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            }
          }
        ]
      }
    ]
  },
  resolve: baseConfig.resolve,
  plugins
};
