const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        publicPath: '/dist/', // 用来解决浏览器报错: Automatic publicPath is not supported in this browser
        filename: 'main.js',
        // path: "./dist/main.js" // The provided value "./dist/main.js" is not an absolute path!
        path: path.resolve(__dirname, 'dist'),
        // assetModuleFilename: 'img/[name].[hash:6][ext]', // 这里不用自己加后缀的'.' :-)

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
            {
                test: /\.(png|jpe?g|svg|gif)$/,
                type: 'asset/inline', // 处理成base64
            },
        ]
    }
}