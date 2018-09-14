const webpack = require("webpack"); //
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 通过 npm 安装
const path = require("path");
const utils = require("../config/utils");

//获取所有入口文件配置
const entry_files = require("../config/entrys");
//获取输出配置
const base_plugin = require("../config/base.plugin");

function resolve(dir) {
  return path.join(__dirname, ".", dir);
}

module.exports = {
  entry: entry_files,
  output: {
    filename: "static/js/[name][hash].js",
    chunkFilename: "static/js/[id].chunk.js",
    path: path.join(__dirname, "../dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        include: [path.join(process.cwd(), "./src")]
      },
      {
        test: /\.css$/,
        // exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              config: {
                path: ".postcssrc.js"
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader",{
          loader: "postcss-loader",
          options: {
            config: {
              path: ".postcssrc.js"
            }
          }
        }, "less-loader"]
      },
      {
        test: /\.html$/,
        loader: "html-loader?attrs=img:src img:data-src"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("img/[name].[hash:7].[ext]")
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: utils.assetsPath("fonts/[name].[ext]")
        }
      }
    ]
  },
  plugins: [
    ...base_plugin,
    new MiniCssExtractPlugin({
      filename: "css/[name]-[contenthash:8].css",
      chunkFilename: "css/[id]-[contenthash:8].css"
    })
  ]
};
