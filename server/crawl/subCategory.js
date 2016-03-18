import request from "request"
import cheerio from "cheerio"
import { Category } from "../models"


Category.find({ isNav: true }, (err, navs) => {
    navs.forEach((nav, i) => {
        crawlGroup(nav.categoryId)
    })
})

function crawlGroup(categoryId) {
    request(`http://you.163.com/item/list?categoryId=${categoryId}`, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            throw new Error("The lovely crawler crashed!")
        }
        const $ = cheerio.load(body)
        const subCategoryIds = [] 
        $(".m-items").each((i, element) => {
            console.log(i)
            const $e = $(element)
            const categoryId = $e.attr("id"),
                title = $e.find(".name.f-left").text(),
                desc = $e.find(".hd .desc").text()
            subCategoryIds.push(categoryId)
            const category = new Category()
            Object.assign(category, {
                categoryId,
                title,
                desc
            })
            category.save()
        })
        Category.update({ categoryId: categoryId }, { $set: { subCategoryId: subCategoryIds }})
    })    
}
