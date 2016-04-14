import * as types from "../constants"

function detail(state = {
    thumbSrc: null,
    para0: "",
    para1: "",
    selectedPara: "",
    reloadFlag: true,
    quantity: 1,
    reloadNavFlag: true
}, action) {
    switch (action.type) {
        case types.DETAIL_THUMB_SRC:
            return Object.assign({}, state, {
                thumbSrc: action.thumbSrc
            })
        case types.DETAIL_RELOAD:
            let para0 = null,
                para1 = null 
            action.product.skuSpecList.map(sku => {
                const type = sku.type
                if (type === 0) {
                    para0 = sku.skuSpecValueList[0].id
                } else if (type === 1) {
                    para1 = sku.skuSpecValueList[0].id
                }
            })
            return Object.assign({}, state, {
                reloadFlag: false,
                thumbSrc: action.product.src[0],
                quantity: 1,
                para0,
                para1,
                selectedPara: combinePara(state, para0, para1)
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
        case types.DETAIL_SELECT_PARA:
            return Object.assign({}, state, {
                [action.para]: +action.id,
                selectedPara: combinePara(state, {
                        [action.para]: +action.id
                    })
            })
        default:
            return state
    }
}

export default detail

function combinePara(state, para0, para1) {
    if (typeof(para0) === "object") {
        const p = {}
        Object.assign(p, state, para0)
        para0 = p.para0
        para1 = p.para1
    }
    if (para0 && para1) {
        return para0 + ";" + para1
    }
    if (para0 && !para1) {
        return para0
    }
    if (!para0 && para1) {
        return para1
    }
}