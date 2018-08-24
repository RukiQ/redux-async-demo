/*
 * @Author: Ruth
 * @Date:   2018-08-24 15:48:23
 */

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const lessExtract = new ExtractTextPlugin('css/less.css');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // entry: './src/index.js',    // 入口文件
    // 1.写成数组的方式就可以打出多入口文件，不过这里打包后的文件都合成了一个
    // entry: ['./src/index.js', './src/login.js'],
    // 2.真正实现多入口和多出口需要写成对象的方式
    entry: {
        index: './src/index.js'
    },
    output: {
        // 1. filename: 'bundle.js',
        // 2. [name]就可以将出口文件名和入口文件名一一对应
        path: path.resolve(__dirname, 'dist'),  // 打包后的目录，必须是绝对路径
        filename: '[name].js',   // 打包后的文件名称，打包后会生成 index.js 和 vendor.js
    },
    // 省略文件后缀名
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {    // 别名
            'components': path.resolve(process.cwd(), './src/components')
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
                        plugins: ["react-hot-loader/babel"] // 热加载的一种选择方案
                    }
                },
                include: /src/,          // 只转化src目录下的js
                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
            },
            {
                test: /\.css$/,
                // loader:['style-loader','css-loader'] // 从右向左解析
                use: ExtractTextPlugin.extract({
                    use:'css-loader'
                })  //不再需要style-loader
            },
            {
                test: /\.less$/,
                use: lessExtract.extract({
                    use: ['css-loader','less-loader']
                })
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
    // 提取公共代码
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {   // 抽离第三方插件
                    test: /node_modules/,   // 指定是node_modules下的第三方包
                    chunks: 'initial',
                    name: 'vendor',  // 打包后的文件名，任意命名    
                    // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                    priority: 10
                },
                utils: { // 抽离自己写的公共代码，utils这个名字可以随意起
                    chunks: 'initial',
                    name: 'utils',  // 任意命名
                    minSize: 0    // 只要超出0字节就生成一个新包
                }
            }
        }
    },
    plugins: [
        // 产出 HTML
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html'),   // 模板
            filename:'index.html',  // 写入的文件，默认 index.html
            chunks: ['index', 'vendor', 'utils'],    // 代码块，由index 和 vendor 2个模块组合而成
            hash: true, // 防止缓存
            minify: {
                removeAttributeQuotes: true  //压缩 去掉引号
            }
        }),
        // 清空打包输出目录
        new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
        // 暴露全局变量
        /* new webpack.ProvidePlugin({
            '_': 'loadash'
        }) */
    ],
    devServer: {    // 配置此静态文件服务器，可以用来预览打包后项目
        contentBase: path.resolve(__dirname, 'dist'),   // 开发服务运行时的文件根目录
        host: 'localhost',
        port: 9000,
        compress: true  // 开发服务器是否启动gzip等压缩
    }
};