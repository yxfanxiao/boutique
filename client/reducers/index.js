import { combineReducers } from "redux";
import products from "./products";
import carousel from "./carousel";


const reducers = combineReducers({
    products,
    carousel
});

export default reducers;