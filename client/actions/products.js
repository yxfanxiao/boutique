import shop from "../mockdata/products";
import { PRODUCTS_RECEIVE_ALL } from "../constants";

function receiveProducts(products) {
    return {
        type: PRODUCTS_RECEIVE_ALL,
        products
    }
}

export function getAllProducts() {
    return dispatch => {
        fetch("/v1/products")
            .then(res => res.json())
            .then(products => dispatch(receiveProducts(products)))
        // mock data
        // shop.getProducts(products => {
        //     dispatch(receiveProducts(products));
        // })
    }
}