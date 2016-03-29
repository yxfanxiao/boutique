import request from "request"
import cheerio from "cheerio"
import { Product } from "../models"
import { Category } from "../models"


function crawlProducts() {
    return new Promise((resolve, reject) => {
        const products = [] 

        Category.find({ isNav: true }, (err, navs) => {
            crawlNextCategory(() => {
                console.log("All products href has been crawled!!!")

                const len = products.length
                crawlNextProduct(resolve)
                function crawlNextProduct(cb) {
                    const product = products.pop()
                    if (product) {
                        crawlProductDetail(product).then(() => {
                            crawlNextProduct(cb)
                        })
                    } else {
                        if (typeof(cb) === "function") {
                            cb()
                            console.log(`The strong crawler has completed ${len} tasks!`)
                        }
                    }
                }
            })

            function crawlNextCategory(cb) {
                const nextCategory = navs.pop()
                if (nextCategory) {
                    crawlAllProducts(nextCategory.categoryId).then(() => {
                        crawlNextCategory(cb)   
                    })
                } else {
                    if (typeof(cb) === "function") {
                        cb()
                    }
                }

            }
        })

        function crawlAllProducts(categoryId) {
            return new Promise((resolve, reject) => {
                request(`http://you.163.com/item/list?categoryId=${categoryId}`, (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        throw new Error("The lovely crawler crashed!")
                    }
                    const $ = cheerio.load(body)
                    $(".hd a").each((i, element) => {
                        const $e = $(element)
                        products.push({
                            categoryId,
                            href: $e.attr("href")
                        })
                    })
                    resolve()
                })    
            })
        }

        function crawlProductDetail(p) {
            const URI = p.href,
                categoryId = p.categoryId
            console.log(URI, categoryId)

            return new Promise((resolve, reject) => {
                request(`http://you.163.com${URI}`, (error, response, body) => {
                    if (error || response.statusCode !== 200) {
                        throw new Error(`The lovely crawler crashed when crawling ${URI}!`)
                    }
                    console.log(`The crawler is crwaling ${URI}`)

                    const $ = cheerio.load(body)        
                    let $e = null

                    try {
                        const data = JSON.parse(body.match(/json_Data.+\;/g)[0].replace(/^json_Data=/, "").replace(/;$/, ""))

                        const product = new Product()
                        const src = []
                        src.push(data.primaryPicUrl, data.itemDetail.picUrl1,
                             data.itemDetail.picUrl2, data.itemDetail.picUrl3, data.itemDetail.picUrl4)
                        Object.assign(product, {
                            spuId: data.id,
                            navId: categoryId,
                            categoryId: data.categoryList[1].id,
                            src,
                            detailHtml: data.itemDetail.detailHtml,
                            name: data.name,
                            desc: data.simpleDesc,
                            attributes: data.attrList,
                            skuList: data.skuList,
                            skuMap: data.skuMap,
                            skuSpecList: data.skuSpecList
                        })
                        product.save()
                    } catch (e) {
                        console.error(`When crawling ${URI}, the crawler die!`)
                    }
                    resolve()
                })
            })
        }        
    })
}

export default crawlProducts
