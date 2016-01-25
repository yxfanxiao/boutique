import shop from "../mockdata/products";
import fetch from 'isomorphic-fetch';

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";
export const ADD_TO_CART = "ADD_TO_CART";

function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products
    }
}

function addToCart(id) {
    return {
        type: ADD_TO_CART,

    }
}

export function getAllProducts() {
    return dispatch => {
        fetch("/v1/products")
            .then(res => res.json())
            .then(products => dispatch(receiveProducts(products)))
        // shop.getProducts(products => {
        //     dispatch(receiveProducts(products));
        // })
    }
}