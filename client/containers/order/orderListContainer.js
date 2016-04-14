import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { OrderList } from "../../components"
import * as actions from "../../actions"
import { Link, IndexLink } from "react-router"

class OrderListContainer extends Component {

    componentWillMount() {
        const { order, modal, user, dispatch } = this.props

        if (user.login) {
            dispatch(actions.fetchOrder(user.signUp.name))
        }
    }

    componentWillUpdate() {
        const { order, modal, user, dispatch } = this.props

        if (user.login) {
            dispatch(actions.fetchOrder(user.signUp.name))
        }
    }

    render() {
        const { order, user, dispatch } = this.props
        return (
            <div className="order-list-wrapper">
            {
                user.login && (
                    <div className="order-list-container">
                        <div className="user">
                            <img src="http://yanxuan.nosdn.127.net/67d25dfb82013711b7c41d9fcd7b7c45.png?imageView&quality=95" />
                            <span className="user-name">{user.signUp.name}</span>
                            <button className="log-out" onClick={() => dispatch(actions.logOut())}>注销</button>
                            <span className="modify-address" onClick={() => dispatch(actions.openModal("create-new-address", "编辑收货地址"))}>更改地址</span>
                        </div>
                          <OrderList dispatch={dispatch} order={order} />
                    </div>
                )
            }
            </div>
        )
    }
}

function select(state) {
    return {
        order: state.order,
        dispatch: state.dispatch,
        user: state.user,
        modal: state.modal
    }
}

export default connect(select)(OrderListContainer)