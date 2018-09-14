# 基于webpack4的多入口脚手架

非常简单的一个多入口配置，全自动，无需修改任何webpack配置，只需新建文件夹即可配置多入口


### 如何使用

npm install 

dev命令：
npm run start

test打包
npm run build:stg

prod打包
npm run build:prod

本地预览：localhost:8848/html_model.html


本地预览打包后文件说明，全局安装http-server  -p 端口 -P 代理端口

### 如何新建目录

需要新建一个入口？
直接在/src 目录下建立文件夹即可
文件夹必须包含：
index.html（模板HTML,用于打包构建）
index.js(此项目入口文件，此文件的依赖将会被全部打包)

### 按需加载

使用react-loadable按需加载，具体可看例子中的index.js文件中的使用方法

### 自适应

使用postcss-px2rem 插件，自动转化项目中 less 和 css 后缀文件中的px单位，根据.postcssrc的配置设置转化为对应比例，默认配置以设计图375*667标注尺寸为准，代码中按此规格标注大小直接编写px单位的值即可，由于字体单位为REM，因此会文字会随着屏幕大小自动缩放，如果要固定文字或者元素大小要使用大写的"PX"单位,这样就会被过滤掉不会被编译成rem单位；

同时使用amfe-flexible库,自动配置viewport缩放，和根节点字号大小（淘宝成熟的方案）


### 遗留问题
打包输出应该是什么样的结构？

打包输出后想要本地预览  目前利用 http-server -p 8888 -P [你要反向代理的地址(proxyUrl)]
目前还没有完成自动化的本地预览，这个功能待实现，目前需要全局安装http-server

开发环境下不同的项目要有不同的反向代理地址，目前统一在devsever中配置，如何应对不同项目接口地址不同的需求！

在使用react框架开发时，为了兼容魅族华为等机型的原生浏览器（主要是react项目白屏问题），需要引用bebel-polyfill， polyfill 构建并 uglify 后的大小为 98k，gzip 后为32.6k，32k 对与移动端还是有点大的，因为有些项目不需要兼容所有机型原生浏览器，所以目前解决方案是在入口文件index.js头部引用

脚手架结构还需优化

内联样式无法被自动转化rem

没有加入flux架构

实现命令行功能添加一个基础项目到src

### 解决问题

import对象时 路径不能超过src目录范围外，原因未知！！！！！！！！！！！！！！！！
//已解决，原因在webpack打包配置中关于.JS文件的编译范围 include: [path.join(process.cwd(), "./src")]中限制了在SRC目录内才会被编译，而之前引用的目录在src外。。'