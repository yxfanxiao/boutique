import * as types from "../constants"

function modal(state = {
    status: "",
    dialog: "",
    title: ""
}, action) {
    switch (action.type) {
        case types.MODAL_CLOSE:
            return Object.assign({}, state, {
                status: "close",
                dialog: "",
                title: ""
            })
        case types.MODAL_OPEN:
            return Object.assign({}, state, {
                status: "open",
                dialog: action.dialog,
                title: action.title
            })
        default:
            return state
    }
}

export default modal