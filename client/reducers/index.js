import { combineReducers } from "redux";
import products from "./products";
import carousel from "./carousel";
import nav from "./nav";


const reducers = combineReducers({
    products,
    carousel,
    nav
});

export default reducers;