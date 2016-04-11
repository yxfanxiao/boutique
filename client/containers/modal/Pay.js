import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class Pay extends Component {
    submitLogin() {
        const { dispatch } = this.props 
    }

    render() {
        const { order, user, cart, dispatch } = this.props
        return (
            <div className="dialog-wrap pay">
            {
                const total = cart.cart.map(item => item.quantity * item.retailPrice)
                    .reduce((prev, curr) => prev + curr)
                if (cart.cart.length > 0 && 
                    user.signUp.account < total) {
                    <div className="group">
                        <span className="">账户余额不足</span>
                    </div>
                } else {
                    <div className="group">
                        <span className="">当前余额<span className="price">user.signUp.account</span></span>
                        <span className="">订单金额<span className="price">total</span></span>

                    </div>
                }
            }
            </div>
        )
    }
}