import * as types from "../constants"

function detail(state = {
    thumbSrc: null,
    para0: "",
    para1: "",
    reloadFlag: true,
    quantity: 1,
    reloadNavFlag: true
}, action) {
    switch (action.type) {
        case types.DETAIL_THUMB_SRC:
            return Object.assign({}, state, {
                thumbSrc: action.thumbSrc
            })
        case types.DETAIL_SELECT_PARA:
            return Object.assign({}, state, {
                [action.para]: action.value
            })
        case types.DETAIL_RELOAD:
            return Object.assign({}, state, {
                reloadFlag: false,
                thumbSrc: action.product.src[0],
                quantity: 1,
                para0: action.product.skuSpecList[0] && action.product.skuSpecList[0].skuSpecValueList[0].id,
                para1: action.product.skuSpecList[1] && action.product.skuSpecList[1].skuSpecValueList[0].id
            })
        case types.DETAIL_RESET_RELOAD:
            return Object.assign({}, state, {
                reloadFlag: true
            })
        case types.DETAIL_PRODUCT_QUANTITY_INCREASE:
            return Object.assign({}, state, {
                quantity: state.quantity + 1
            })
        case types.DETAIL_PRODUCT_QUANTITY_DECREASE:
            return Object.assign({}, state, {
                quantity: (state.quantity - 1) || 1 
            })
        case types.DETAIL_RELOAD_NAV:
            return Object.assign({}, state, {
                reloadNavFlag: false
            })
        case types.DETAIL_RESET_NAV:
            return Object.assign({}, state, {
                reloadNavFlag: true
            })
        default:
            return state
    }
}

export default detail