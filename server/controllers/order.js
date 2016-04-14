import { Order } from "../models"

export function newOrder(user, carts, contact) {
    const order = new Order()
    order.userName = user
    order.carts = carts
    order.contact = contact
    return order.save()
}


export async function getOrder(user) {
    return Order.find({ userName: user }, null, { sort: { create_at: -1 }})
}