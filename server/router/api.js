import { Router } from "express"
import app from "../app"
import api from "../api"
import { Product, Category } from "../models"

const router = Router()

// api: 如/v1/products

router.get("/nav", async (req, res, next) => {
    const nav = await api.productCategories()
    res.jsonp(nav)
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

router.delete("/product/:spuId", async (req, res, next) => {
    const spuId = req.params.spuId
    const product = await api.productBySpuId(spuId)
    Product.remove({spuId: spuId}, (err, result) => {
        if (err) {
            return res.jsonp({
                status: 202
            })
        }
        Category.update({categoryId: product.navId}, { $pull: { subCategoryId: spuId}}, (err, result) => {
            if (err) {
                return res.jsonp({
                    status: 202
                })
            }
            else {
                return res.jsonp({
                    status: 200
                })
            }
         })
    })
})

router.post("/product", (req, res, next) => {
    const { navId, cateId, title, desc, price, sku, thumb } = req.body

    const product  = new Product()
    const rd1 = random(),
        rd2 = random(),
        rd3 = random(),
        rd4 = random()

    Object.assign(product, {
        spuId: rd1,
        categoryId: cateId,
        navId,
        src: thumb.split(";"),
        name: title,
        desc,
        attributes: [],
        skuList: [{
            retailPrice: price,
            itemSkuSpecValueList: [
                {
                    skuSpecValueId:  rd2,
                    skuSpecValue: {
                        value: sku,
                        skuSpecId: rd3,
                        id: rd2, 
                    },
                    skuSpecId: rd3,
                    skuSpec: {
                        type: 0,
                        skuSpecValueList: [],
                        name: "规格",
                        id: rd3,
                    },
                    skuId: rd4,
                    id: rd2,
                }
            ]
        }],
        skuMap: {
            [rd2]: {
                retailPrice: price,
                itemSkuSprcValueList: [{
                    skuSpecValue: {
                        value: sku,
                        skuSpecId: rd3,
                        id: rd2, 
                    },
                    skuSpecId: rd3,
                    skuSpec: {
                        type: 0,
                        skuSpecValueList: [],
                        name: "规格",
                        id: rd3,
                    },
                    skuId: rd4,
                    id: rd2,
                }],
                id: rd4,
            }
        },
        skuSpecList: [{
            type: 0,
            skuSpecValueList: [{
                value: sku,
                skuSpecId: rd3,
                id: rd2, 
            }],
            name: "规格",
            id: rd3,
        }],
    })
    product.save((err, result) => {
        if (err) {
            console.log("save product occurs error!")  
            return res.jsonp({
                status: 202,
            })
        }

        Category.update({ categoryId: navId }, { $push: { subCategoryId: cateId }}, (err, result) => {
            if (err) {
                console.log("update product occurs error!")  
                return res.jsonp({
                    status: 202,
                })
            }  
            return res.jsonp({
                status: 200,
            })
        })
    })

})

function random() {
    return ~~(Math.random() * 10000000) + ""
}


router.get("/cate/:categoryId", async (req, res, next) => {
    const { categoryId } = req.params
    Product.find({categoryId}, (err, data) => {
        if (err) {
            return res.jsonp({
                status: 202
            })
        }
        return res.jsonp({
            status: 200,
            data
        })
    })
})

export default router

