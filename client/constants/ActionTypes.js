// add action here
const Actions = [
    // products
    "PRODUCTS_RECEIVE_ALL",

    // carousel
    "CAROUSEL_RECEIVE_PICS",
    "CAROUSEL_NEXT_PICTURE",
    "CAROUSEL_INDICATOR_HANDLER"
]



const ActionTypes = combineActionTypes(Actions);
export default ActionTypes;

function combineActionTypes(actions) {
    return actions.reduce((actionTypes, action) => {
        return Object.assign(actionTypes, { [action]: action })
    }, {})
}