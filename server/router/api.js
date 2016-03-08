import { Router } from "express";
import app from "../app";
import api from "../api";

const router = Router();

// api
// 以v1开头，如 /v1/products
router.get("/products", (req, res, next) => {
    api.findAllProducts((err, products) => {
        res.jsonp(products);
    })
})
router.get("/carousel", (req, res, next) => {
    const cb = req.query.callback;
    api.findAllCarousel((err, carousel) => {
        // cors: allow cross origin
        // res.set("Access-Control-Allow-Origin", "*")
        res.jsonp(carousel);
        // res.send(cb 
        //     ? `${cb}(${carousel})`
        //     : carousel)
    })
})

export default router;