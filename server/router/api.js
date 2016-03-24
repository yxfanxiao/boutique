import { Router } from "express"
import app from "../app"
import api from "../api"

const router = Router()

// api: 如/v1/products

router.get("/nav", (req, res, next) => {
    api.productCategories((err, nav) => {
        res.jsonp(nav)
    })
})

router.get("/carousel", (req, res, next) => {
    api.displayCarousel((err, carousel) => {
        res.jsonp(carousel)
    })
})

router.get("/productList", async (req, res, next) => {
    const categories = await api.recommendProductsOfAllCategories()
    for (let categoryId in categories) {
        const subCategoryIds = categories[categoryId].subCategoryId
        const recommendProducts = await api.recommendProductByCategory(subCategoryIds)
        categories[categoryId].recommendProducts = recommendProducts
    }
    res.jsonp(categories)
})

router.get("/list/:categoryId", async (req, res, next) => {
    const categoryId = req.params.categoryId
    const list = await api.list(categoryId)
    const productsId = []
    for (let subCategory in list) {
        productsId.push(...list[subCategory].products)
    }
    const products = await api.productBySpuIds(productsId)
    const p = {}
    products.map((product, i) => {
        Object.assign(p, {
            [product.spuId]: product
        })
    })
    res.jsonp({
        list,
        products: p
    })
})

router.get("/product/:spuId", async (req, res, next) => {
    const spuId = req.params.spuId
    const product = await api.productBySpuId(spuId)
    res.jsonp(product)
})



export default router