import * as types from "../constants"
import { closeModal } from "./modal"

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
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(closeModal())
                  dispatch(signUp(info))
              } else {
                  dispatch(validateErr(data.err))
              }
          })
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

export function validateErr(err) {
    return {
        type: types.USER_VALIDATE_ERR,
        err
    }
}