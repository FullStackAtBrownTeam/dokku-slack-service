const path = require("path");
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "build/js"),
        filename: "bundle.js"
    },
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }
            }
        ]
    }
};