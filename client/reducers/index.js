import { combineReducers } from "redux"
import products from "./products"
import carousel from "./carousel"
import nav from "./nav"
import detail from "./detail"
import modal from "./modal"
import user from "./user"
import cart from "./cart"
import order from "./order"
import admin from "./admin"


const reducers = combineReducers({
    products,
    carousel,
    nav,
    detail,
    modal,
    user,
    cart,
    order,
    admin,
})

export default reducers