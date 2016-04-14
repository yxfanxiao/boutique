import * as types from "../constants"

export function fetchOrder(name) {
    return dispatch => {
        fetch(`/order/${name}`)
            .then(res => res.json())
            .then(data => dispatch(receiveOrder(data)))
    }
}

function receiveOrder(data) {
    return {
        type: types.ORDER_RECEIVE,
        data
    }
}