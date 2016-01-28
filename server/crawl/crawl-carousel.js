import request from "request";
import cheerio from "cheerio";
import { Product } from "../models";



request("http://you.163.com/", (error, response, body) => {
    if (error || response.statusCode !== 200) {
        throw new Error("The lovely crawler crashed!");
    }
    const $ = cheerio.load(body);
    const $pics = $(".js-img");
    const pics = [];
    $pics.each((i, pic) => {
      const product = new Product();
      product.url = $(pic).attr("src");
      product.cate = "carousel";
      product.save();
    })
})
