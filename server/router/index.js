import { Router } from "express";
import app from "../app";
import api from "../api";

const router = Router();

router.get("/", (req, res, next) => {
    // public assets hash
    const hash = app.get("hash") ? "-" + app.get("hash") : "";
    res.render("index", {
        hash
    });
})



// api
router.get("/v1/products", (req, res, next) => {
    api.findAllProducts((err, products) => {
        res.send(products);
    })
})
router.get("/v1/carousel", (req, res, next) => {
    api.findAllCarousel((err, carousel) => {
        res.send(carousel);
    })
})

export default router;