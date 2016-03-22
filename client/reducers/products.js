import { PRODUCTS_RECEIVE_PRODUCT_LIST } from "../constants";

function products(state = {
    productList: {}
}, action) {
    switch (action.type) {
        case PRODUCTS_RECEIVE_PRODUCT_LIST:
            return Object.assign({}, state, {
                productList: action.productList
            })
        default:
            return state;
    }
}

export default products;