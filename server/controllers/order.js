import { Order } from "../models"

export function newOrder(user, carts) {
    const order = new Order()
    order.user = user
    order.carts = carts
    return order.save()
}