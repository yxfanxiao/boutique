import mongoose from "mongoose"
import config from "../../config"
import Product from "./Product"
import Carousel from "./Carousel"
import Category from "./Category"
import User from "./User"
import Cart from "./Cart"
import Order from "./Order"



mongoose.connect(config.db)
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error: "))
db.once("open", () => {
    console.log("Connect to the database: boutique successfully. ")
})


export default combineSchemas({
    Product,
    Carousel,
    Category,
    User,
    Cart,
    Order,
})


function combineSchemas(schemas) {
    for (let key in schemas) {
        schemas[key] = mongoose.model(key)
    }
    return schemas
}