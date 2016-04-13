import React, { Component, PropTypes } from "react"
import OrderItem from "./OrderItem"

export default class OrderList extends Component {
    render() {
        const { order, dispatch } = this.props 
        return (
            <div className="order-list">
            {
                order.order.map((item, i) => <OrderItem key={i} order={order} item={item} />)
            }
            </div>
        )
    }
}