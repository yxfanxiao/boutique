import * as types from "../constants"

function nav(state = {
    nav: [],
    subCate: {},
}, action) {
    switch (action.type) {
        case types.NAV_RECEIVE:
            return Object.assign({}, state, {
                nav: action.nav,
                subCate: action.subCate,
            })
        default:
            return state
    }
}

export default nav