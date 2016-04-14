import * as types from "../constants"

function order(state = {
    order: [],
    carts: [],
}, action) {
    switch (action.type) {
        case types.ORDER_RECEIVE:
            return Object.assign({}, state, {
                order: action.data.data,
                carts: action.data.list
            })
        default:
            return state
    }
}

export default order