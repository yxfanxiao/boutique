import * as types from "../constants"

function user(state = {
    login: false,
    signUp: {},
    signUpErrorMsg: ""
}, action) {
    switch (action.type) {
        case types.SIGN_UP:
            return Object.assign({}, state, {
                signUp: action.signUp,
                signUpErrorMsg: "",
                login: true
            })
        case types.USER_NAME_NOT_QUALIFIED:
            return Object.assign({}, state, {
                signUpErrorMsg: action.err
            })
        case types.USER_PWD_NOT_QUALIFIED:
            return Object.assign({}, state, {
                signUpErrorMsg: action.err
            })
        default:
            return state
    }
}

export default user