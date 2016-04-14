import { Router } from "express"
import app from "../app"
import { Cart, Order, User } from "../controllers"

const router = Router()

router.get("/:name", async (req, res, next) => {
    const data = await Order.getOrder(req.params.name)
    const ids = [],
        list = {}
    data.map(d => {
        ids.push(...d.carts)
    })
    for (let i of ids) {
        list[i] = await Cart.findCartById(i)
    }
    res.jsonp({
        data,
        list
    })
})

export default router