import * as types from "../constants"

function cart(state = {
    quantity: 0,
    cart: null,
}, action) {
    switch (action.type) {
        case types.ADD_TO_CART:
            return Object.assign({}, state, {
                cart: combineCart(state.cart, action.item),
                quantity: combineCart(state.cart, action.item).length
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

function combineCart(cart, item) {
    let flag = false
    cart.map(s => {
        if (s.skuId == item.skuId) {
            flag = true
            s.quantity += item.quantity
        }
        return s
    })
    if (!flag) {
        cart.push(item)
    }
    return cart
}