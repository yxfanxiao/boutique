import * as types from "../constants";

function nav(state = {
    nav: []
}, action) {
    switch (action.type) {
        case types.NAV_RECEIVE:
            return Object.assign({}, state, {
                nav: action.nav
            })
        default:
            return state;
    }
}

export default nav;