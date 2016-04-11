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
    "PRODUCTS_LIST",
    "PRODUCT_DETAIL",
    "PRODUCT_RETURN_TO_INDEX",
    "PRODUCT_RELOAD_NAV",

    // detail
    "DETAIL_RELOAD",
    "DETAIL_RESET_RELOAD",
    "DETAIL_THUMB_SRC",
    "DETAIL_SELECT_PARA",
    "DETAIL_RELOAD_NAV",
    "DETAIL_RESET_NAV",

    // choose param
    "DETAIL_PRODUCT_QUANTITY_INCREASE",
    "DETAIL_PRODUCT_QUANTITY_DECREASE",

    // cart
    "ADD_TO_CART",
    "GET_CART",
    "DELETE_ITEM",
    "ADD_ITEM_QUANTITY",
    "DECREASE_ITEM_QUANTITY",

    // modal
    "MODAL_CLOSE",
    "MODAL_OPEN",

    // user
    "SIGN_UP",
    "USER_NAME_NOT_QUALIFIED",
    "USER_PWD_NOT_QUALIFIED",
    "USER_VALIDATE_ERR",
    "UPDATE_ACCOUNT",
    "LOG_OUT",
]



const ActionTypes = combineActionTypes(Actions);
export default ActionTypes;

function combineActionTypes(actions) {
    return actions.reduce((actionTypes, action) => {
        return Object.assign(actionTypes, { [action]: action })
    }, {})
}