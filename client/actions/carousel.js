import * as types from "../constants";

function getDisplayCarousel(carousels) {
    return {
        type: types.CAROUSEL_RECEIVE_PICS,
        urls: carousels.map(carousel => carousel.src)
    }
}

export function indicatorHandler(selectIndex) {
    return {
        type: types.CAROUSEL_INDICATOR_HANDLER,
        currentIndex: selectIndex
    }
}

export function nextPicture(currentIndex) {
    return {
        type: types.CAROUSEL_NEXT_PICTURE,
        currentIndex: currentIndex + 1
    }
}

export function fetchCarousel() {
    return (dispatch, getState) => {
        fetch("/v1/carousel")
            .then(res => res.json())
            .then(carousels => dispatch(getDisplayCarousel(carousels)))
    }
}
