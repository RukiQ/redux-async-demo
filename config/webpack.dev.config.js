const path = require('path');
const Env = require('./env');
const env = Env.env;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let hashType = 'hash';

module.exports = {
    devtool: 'source-map',
    devServer: {    // 配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, '../'),   // 开发服务运行时的文件根目录
        host: 'localhost',
        port: 3000,
        compress: true,  // 开发服务器是否启动gzip等压缩
        proxy: {
            '**/*.action': {
                // target: 'http://127.0.0.1:' + mockport,  // 如果起一个本地 mock 服务的话，可以通过 target 进行请求转发
                bypass: function(req, res, proxyOptions) {
                    if (req.url.indexOf('.action') !== -1) {
                        req.method = 'GET';
                        return '/mock/data' + req.url.replace('.action','.json');
                    }
                }
            }
        }
    }
};