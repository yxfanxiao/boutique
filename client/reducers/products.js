import { PRODUCTS_RECEIVE_ALL } from "../constants";

function products(state = [], action) {
    switch (action.type) {
        case PRODUCTS_RECEIVE_ALL:
            return [
                ...action.products
            ]
        default:
            return state;
    }
}

export default products;