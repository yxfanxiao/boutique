import request from "request"
import cheerio from "cheerio"

request("http://you.163.com/", (error, response, body) => {
    if (error || response.statusCode !== 200) {
        throw new Error("The lovely crawler crashed!")
    }
    const $ = cheerio.load(body)
    const nav = $(".j-nav-item").children("a")
    const navs = []
    for (let i = 0; i < nav.length; i++) {
        navs.push($(nav[i]).attr("title"))
    }
    // navs.
})
