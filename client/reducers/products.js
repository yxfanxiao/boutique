import { PRODUCTS_RECEIVE_PRODUCT_LIST, PRODUCTS_LIST, PRODUCT_DETAIL, PRODUCT_RETURN_TO_INDEX } from "../constants"

function products(state = {
    productList: {},
    currentList: "",
    list: {},
    currentProduct: "",
    product: {}
}, action) {
    switch (action.type) {
        case PRODUCTS_RECEIVE_PRODUCT_LIST:
            return Object.assign({}, state, {
                productList: action.productList
            })
        case PRODUCTS_LIST:
            return Object.assign({}, state, {
                currentList: action.currentList || "",
                list: action.list
            })
        case PRODUCT_DETAIL:
            return Object.assign({}, state, {
                currentProduct: action.currentProduct,
                product: action.product
            })
        case PRODUCT_RETURN_TO_INDEX:
            return Object.assign({}, state, {
                currentList: ""
            })
        default:
            return state
    }
}

export default products