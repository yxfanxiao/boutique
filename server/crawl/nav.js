import request from "request"
import cheerio from "cheerio"
import { Category } from "../models"

function crawlNav() {
    return new Promise((resolve, reject) => {
        request("http://you.163.com/", (error, response, body) => {
            if (error || response.statusCode !== 200) {
                throw new Error("The lovely crawler crashed!")
            }
            const $ = cheerio.load(body)

            const nav = $(".j-nav-item").children("a")
            const navs = [],
                hrefs = []
            for (let i = 0; i < nav.length; i++) {
                const categoryId = $(nav[i]).attr("href").match(/categoryId=\d+/)[0].substr(11)
                const title =  $(nav[i]).attr("title")
                const category = new Category()
                Object.assign(category, {
                    categoryId,
                    isNav: true,
                    title
                })
                category.save()
            }
            resolve()
        }) 
    })  
}

export default crawlNav