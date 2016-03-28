import { combineReducers } from "redux"
import products from "./products"
import carousel from "./carousel"
import nav from "./nav"
import detail from "./detail"


const reducers = combineReducers({
    products,
    carousel,
    nav,
    detail
})

export default reducers