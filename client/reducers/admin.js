import * as types from "../constants"

function admin(state = {
    navs: [],
    selectNav: "",
}, action) {
    switch (action.type) {
        // case types.CAROUSEL_RECEIVE_PICS:
        //     return Object.assign({}, state, {
        //         pics: action.urls,
        //         hasReceived: true
        //     })
        default:
            return state
    }
}

export default admin