import "./style"
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Cart } from "../../components"

class CartContainer extends Component {
    render() {
        const { cart, user, dispatch } = this.props
        return (
            <div className="cart-container">
                <Cart cart={cart} user={user} dispatch={dispatch} />
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

export default connect(select)(CartContainer)