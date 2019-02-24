//依赖
const path = require('path');
require("@babel/polyfill");
//配置文件
const moduleConfig = require('./webpack_config/module.config.js');
const apiConfig = require('./webpack_config/api.config.js');


let pluginsConfig = null; //打包配置
let PATH = null;//打包路径配置
let ENTRY = {};//入口配置

pluginsConfig = require('./webpack_config/plugins.config.js');
PATH = path.resolve(__dirname, 'hcmweb');
ENTRY = {
    vendor: ['jquery','moment','react','react-dom'],
    index: ['@babel/polyfill','./app/js/index.js'],
    user: ['@babel/polyfill','./app/js/user.js'],
    wechat: ['@babel/polyfill','./app/js/wechat.js']
    
};
PORT = 8002;

console.log(process.env.PROJECT)
module.exports = {
    devtool: apiConfig.devtool,
    entry:ENTRY,
    output: {
        path: PATH,
        filename: apiConfig.outputFilename,
        chunkFilename: 'js/chunk/[name]_[chunkhash].js'
    },
    module: moduleConfig,
    plugins: pluginsConfig,
    devServer: {
        contentBase: path.resolve(__dirname, './app/'), //服务器根路径
        proxy: [{
            context: ["/code","/login_login","/hcm"],
            target: apiConfig.target,
            changeOrigin: true,
        }],
        disableHostCheck: apiConfig.disableHostCheck,
        hot: false,
        inline: false,
        host: apiConfig.host, //ip
        compress: true, // 服务端压缩
        port: PORT // 端口

        
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules\/(.*)\.js/,
                    chunks: 'all',
                    name: 'vendor',
                    enforce: true
                }
            }
        }
    }
}

