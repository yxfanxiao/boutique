import { Carousel } from "../models"

export function displayCarousel(cb) {
    Carousel.find({ display: true }, null, { rank: -1 }, cb)
}