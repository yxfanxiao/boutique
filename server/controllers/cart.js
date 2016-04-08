import { Cart } from "../models"

export function addToCart(info) {
    return Cart.findOne({skuId: info.skuId})
        .then((item) => {
            console.log(item)
            if (item) {
                return Cart.where({skuId: info.skuId})
                    .update({ $set: {quantity: +item.quantity + info.quantity}}) 
                    .exec()
            } else {
                const cart = new Cart()
                cart.userName = info.userName
                cart.spuId = info.spuId
                cart.skuId = info.skuId
                cart.quantity = info.quantity
                cart.title = info.title
                cart.pic = info.pic
                cart.para = info.para
                cart.retailPrice = info.retailPrice
                return cart.save()
            }
        }, err => {
            console.log("err", err)
        })
}

export function getCart(name, cb) {
    return Cart.find({ userName: name }, null, { sort: {create_at: -1}}, cb)
}