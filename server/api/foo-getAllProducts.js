// Foo

import { Product } from "../models";

export default function findAllProducts(cb) {
    Product.find({cate: "居家"}, cb);
}