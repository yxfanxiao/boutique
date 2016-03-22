import { Router } from "express"
import app from "../app"
import api from "../api"

const router = Router()

// api: 如/v1/products
// router.get("/products", (req, res, next) => {
//     api.findAllProducts((err, products) => {
//         res.jsonp(products)
//     })
// })

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
        const recommendProducts = await api.recommendProductByCategory(categoryId, subCategoryIds)
        categories[categoryId].recommendProducts = recommendProducts
    }
    res.jsonp(categories)
})

export default router