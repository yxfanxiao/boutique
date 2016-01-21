const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require("fs");

// const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    // the base directory (absolute path!) for resolving the entry option
    context: path.join(__dirname, "./client"),
    entry: {
        app: "./index",
        // extract the largest modules for cache
        vendor: [
            "react", "react-dom", 
            "redux", "react-redux", "redux-thunk", "redux-logger",
            "classnames"
        ]
    },
    output: {
        // webpack will compile static assets here
        path: path.join(__dirname, "./server/public/assets/"),
        // used to generate URIs
        // publicPath: "https://mycdn.com/assets/[hash]"
        publicPath: "/assets/",
        filename: "[name].bundle.js",
        // http://segmentfault.com/a/1190000002551952#articleHeader7
        // could generate hash
        // chunkFilename: "[chunkhash].bundle.js"
        // chunkFilename: non-entry chunks
        // 比如 require.ensure(...)异步加载模块的时候
        chunkFilename: "[id].bundle.js"
    },
    // will generate map file
    // could delete it when build?
    devtool: "source-map",
    resolve: {
        extensions: ["", ".js", ".jsx", ".less"]
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "babel" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.(png|jpg)$/, loader: "url?limit=8192" },
            { test: /\.json$/, loader: "json" }
        ]
    },
    plugins: [
        // use without import, a bad habit, not use
        new webpack.ProvidePlugin({
            // React: "react"
        }),
        // extract common files
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        // to hash..
        // 生成 HTML 时引用 stats.json 的数据
        // function() {
        //     this.plugin("done", stats => {
        //         fs.writeFileSync(
        //             path.join(__dirname, "stats.json"),
        //             JSON.stringify(stats.toJson())
        //         );
        //     })
        // }
    ]
}