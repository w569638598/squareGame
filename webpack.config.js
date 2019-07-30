const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve('./dist'),           // path.resolve绝对路径
        filename: "script/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {test: /\.ts$/, 
                use: {
                    loader: "ts-loader",
                    options: {
                        transpileOnly: true  
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}
//resolve       解析的配置

//clean-webpack-plugin    清除历史打包文件
//webpack-dev-server       开发环境服务器
//