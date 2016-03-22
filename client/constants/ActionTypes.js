// add action here
const Actions = [
    // nav
    "NAV_RECEIVE",

    // carousel
    "CAROUSEL_RECEIVE_PICS",
    "CAROUSEL_NEXT_PICTURE",
    "CAROUSEL_INDICATOR_HANDLER",

    // products
    "PRODUCTS_RECEIVE_PRODUCT_LIST",
]



const ActionTypes = combineActionTypes(Actions);
export default ActionTypes;

function combineActionTypes(actions) {
    return actions.reduce((actionTypes, action) => {
        return Object.assign(actionTypes, { [action]: action })
    }, {})
}