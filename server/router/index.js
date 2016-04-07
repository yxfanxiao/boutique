import { Router } from "express"
import app from "../app"

const router = Router()

router.get("/*", (req, res, next) => {
    // public assets hash
    const hash = app.get("hash") ? "-" + app.get("hash") : ""
    res.render("index", {
        hash
    })
})

export default router