import request from "request"
import cheerio from "cheerio"
import { Category } from "../models"

function crawlSubCategory() {
    return new Promise((resolve, reject) => {
        Category.find({ isNav: true }, (err, navs) => {
            crawlNextCategory(resolve)
            function crawlNextCategory(cb) {
                const nextCategory = navs.pop()
                if (nextCategory) {
                    crawlGroup(nextCategory.categoryId).then(() => {
                        crawlNextCategory(cb)
                    })
                } else {
                    if (typeof(cb) === "function") {
                        cb()
                    }
                }
            }
        })
    })
}

function crawlGroup(categoryId) {
    return new Promise((resolve, reject) => {
        request(`http://you.163.com/item/list?categoryId=${categoryId}`, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                throw new Error("The lovely crawler crashed!")
            }
            const $ = cheerio.load(body)
            const subCategoryIds = [] ,
                categorySrc = $(".w-cateBanner").css("background-image"),
                categoryDesc = $(".w-cateBanner h2").text()

            $(".m-items").each((i, element) => {
                const $e = $(element)
                const categoryId = $e.attr("id"),
                    title = $e.find(".name.f-left").text(),
                    desc = $e.find(".hd .desc").text(),
                    icon = $e.find(".icon").attr("src")
                subCategoryIds.push(categoryId)
                const category = new Category()
                Object.assign(category, {
                    categoryId,
                    title,
                    desc,
                    icon
                })
                category.save()
            })
            Category.update(
                { categoryId: categoryId }, 
                {
                    $set: { 
                        subCategoryId: subCategoryIds,
                        src: categorySrc,
                        desc: categoryDesc
                    }
                })    
            resolve()
        })
    })    
}


export default crawlSubCategory