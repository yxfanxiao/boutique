import { Product } from "../models"

export async function productByCategory(categoryId, quantity, selectAll, cb) {
    return Product
        .find({ categoryId })
        .limit(quantity ? quantity: null)
        .select(selectAll ? null: "spuId desc name skuList")
        .exec(cb)
}

export async function productIdByCategory(categoryId, quantity, param, cb) {
    return Product
        .find({ categoryId })
        .limit(quantity ? quantity: null)
        .select("spuId")
        .exec(cb)
}

export async function recommendProductByCategory(subCategoryId, limit = 8) {
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

export async function productListByCategory(subCategoryId) {
    return Product
        .find({ 
            categoryId: {
                $in: subCategoryId
            }
        })
        .select("spuId desc name skuList src")
}

export async function productBySpuIds(spuIds) {
    return Product
        .find({ 
            spuId: {
                $in: spuIds
            } 
        })
        .select("spuId desc name skuList src")
}


export async function productBySpuId(spuId) {
    return Product.findOne({ spuId })
}
