import { RECEIVE_PRODUCTS } from "../actions";

// export function () {}

function products(state = [], action) {
    switch (action.type) {
        case RECEIVE_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}

export default products;