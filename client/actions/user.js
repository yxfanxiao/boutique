import * as types from "../constants"
import * as actions from "../"

function signUp(info) {
    return {
        type: types.SIGN_UP,
        signUp: info
    }
}

export function postSignUp(info) {
    const data = new FormData()
    data.append("json", JSON.stringify(info))
    return (dispatch, getState) => {
        fetch("/user/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        }).then(res => {})
          .then(() => dispatch(signUp(info)))
    }
}

export function validateName(err) {
    return {
        type: types.USER_NAME_NOT_QUALIFIED,
        err
    }
}
export function validatePWD(err) {
    return {
        type: types.USER_PWD_NOT_QUALIFIED,
        err
    }
}