import { Carousel } from "../models"

// export function findAllProducts(cb) {
//     Product.find({ cate: "居家" }, cb)
// }

export function findDisplayCarousel(cb) {
    Carousel.find({ display: true }, { rank: -1 }, cb)
}