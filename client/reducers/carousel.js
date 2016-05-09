import * as types from "../constants"

function carousel(state = {
    currentIndex: 0,
    hasReceived: false,
    interval: 2000,
    pics: []
}, action) {
    switch (action.type) {
        case types.CAROUSEL_RECEIVE_PICS:
            return Object.assign({}, state, {
                pics: action.urls,
                hasReceived: true
            })
        case types.CAROUSEL_NEXT_PICTURE:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            })
        case types.CAROUSEL_INDICATOR_HANDLER:
            return Object.assign({}, state, {
                currentIndex: action.currentIndex
            })
        default:
            return state
    }
}

export default carousel