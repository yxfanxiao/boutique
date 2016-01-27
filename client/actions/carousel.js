import * as types from "../constants";

function getCarouselUrls(products) {
    return {
        type: types.CAROUSEL_RECEIVE_PICS,
        urls: products.map(product => product.url)
    }
}

export function nextPicture(currentIndex) {
    return {
        type: types.CAROUSEL_NEXT_PICTURE,
        currentIndex: currentIndex + 1
    }
}

// function carouselInterval() {
//     return (dispatch, getState) => {
//         const { currentIndex } = getState().carousel;
//         // console.log(currentIndex);
//         // setInterval
//         // (() => {
//             // dispatch(nextPicture(currentIndex));
//         // }, 1000)
//     }
// }

export function fetchCarousel() {
    return (dispatch, getState) => {
        fetch("/v1/products")
            .then(res => res.json())
            .then(products => dispatch(getCarouselUrls(products)))
            // .then(() => dispatch(carouselInterval(dispatch, getState)))
    }
}

// let carouselInterval = null;
