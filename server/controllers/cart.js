import { Cart } from "../models"

export function addToCart(info) {
    return Cart.findOne({skuId: info.skuId, pay: false})
        .then((item) => {
            if (item) {
                return Cart.where({skuId: info.skuId, pay: false})
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
    return Cart.find({ userName: name, pay: false }, null, { sort: {create_at: -1}}, cb)
}

export function deleteCart(id) {
    return Cart.remove({_id: id})
}

export function modifyItemQuantity(id, quantity) {
    return Cart.update({_id: id}, { $set: { quantity: quantity }})
}

export async function boughtCart(carts, cb) {
    for (let cart of carts) {
        await updatePayState(cart)
    }
    return new Promise((resolve, reject) => {
        resolve()
    })
}

async function updatePayState(id) {
    return Cart.update({ _id: id }, { pay: true })
}