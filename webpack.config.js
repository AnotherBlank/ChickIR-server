const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'production', // 或 'development'
    entry: './app.js', // 入口文件
    target: 'node', // 目标平台为 Node.js
    output: {
        path: path.resolve(__dirname, 'dist'), // 输出目录
        filename: 'bundle.js', // 输出文件名
    },
    externals: [nodeExternals()], // 排除 node_modules
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader', // 如果你使用 Babel 转换代码
                },
            },
        ],
    },
};