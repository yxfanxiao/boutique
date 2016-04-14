import * as types from "../constants"
import { closeModal } from "./modal"

function signUp(info) {
    return {
        type: types.SIGN_UP,
        signUp: info
    }
}

export function postSignUp(info) {
    return (dispatch, getState) => {
        fetch("/user/signUp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
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

export function postLogIn(info) {
    return (dispatch, getState) => {
        fetch("/user/logIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(info)
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(closeModal())
                  dispatch(signUp(data.user))
              } else {
                  dispatch(validateErr(data.err))
              }
          })
    }
}

export function postReCharge(name) {
    return (dispatch, getState) => {
        fetch("/user/reCharge", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name})
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(updateAccount(data.user))
              }
          })
    }
}

export function updateAccount(user) {
    return {
        type: types.UPDATE_ACCOUNT,
        user
    }
}

export function logOut() {
    return {
        type: types.LOG_OUT     
    }
}

export function postAddress(name, info) {
    return (dispatch, getState) => {
        fetch("/user/address", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, info})
        }).then(res => res.json())
          .then(data => {
              if (data.status === 200) {
                  dispatch(updateUser(data.user))
                  dispatch(closeModal())
              }
          })
    }
}

function updateUser(user) {
    return {
        type: types.USER_UPDATE,
        user
    }
}

