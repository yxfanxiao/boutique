// Foo

import { Product } from "../models";

export function findAllProducts(cb) {
    Product.find({ cate: "居家" }, cb);
}

export function findAllCarousel(cb) {
    Product.find({ cate: "carousel" }, cb);
}