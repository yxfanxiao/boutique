import { Router } from "express"
import app from "../app"
import { Cart, Order, User } from "../controllers"

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

router.delete("/:id", (req, res, next) => {
    Cart.deleteCart(req.params.id)
        .then(() => {
            return res.jsonp({
                status: 200
            })
        }, (err) => {
            return res.jsonp({
                status: 202,
                err: "删除失败"
            })
        })
})

router.put("/:id", (req, res, next) => {
    Cart.modifyItemQuantity(req.params.id, req.body.quantity)
        .then(() => {
            return res.jsonp({
                status: 200
            })
        }, (err) => {
            return res.jsonp({
                status: 202,
                err: "增加失败"
            })
        })
})


router.post("/pay", (req, res, next) => {
    const { user, carts, balance } = req.body 
    Order.newOrder(user, carts)
        .then(Cart.boughtCart(carts), (a, b) => {
            console.log(a,b )
        })
        .then(User.updateAccount(user, balance))
        .then(() => {
            return res.jsonp({
                status: 200
            })
        }, () => {
            return res.jsonp({
                status: 202
            })
        })
})

export default router