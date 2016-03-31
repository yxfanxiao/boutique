import * as types from "../constants"

function user(state = {
    login: false,
    signUp: {},
    errorMsg: "",
}, action) {
    switch (action.type) {
        case types.SIGN_UP:
            return Object.assign({}, state, {
                signUp: action.signUp,
                errorMsg: "",
                login: true
            })
        case types.USER_NAME_NOT_QUALIFIED:
            return Object.assign({}, state, {
                errorMsg: action.err
            })
        case types.USER_PWD_NOT_QUALIFIED:
            return Object.assign({}, state, {
                errorMsg: action.err
            })
        case types.USER_VALIDATE_ERR:
            return Object.assign({}, state, {
                errorMsg: action.err
            })
        default:
            return state
    }
}

export default user