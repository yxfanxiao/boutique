import * as types from "../constants"

function cart(state = {
    quality: 0,
    cart: null,
}, action) {
    switch (action.type) {
        case types.ADD_TO_CART:
            return Object.assign({}, state, {
                quality: state.quality + 1
            })
        case types.GET_CART:
            return Object.assign({}, state, {
                cart: action.cart
            })
        default:
            return state
    }
}

export default cart