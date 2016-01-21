import shop from "../mockdata/products";

export const RECEIVE_PRODUCTS = "RECEIVE_PRODUCTS";

function receiveProducts(products) {
    return {
        type: RECEIVE_PRODUCTS,
        products
    }
}

export function getAllProducts() {
    // when this "dispatch" appoint ?
    return dispatch => {
        shop.getProducts(products => {
            dispatch(receiveProducts(products));
        })
    }
}