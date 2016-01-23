import request from "request";
import cheerio from "cheerio";

request("http://you.163.com/", (error, response, body) => {
    if (error || response.statusCode !== 200) {
        throw new Error("爬虫遇到了错误");
    }
    const $ = cheerio.load(body);

    const $cates = $(".m-cates");
    const len = $cates.children().length;
    console.log(`共有${len}个类目:`);

    for (let i = 0; i < len; i++) {
        const $cate = $($cates.children()[i]);
        
        const cataTitle = $cate.find("header .name").text();
        const des = $cate.find("header .frontName").text();
        console.log(`${cataTitle}: ${des}`);
    
        const $itemList = $($cate.find(".itemList"));
        const itemLen = $itemList.children().length;
        for (let j = 0; j < itemLen; j++) {
            const $item = $($itemList.children()[j]);
            const url = $item.find(".img").data("original");
            const title = $item.find(".img").attr("alt");
            const price = $item.find(".price").text();
            const desc = $item.find(".desc").attr("title");
            console.log({
                title,
                price,
                desc,
                url
            });
        }

    }
})

