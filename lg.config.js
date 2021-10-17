const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    // watch: true,
    mode: 'development',
    devtool: false,
    entry: './src/index.js',
    output: {
        filename: 'js/main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    devServer:{
        hot: true, // 打开热更新
    },
    module: {
        rules: [
            {
                test: /\.css$/, // 用于匹配文件类型的正则表达式
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            esModule: false
                        }
                    },
                    'postcss-loader'
                ], // loader的执行顺序是从右到左, 从下到上, 先执行的loader会将处理结果传递给下一个loader
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'],
                /*
                * importLoaders 只对未解析的@imports 有效
                * 因此, 当将 postCSS 与 nextCSS(无 @import 解析器)一起使用时, 就需要设置 importLoaders
                * 但是在使用 sass/less 时, 它已经处理了 @import 语句, 因此不需要 importLoaders
                * */

            },
            // {
            //     test: /\.(png|jpe?g|svg|gif)$/,
            //     type: 'asset/resource', // 拷贝到指定路径
            //     generator: {
            //         filename: 'img/[name].[hash:6][ext]', // 指定对于当前指定文件资源打包输出的目录
            //     }
            // },
            // {
            //     test: /\.(png|jpe?g|svg|gif)$/,
            //     type: 'asset/inline', // 处理成base64
            // },
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:6][ext]'
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 400 * 1024 // 大于400KB则复制到目录, 否则编码为base64
                    }
                }
            },
            {
                test: /\.(ttf|woff2?)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name].[hash:5][ext]'
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/, // 防止将mode_modules中包含的语句也polyfill了
                use: [
                    'babel-loader',
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                title: "?",
                template: './public/index.html'
            }
        ),
        new DefinePlugin(
            {
                BASE_URL: '"./"', // 希望它以字符串的形式出现, 应该用引号包一层
            }
        ),
        new CopyPlugin({
            patterns: [
                {
                    from: './public',
                    // to:'', 可以不写, 默认指向webpack.output.path
                    globOptions: {
                        // 来自官网文档, Technically, this is **/* with a predefined context equal to the specified directory.
                        ignore: ['**/index.html']
                    }
                }
            ]
        })
    ]
}