import { Category } from "../models"

export async function productCategories(cb) {
    return Category.find({ isNav: true }, cb)
}

export async function productSubCategories(categoryId, cb) {
    return Category.find({ categoryId }, cb)
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