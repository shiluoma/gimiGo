const webpack = require('webpack');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);

//html页面 pagesArray
let pagesArray = require('./htmlPages');
let base_plugin = [
  new CleanWebpackPlugin([ path.resolve(__dirname,'../dist')], {
    root: path.resolve(__dirname, '../'),    
    verbose: true,
    dry: false,
  }),
]
/*遍历页面，添加配置*/
pagesArray.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    template: page.template,
    filename: page.filename,
    chunks: ['vendors', page.chuckName],
    favicon:page.favicon,
    // hash:true,
    minify: {
      removeComments: true,
      collapseWhitespace: false //删除空白符与换行符
    }
  });
  base_plugin.push(htmlPlugin)
})

module.exports = base_plugin;