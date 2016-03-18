import request from "request"
import cheerio from "cheerio"
import { Product } from "../models"
import { Category } from "../models"


const products = [] 

Category.find({ isNav: true }, (err, navs) => {
    crawlNextCategory(() => {
        console.log("All products href has been crawled!!!")

        const len = products.length
        crawlNextProduct()
        function crawlNextProduct() {
            const productHref = products.pop()
            if (productHref) {
                crawlProductDetail(productHref).then(crawlNextProduct)
            } else {
                console.log(`The strong crawler has completed ${len} tasks!`)
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
                products.push($e.attr("href"))
            })
            resolve()
        })    
    })
}


// const promise = crawlProductDetail("/item/detail?id=1012005&_stat_area=mod_2_item_4&_stat_referer=itemList&_stat_id=1008000")
// const promise = crawlProductDetail("/item/detail?id=1019003&_stat_area=mod_2_item_1&_stat_referer=index")
// promise.then(() => {

// })

function crawlProductDetail(URI) {
    return new Promise((resolve, reject) => {
        request(`http://you.163.com${URI}`, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                throw new Error(`The lovely crawler crashed when crawling ${URI}!`)
            }
            console.log(`The crawler is crwaling ${URI}`)

            const $ = cheerio.load(body)        
            let $e = null

            // const spuId = URI.split(/&/g)[0].split(/=/)[1],
            //     categoryId = URI.split(/&/g)[3].split(/=/)[1],
            //     src = [],
            //     detailSrc = [],
            //     name = $(".info .intro .name").text(),
            //     desc = $(".info .intro .desc").text(),
            //     attributes = {},
            //     sku = {}
            // $(".list.j-sthumbs img").each((i, ele) => src.push($(ele).attr("src")))
            // $(".j-nav-html img").each((i, ele) => detailSrc.push($(ele).attr("src")))
            // $(".j-item").each((i, ele) => {
            //     const $e = $(ele)
            //     Object.assign(attribute, {
            //         name : $e.find(".name").text(),
            //         value: $e.find(".value").text()
            //     })
            // })

            // clear
            try {
                const data = JSON.parse(body.match(/json_Data.+\;/g)[0].replace(/^json_Data=/, "").replace(/;$/, ""))

                const product = new Product()
                const src = []
                src.push(data.primaryPicUrl, data.itemDetail.picUrl1,
                     data.itemDetail.picUrl2, data.itemDetail.picUrl3, data.itemDetail.picUrl4)
                Object.assign(product, {
                    spuId: data.id,
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

// export default crwalDetail
