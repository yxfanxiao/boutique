import { Cart } from "../models"

export function addToCart(info) {
    const cart = new Cart()
    cart.userName = info.userName
    cart.spuId = info.spuId
    cart.skuId = info.skuId
    cart.quantity = info.quantity
    cart.pic = info.pic
    cart.para = info.para
    cart.retailPrice = info.retailPrice
    return cart.save()
}

export function getCart(name, cb) {
    return Cart.find({ userName: name }, null, { sort: {create_at: -1}}, cb)
}