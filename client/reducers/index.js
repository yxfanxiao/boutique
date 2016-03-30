import { combineReducers } from "redux"
import products from "./products"
import carousel from "./carousel"
import nav from "./nav"
import detail from "./detail"
import modal from "./modal"
import user from "./user"


const reducers = combineReducers({
    products,
    carousel,
    nav,
    detail,
    modal,
    user,
})

export default reducers