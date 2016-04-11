import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import * as actions from "../../actions"
import Count from "../count"

export default class CartItem extends Component {
    deleteItem() {
        const { item, cart, dispatch } = this.props
        dispatch(actions.fetchDeleteItem(item))
    }

    handlerDecrease() {
        const { item, dispatch } = this.props
        if (item.quantity > 1) {
            dispatch(actions.fetchDecreaseItemQuantity(item))
        }
    }

    handlerIncrease() {
        const { item, dispatch } = this.props
        dispatch(actions.fetchAddItemQuantity(item))
    }

    render() {
        const { item, dispatch } = this.props
        return (
            <li className="cart-item">
                <Link className="item-img" to={`/product/${item.spuId}`}><img src={item.pic} /></Link>
                <Link className="item-title" to={`/product/${item.spuId}`}><span className="title">{item.title}</span></Link>
                <div className="para">
                {
                    item.para.map((p, i) => <span key={i}>{p}</span>)
                }
                </div>
                <Count className="quantity"
                    handlerDecrease={this.handlerDecrease.bind(this)}
                    handlerIncrease={this.handlerIncrease.bind(this)}
                    quantity={item.quantity}
                    dispatch={dispatch}
                />
                <span className="price retail-price">{item.retailPrice}</span>
                <span className="price sub-total-price">{item.retailPrice * item.quantity * 1}</span>
                <span className="delete" onClick={this.deleteItem.bind(this)}>删除</span>
            </li>
        )
    }
}


