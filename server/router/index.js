import { Router } from "express"
import app from "../app"

const router = Router()

router.get("/*", (req, res, next) => {
    // use /* to match the SPA except api
    if (req.params[0].substr(0, 3) === "v1/") {
        next()
        return
    }
    if (req.params[0].substr(0, 5) === "user/") {
        next()
        return
    }
    // public assets hash
    const hash = app.get("hash") ? "-" + app.get("hash") : ""
    res.render("index", {
        hash
    })
})

export default router