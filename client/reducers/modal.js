import * as types from "../constants"

function modal(state = {
    status: "",
    dialog: "",
    title: "",
    msg: "",
}, action) {
    switch (action.type) {
        case types.MODAL_CLOSE:
            return Object.assign({}, state, {
                status: "close",
                dialog: "",
                title: "",
                msg: "",
            })
        case types.MODAL_OPEN:
            return Object.assign({}, state, {
                status: "open",
                dialog: action.dialog,
                title: action.title,
                msg: action.msg
            })
        case types.MODAL_MSG:
            return Object.assign({}, state, {
                msg: action.msg
            })
        default:
            return state
    }
}

export default modal