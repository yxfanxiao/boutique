import React, { Component, PropTypes } from "react"
import CartItem from "./CartItem"
import * as actions from "../../actions"

export default class Cart extends Component {
    componentWillMount() {
        const { user, dispatch } = this.props     
        if (!user.login) {
            return
        }
        dispatch(actions.fetchCart(user.signUp.name))
    }
    render() {
        const { user, dispatch } = this.props     
        return (
            <div className="cart">
                <span className="title">商品信息</span>
                {
                    user.login
                    ? (
                        <div className="cart-content">
                            <div className="cart-head"></div>
                            <ul className="cart-list">
                                <CartItem />
                                <CartItem />
                            </ul>
                        </div>
                    )
                    : (
                        <h1>您尚未登陆</h1>
                    )
                }
            </div>
        )
    }
}