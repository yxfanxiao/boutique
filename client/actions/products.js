import shop from "../mockdata/products";
import { PRODUCTS_RECEIVE_PRODUCT_LIST } from "../constants";

function receiveProductList(productList) {
    return {
        type: PRODUCTS_RECEIVE_PRODUCT_LIST,
        productList
    }
}

export function fetchProductList() {
    return dispatch => {
        fetch("/v1/productList")
            .then(res => res.json())
            .then(productList => dispatch(receiveProductList(productList)))
        // mock data
        // shop.getProducts(products => {
        //     dispatch(receiveProducts(products));
        // })
    }
}