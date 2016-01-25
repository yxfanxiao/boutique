import request from "request";
import cheerio from "cheerio";
import { Product } from "../models";

//  Foo:
// const product = new Product();
// product.title = "Foooooooo";
// product.save((err, product) => {
//     if (err) {
//         console.error(err);
//     }
//     console.log(product);
// });


request("http://you.163.com/", (error, response, body) => {
    if (error || response.statusCode !== 200) {
        throw new Error("The lovely crawler crashed!");
    }
    const $ = cheerio.load(body);

    const $cates = $(".m-cates");
    const len = $cates.children().length;
    // console.log(`共有${len}个类目:`);

    for (let i = 0; i < len; i++) {
        const $cate = $($cates.children()[i]);
        
        const cataTitle = $cate.find("header .name").text();
        const des = $cate.find("header .frontName").text();
        // console.log(`${cataTitle}: ${des}`);
    
        const $itemList = $($cate.find(".itemList"));
        const itemLen = $itemList.children().length;
        for (let j = 0; j < itemLen; j++) {
            const $item = $($itemList.children()[j]);
            const url = $item.find(".img").data("original");
            const title = $item.find(".img").attr("alt");
            const price = $item.find(".price").text();
            const desc = $item.find(".desc").attr("title");
            // console.log({
            //     title,
            //     price,
            //     desc,
            //     url
            // });
            const product = new Product();
            product.url = url;
            product.title = title;
            product.price = price;
            product.desc = desc;
            product.cate = cataTitle;
            product.save(err => {
                if (err) {
                    console.error(err);
                }
            });
        }

    }
})
