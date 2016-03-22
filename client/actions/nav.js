import * as types from "../constants";

function getNav(nav) {
    return {
        type: types.NAV_RECEIVE,
        nav: nav
    }
}

export function fetchNav() {
    return (dispatch, getState) => {
        fetch("/v1/nav")
            .then(res => res.json())
            .then(nav => dispatch(getNav(nav)))
    }
}
