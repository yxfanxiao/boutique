import express from "express";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import webpackConfig from "../webpack.config";
import router from "./router";
import path from "path";
import favicon from "serve-favicon";
import hash from "../config/hash";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(favicon(path.join(__dirname, "public" , "assets" , "images" , "icon.ico")));

// develpoment or production environment
app.set("dev", process.env.NODE_ENV !== "production");

// public images ? 之后在想hash的方案
// let assetsPath = `/asset/`;
app.use(express.static(__dirname + "/public/"));
if (app.get("dev")) {
    // development
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler));
} else {
    // production
    // assetsPath += hash.hash;
    // app.use(assetsPath, express.static(__dirname)+ "/public/"));
}

// Routers
app.use(router);

export default app;