const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const outputPath = path.resolve(appDirectory, "dist");

module.exports = {
  bail: true,
  devtool: 'source-map',
  entry: {
    "elements": "./scss/elements.scss",
    "elementsNoPlain": "./scss/elementsNoPlain.scss"
  },
  output: {
    path: outputPath,
    filename: "[name].css"
  },
  resolve: {
    extensions: [".js", ".css", ".scss"]
  },
  module: {
    loaders: [
      {
        test: /\.(woff|woff2|ttf|eot|svg|png)(\?[a-z0-9]+)?$/,
        loader: "file-loader",
        options: {
          //TODO redirect to the entry.[name] path
          name: "[path][name].[hash:8].min.[ext]"
        }
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract(
          {
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  minimize: true,
                  sourceMap: true
                }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: () => [
                    autoprefixer()
                  ]
                }
              },
              "sass-loader"
            ]
          }
        )
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './_gh_pages/',
    inline: true,
    port: 8080
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].css"
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    })
  ]
};
