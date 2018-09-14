const webpack = require("webpack");
const webpackDevServer = require("webpack-dev-server");
const opn = require("opn");
const config = require("./webpack.dev.config.js");
const path = require("path");


Object.keys(config.entry).map((key)=>{
  config.entry[key].unshift('webpack/hot/only-dev-server');
  config.entry[key].unshift(`webpack-dev-server/client?http://localhost:8848`);
})

config.plugins.push(new webpack.HotModuleReplacementPlugin());

let options = {
  contentBase: path.join("../dist"),
  publicPath: "/",
  host: 'localhost',
  hot: true,
  inline: true,
  stats: {
    colors: true // 用颜色标识
  },
  proxy: {
    "/api": {
      target: "http://jimigoapi.suermen.com",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }
  }
};

// webpackDevServer.addDevServerEntrypoints(config, options);
const compiler = webpack(config);

const server = new webpackDevServer(compiler, options);

let prot = 8848;
opn("http://127.0.0.1:" + prot + "/html_model.html");
server.listen(prot);
