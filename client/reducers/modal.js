import * as types from "../constants"

function modal(state = {
    status: ""
}, action) {
    switch (action.type) {
        case types.MODAL_CLOSE:
            return Object.assign({}, state, {
                status: "close"
            })
        case types.MODAL_OPEN:
            return Object.assign({}, state, {
                status: "open"
            })
        default:
            return state
    }
}

export default modal