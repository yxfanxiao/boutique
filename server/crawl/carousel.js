import request from "request"
import cheerio from "cheerio"
import { Carousel } from "../models"

function crawlCarousel() {
    return new Promise((resolve, reject) => {
        request("http://you.163.com/", (error, response, body) => {
            if (error || response.statusCode !== 200) {
                throw new Error("The lovely crawler crashed when crawling carousel!")
            }
            const $ = cheerio.load(body)
            const $carousels = $(".f-imgCenterBanner")
            const carousels = []
            $carousels.each((i, c) => {
                const href = $($(c).children(".wrap")).attr("href"),
                    id = href.match(/id=\d+/)
                if (!id) {
                    return
                }
                const carousel = new Carousel()
                Object.assign(carousel, {
                    src: $($(c).find(".js-img")).attr("src"),
                    spuId: id[0]
                })
                carousel.save()
            })
            console.log("Crawl carousels successfully!")
            resolve()
        })   
    })
}

export default crawlCarousel