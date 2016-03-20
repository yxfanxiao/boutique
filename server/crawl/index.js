require("babel-core/register")

// index carousel
var crawlCarousel = require("./carousel")

// nav list
var crawlNav = require("./nav")
var crawlSubCategory = require("./subCategory")

// products
var crwalProducts = require("./products")


crawlCarousel()
	.then(crawlNav)
	.then(crawlSubCategory)
	.then(crwalProducts)
	.then(() => {
		console.log("Please press Ctrl+C to exit. Then, npm start.");	    
	})

