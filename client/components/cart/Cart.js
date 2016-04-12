import React, { Component, PropTypes } from "react"
import CartItem from "./CartItem"
import { Link } from "react-router"
import * as actions from "../../actions"

export default class Cart extends Component {
    purchase() {
        const { dispatch } = this.props
    }
    
    pay() {
        const { dispatch } = this.props
        dispatch(actions.openModal("pay", "付款"))
    }

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
        const { user, cart, dispatch, pay } = this.props     
        const {} = cart
        return (
            <div className="cart">
                { !pay && <span className="title">商品信息</span>}                
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
                            {
                                cart.cart && (
                                    <div className="cart-footer">
                                            <div className="total-price">
                                                <span className="title">商品合计：</span>
                                                <span className="price">
                                                {
                                                    cart.cart.length > 0 && cart.cart
                                                        .map(item => item.quantity * item.retailPrice)
                                                        .reduce((prev, curr) => prev + curr)
                                                }
                                                </span>
                                            </div>
                                            {
                                               !pay
                                                    ? <Link to="/order"><div className="btn purchase" onClick={this.purchase.bind(this)}>下单</div></Link>
                                                    : <div className="btn pay" onClick={this.pay.bind(this)}>付款</div>

                                            }
                                    </div>
                                )
                            }
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