const path = require("path")

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve('./dist'),           // path.resolve绝对路径
        filename: "script/bundle.js"
    }
}