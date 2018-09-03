const path = require('path');
var resolve = path.resolve;

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const Env = require('./config/env');
const env = Env.env;
const isProductEnv = Env.isProductEnv;

let hashType, publicPath;

if (isProductEnv) {
    hashType = 'chunkhash';
    publicPath = '';
} else {
    hashType = 'hash';
    publicPath = '';
}

module.exports = {
    entry: {
        app: './src/app.jsx',
        vendor: [   // 依赖的第三方库
            'react',
            'react-dom',
            'react-redux',
            'react-router-dom',
            'redux',
            'redux-logger',
            'redux-thunk',
            'redux-saga',
            'axios'
        ]
    },
    output: {
        path: resolve(__dirname, 'dist'),  // 打包后的目录，必须是绝对路径
        filename: env('[name].js', '[name].[' + hashType + '].js'),   // 打包后的文件名称，打包后会生成 index.js 和 vendor.js
        publicPath: publicPath + '/',
        chunkFilename: env('[name].js', '[name].[' + hashType + '].js')
    },
    // 省略文件后缀名
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            'asset': resolve(process.cwd(), './asset'),
            'common': resolve(process.cwd(), './src/common'),
			'component': resolve(process.cwd(), './src/component'),
			'container': resolve(process.cwd(), './src/container'),
			'constant': resolve(process.cwd(), './src/constant')
        }
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/i,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["env", "react", 'stage-0'],
                        plugins: [
                            "transform-runtime",
                            "react-hot-loader/babel"
                        ] // 热加载的一种选择方案
                    }
                },
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.css$/,
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },
            {
              test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
              use: ['file-loader?limit=1000&name=files/[md5:hash:base64:10].[ext]'],
            },
            {
                test: /\.(html|htm)$/,
                use:'html-withimg-loader'
            }
        ]
    },
    plugins: [
        // 提取 css
        new MiniCssExtractPlugin({
            filename: env('[name].css', '[name].[' + hashType + '].css'),
            chunkFilename: env('[name].css', '[name].[' + hashType + '].css')
        }),
        // 产出 HTML
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html'),   // 模板
            filename: 'index.html',  // 写入的文件，默认 index.html
            chunks: ['app', 'vendor', 'utils'],    // 代码块，由index 和 vendor 2个模块组合而成
            minify: {
                removeAttributeQuotes: true  //压缩 去掉引号
            }
        }),
        // 清空打包输出目录
        new CleanWebpackPlugin([path.join(__dirname, 'dist')])
    ]
};