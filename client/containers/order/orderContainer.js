import "./style"
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Cart } from "../../components"
import * as actions from "../../actions"

class OrderContainer extends Component {

    createNewAddress() {
        const { dispatch } = this.props 
        dispatch(actions.openModal("create-new-address", "新建收货地址"))
    }

    render() {
        const { cart, user, dispatch } = this.props
        return (
            <div className="order-container">
                <div className="receive-info">
                    <span className="header">收货信息</span>
                    <span className="title"><i className="iconfont icon-wuliu" />地址</span>
                    <div className="info">
                        {
                            user.signUp && user.signUp.contact &&
                            <div className="left">
                                <div className="person"><span className="">收货人：</span><span className="">{user.signUp.contact.person}</span></div>
                                <div className="tel"><span className="">联系方式：</span><span className="">{user.signUp.contact.tel}</span></div>
                                <div className="address"><span className="">收货地址：</span><span className="">{user.signUp.contact.address}</span></div>
                            </div>
                        }
                        <div className="right"><span className="new-address" onClick={this.createNewAddress.bind(this)}>编辑地址</span></div>
                    </div>
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