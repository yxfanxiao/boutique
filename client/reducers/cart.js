import * as types from "../constants"

function cart(state = {
    quantity: 0,
    cart: null,
}, action) {
    switch (action.type) {
        case types.ADD_TO_CART:
            return Object.assign({}, state, {
                // 写到这里，要即时更新购物车的数量。。
                // cart: state
                // quantity: state.cart.some(c => c.skuId == item.skuId) ? state.quantity : state.quantity + 1
            })
        case types.GET_CART:
            return Object.assign({}, state, {
                cart: action.cart,
                quantity: action.cart.length
            })
        case types.DELETE_ITEM:
            return Object.assign({}, state, {
                quantity: state.quantity - 1,
                cart: state.cart.filter((item) => item.skuId !== action.item.skuId)
            })
        default:
            return state
    }
}

export default cart

function combineCart(state, item) {

}