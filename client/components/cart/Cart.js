import React, { Component, PropTypes } from "react"
import CartItem from "./CartItem"
import * as actions from "../../actions"

export default class Cart extends Component {
    componentWillMount() {
        const { user, dispatch } = this.props     
        if (!user.login) {
            dispatch(actions.openModal("log-in", "登录"))
            return
        }
        dispatch(actions.fetchCart(user.signUp.name))
    }

    componentWillUpdate() {
        const { user, cart, dispatch } = this.props
        if (cart.cart === null) {
            dispatch(actions.fetchCart(user.signUp.name))
        }
    }

    render() {
        const { user, cart, dispatch } = this.props     
        const {} = cart
        return (
            <div className="cart">
                <span className="title">商品信息</span>
                {
                    user.login
                    ? (
                        <div className="cart-content">
                            <div className="cart-head">
                                <span className="title">名称</span>
                                <span className="spec">规格</span>
                                <span className="quantity">数量</span>
                                <span className="retail-price">单价</span>
                                <span className="sub-total">小计</span>
                                <span className="operation">操作</span>
                            </div>
                            <ul className="cart-list">
                            {
                                cart.cart && cart.cart.map((item, i) => <CartItem item={item} cart={cart} dispatch={dispatch} key={i}/>)
                            }
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