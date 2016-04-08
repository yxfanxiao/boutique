import express from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import webpackConfig from "../webpack.config"
import router from "./router"
import api from "./router/api"
import user from "./router/user"
import cart from "./router/cart"
import path from "path"
import favicon from "serve-favicon"
import config from "../config"
import mongoose from "mongoose"
import "./models"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session from "express-session"
import MongoStore from "connect-mongo"

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(favicon(path.join(__dirname, "public" , "assets" , "images" , "icon.ico")))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(config.cookieSecret))
const MS = MongoStore(session)
app.use(session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MS({
        mongooseConnection: mongoose.connection,
        ttl: 1 * 24 * 60 * 60                           // 1 day
    })
}))

// develpoment or production environment
app.set("dev", process.env.NODE_ENV !== "production")

// public images ? 之后在想hash的方案
// let assetsPath = `/asset/`
app.use(express.static(__dirname + "/public/"))
if (app.get("dev")) {
    // development
    const compiler = webpack(webpackConfig)
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        quiet: true,
        publicPath: webpackConfig.output.publicPath
    }))
    app.use(webpackHotMiddleware(compiler))
} else {
    // production
    app.set("hash", config.hash)
}

// Routers
app.use("/v1", api)
app.use("/user", user)
app.use("/cart", cart)
app.use("/", router)

export default app