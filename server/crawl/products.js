import request from "request"
import cheerio from "cheerio"

const URI = "/item/list?categoryId=1005000"

function crwalDetail(URI) {
    request(`http://you.163.com${URI}`, (error, response, body) => {
        if (error || response.statusCode !== 200) {
            throw new Error("The lovely crawler crashed!")
        }
        const $ = cheerio.load(body)        
        
        let $e = null;
        $(".m-items").each((i, element) => {
            $e = $(element)
            // console.log($e.attr("id"))
            // console.log($e.find(".hd .desc").text())

            // console.log($e.find(".bd .name a").attr("href"))
            // console.log($e.find(".bd .name a").attr("title"))
            // console.log($e.find(".bd .price").text())
            // console.log($e.find(".bd .desc").text())

        }) 
    })
}

crwalDetail(URI)

// export default crwalDetail
