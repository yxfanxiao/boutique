import { Router } from "express"
import app from "../app"
import { User } from "../controllers"

const router = Router()

router.post("/signUp", (req, res, next) => {
    const { name, pwd} = req.body 

    User.signUp(name, pwd)
        .then((user) => {
            return res.jsonp({
                status: 200,
                data: user
            })
        }, () => {
            return res.jsonp({
                status: 202,
                err: "注册失败"
            })
            
        })
})

router.post("/logIn", (req, res, next) => {
    const { name, pwd } = req.body

    User.logIn(name)
        .then((user) => {
            if (!user) {
                return res.jsonp({
                    status: 202,
                    err: "该用户名还未被注册"
                })
            }
            if (user.pwd === pwd) {
                return res.jsonp({
                    status: 200,
                    user: user
                })
            } else {
                return res.jsonp({
                    status: 202,
                    err: "密码错误"
                })
            }
        })
})

router.post("/reCharge", (req, res, next) => {
    const { name } = req.body

    User.reCharge(name, 100, () => {
         User.findUserByName(name, (err, user) => {
             if (err) {
                return res.jsonp({
                    status: 202,
                    err: "充值失败"
                })
             }
            return res.jsonp({
                status: 200,
                user: user
            })
        })
    })        
})


export default router