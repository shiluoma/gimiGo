/**
 * 开发环境webpack配置
 */
const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const baseConfig = require('./webpack.base.config');

const envName = 'development';

process.env.NODE_ENV = 'development';

console.log('process.env.NODE_ENV',process.env.NODE_ENV)


const config = { 
  ...baseConfig,
  mode: envName === 'development' ? 'development' : 'production',
};

config.plugins.push(new webpack.DefinePlugin({
  NODE_ENV: JSON.stringify(envName)
}));//暴露环境变量到项目中

config.devtool = 'cheap-module-source-map'; // 慢速，查错时用


// config.plugins.push(new webpack.HotModuleReplacementPlugin());
// config.plugins.push(new webpack.NamedModulesPlugin());

module.exports = config;
