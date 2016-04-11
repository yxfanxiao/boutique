import "./style"
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Cart } from "../../components"

class OrderContainer extends Component {
    render() {
        const { cart, user, dispatch } = this.props
        return (
            <div className="order-container">
                <div className="receive-info">
                    <span className="header">收货信息</span>
                    <span className="title"><i className="iconfont icon-wuliu" />地址</span>
                    <div className="person"><span className="">收货人：</span><input className=""></input></div>
                    <div className="tel"><span className="">联系方式：</span><input className=""></input></div>
                    <div className="address"><span className="">收货地址：</span><input className=""></input></div>
                </div>
                <Cart cart={cart} user={user} dispatch={dispatch} pay="true"/>
            </div>
        )
    }
}

function select(state) {
    return {
        cart: state.cart,
        dispatch: state.dispatch,
        user: state.user
    }
}

export default connect(select)(OrderContainer)