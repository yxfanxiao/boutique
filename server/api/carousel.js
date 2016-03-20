import { Carousel } from "../models"

export function findDisplayCarousel(cb) {
    Carousel.find({ display: true }, { rank: -1 }, cb)
}