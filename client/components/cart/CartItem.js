import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import * as actions from "../../actions"

export default class CartItem extends Component {
    deleteItem() {
        const { item, cart, dispatch } = this.props
        dispatch(actions.deleteItem(item))
    }

    render() {
        const { item } = this.props
        return (
            <li className="cart-item">
                <Link className="item-img" to={`/product/${item.spuId}`}><img src={item.pic} /></Link>
                <Link className="item-title" to={`/product/${item.spuId}`}><span className="title">{item.title}</span></Link>
                <div className="para">
                {
                    item.para.map((p, i) => <span key={i}>{p}</span>)
                }
                </div>
                <span className="quantity">{item.quantity}</span>
                <span className="price retail-price">{item.retailPrice}</span>
                <span className="price sub-total-price">{item.retailPrice * item.quantity * 1}</span>
                <span className="delete" onClick={this.deleteItem.bind(this)}>删除</span>
            </li>
        )
    }
}