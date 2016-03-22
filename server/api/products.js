import { Product } from "../models"

export async function productByCategory(categoryId, quantity, cb) {
    return Product
        .find({ categoryId })
        .limit(quantity ? quantity: null)
        .select("spuId desc name skuList")
        .exec(cb)
}

export async function recommendProductByCategory(categoryId, subCategoryId, limit = 8) {
    return Product
        .find({ 
            categoryId: {
                $in: subCategoryId
            } 
        })
        // sort by date
        // .sort("-time")
        .select("spuId desc name skuList src")
        .limit(limit)
}