import { Router } from "express"
import app from "../app"
import { Cart } from "../controllers"

const router = Router()

router.get("/", (req, res, next) => {
    Cart.getCart(req.query.name, (err, data) => {
        res.jsonp({
            status: 200,
            data: data
        })
    })
})

router.post("/", (req, res, next) => {
    Cart.addToCart(req.body)
        .then(() => {
            return res.jsonp({
                status: 200
            })
        }, (err) => {
            return res.jsonp({
                status: 202,
                err: "添加到购物车失败"
            })
        })
})

export default router