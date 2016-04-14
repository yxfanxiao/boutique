// import shop from "../mockdata/products"
import { PRODUCTS_RECEIVE_PRODUCT_LIST,
        PRODUCTS_LIST,
        PRODUCT_DETAIL,
        PRODUCT_RETURN_TO_INDEX,
        PRODUCT_RELOAD_NAV,
} from "../constants"

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
        //     dispatch(receiveProducts(products))
        // })
    }
}

export function receiveList(categoryId) {
    return dispatch => {
        fetch(`/v1/list/${categoryId}`)
            .then(res => res.json())
            .then(list => dispatch(receiveListByCategory(categoryId, list)))
    }
}


function receiveListByCategory(categoryId, list) {
    return {
        type: PRODUCTS_LIST,
        currentList: categoryId,
        list
    }
}

export function receiveProduct(spuId) {
    return dispatch => {
        fetch(`/v1/product/${spuId}`)
            .then(res => res.json())
            .then(product => dispatch(receiveProductBySpuId(spuId, product)))
    }
}

function receiveProductBySpuId(spuId, product) {
    return {
        type: PRODUCT_DETAIL,
        currentProduct: spuId,
        product
    }
}

export function returnToIndex() {
    return {
        type: PRODUCT_RETURN_TO_INDEX
    }
}

export function confirmNav(categoryId) {
    return {
        type: PRODUCT_RELOAD_NAV,
        categoryId
    }
}