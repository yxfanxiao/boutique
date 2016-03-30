import { Router } from "express"
import app from "../app"

const router = Router()

router.post("/signUp", (req, res, next) => {
    const { name, pwd } = req.body
    res.send("ok")
})

export default router