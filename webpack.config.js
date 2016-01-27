const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const fs = require("fs");

const devMode = process.env.NODE_ENV !== "production";

module.exports = {
    // the base directory (absolute path!) for resolving the entry option
    context: path.join(__dirname, "./client"),
    entry: {
        app: devMode
            ? ["webpack-hot-middleware/client", "./index"]
            : ["./index"],
        // extract the largest modules for cache
        vendor: [
            "react", "react-dom", 
            "redux", "react-redux", "redux-thunk", "redux-logger",
            "isomorphic-fetch",
            "classnames"
        ]
    },
    output: {
        // webpack will compile static assets here
        path: path.join(__dirname, "./server/public/assets/"),
        publicPath: "/assets/",
        filename: devMode 
            ? "[name].bundle.js"
            : "[name].bundle-[hash].js",
        // chunkFilename: non-entry chunks
        chunkFilename: "[id].bundle.js"
    },
    // will generate map file
    // could delete it when build?
    devtool: devMode ? "source-map" : "",
    resolve: {
        extensions: ["", ".js", ".jsx", ".less"]
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel" },
            { test: /\.less$/, loader: "style!css!less" },
            { test: /\.(png|jpg)$/, loader: "url?limit=8192" },
            { test: /\.json$/, loader: "json" }
        ]
    },
    plugins: devMode 
        ? [
            new webpack.ProvidePlugin({
                fetch: "isomorphic-fetch",
                classNames: "classnames"
            }),
            // extract common files
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity
            }),
            // hot module replace
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        ]
        : [
            new webpack.ProvidePlugin({
                fetch: "isomorphic-fetch",
                classNames: "classnames"
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "vendor",
                minChunks: Infinity
            }),
            // uglify
            new webpack.optimize.UglifyJsPlugin({
                compress: { warnings: false }
            }),
            // to hash
            function() {
                this.plugin("done", stats => {
                    fs.writeFileSync(
                        path.join(__dirname, "config/hash.json"),
                        JSON.stringify({
                            hash: stats.hash,
                            time: new Date().toString()
                        })
                    );
                })
            }
        ]
}