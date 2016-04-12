import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"
import { Link } from "react-router"

export default class Pay extends Component {

    pay() {
        const { order, user, cart, dispatch } = this.props
        dispatch(actions.fetchPay(user.signUp, cart.cart))
    }

    render() {
        const { order, user, cart, dispatch } = this.props
        const total = cart.cart.map(item => item.quantity * item.retailPrice)
            .reduce((prev, curr) => prev + curr)

        return (
            <div className="dialog-wrap pay">
                <div className="group">
                    <span className="title">账户余额</span>
                    <span className="price">{user.signUp.account}</span>
                </div>
                <div className="group">
                    <span className="title">订单金额</span>
                    <span className="price">{total}</span>
                </div>
                {
                    (cart.cart.length > 0 & user.signUp.account < total) 
                    ?   <div className="group error">
                            <span className="err-msg">账户余额不足，请充值！</span>
                        </div>
                    :   <Link to="/order/list"><button className="pay" onClick={this.pay.bind(this)}>支付</button></Link>
                }
            </div>
        )
    }
}