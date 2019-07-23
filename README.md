# squareGame
## 环境配置
1. 安装 webpack&webpack-cli
2. 安装html-webpack-plugin
3. 安装clean-webpack-plugin
4. 安装webpack-dev-server
5. 安装ts的相关loader
> ts-loader     依赖typescript，所以安装typescript-D
> rules: [
            {test: /\.ts$/, loader: "ts-loader"}
        ]
> 报错，tsconfig.json empty             tsc --init      创建tsconfig文件