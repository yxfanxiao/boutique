import * as types from "../constants"

export function selectThumbSrc(thumbSrc) {
    return {
        type: types.DETAIL_THUMB_SRC,
        thumbSrc
    }
}

export function selectPara(paraIndex, value) {
    return {
        type: types.DETAIL_SELECT_PARA,
        para: `para${paraIndex}`, 
        value
    }
}

export function reloadDetail(product) {
    return {
        type: types.DETAIL_RELOAD,
        product
    }
}

export function resetReloadFlag() {
    return {
        type: types.DETAIL_RESET_RELOAD
    }
}

export function increaseQuantity() {
    return {
        type: types.DETAIL_PRODUCT_QUANTITY_INCREASE
    }
}

export function decreaseQuantity() {
    return {
        type: types.DETAIL_PRODUCT_QUANTITY_DECREASE
    }
}

export function reloadNav() {
    return {
        type: types.DETAIL_RELOAD_NAV
    }
}

export function resetNav() {
    return {
        type: types.DETAIL_RESET_NAV
    }
}

