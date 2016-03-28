import { Category } from "../models"
import api from "./index"

export async function productCategories(cb) {
    return Category.find({ isNav: true }, cb)
}

export async function productSubCategory(categoryId, cb) {
    return Category.findOne({ categoryId }, cb)
}

export async function recommendProductsOfAllCategories() {
    const cate = {}
    const categories = await productCategories()
    categories.forEach((category, i) => {
        Object.assign(cate, {
            [category.categoryId]: {
                title: category.title,
                subCategoryId: category.subCategoryId
            }
        })
    })
    return new Promise((resolve, reject) => {
        resolve(cate)
    })
}

export async function list(categoryId) {
    const cate = {}
    const category = await productSubCategory(categoryId)

    for (let categoryId of category.subCategoryId) {
        const subCategory = await productSubCategory(categoryId)
        const products = await api.productIdByCategory(categoryId)
        Object.assign(cate, {
            [categoryId]: {
                title: subCategory.title,
                desc: subCategory.desc,
                products: products.map(product => product.spuId)
            }
        })
    }
    return new Promise((resolve, reject) => {
        resolve(cate)
    })
}