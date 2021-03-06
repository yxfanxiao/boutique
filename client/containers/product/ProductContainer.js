import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import { connect } from "react-redux"
import { ProductDetail } from "../../components"
import * as actions from "../../actions"

class ProductContainer extends Component {

    componentWillMount() {
        const { spuId } = this.props.params
        const { products, dispatch } = this.props
        if (products.currentProduct !== spuId) {
            dispatch(actions.receiveProduct(spuId))
        }
    }
    componentWillUpdate(prevProps, prevState) {
        const { spuId } = this.props.params
        const { products, dispatch } = this.props

        if (products.currentProduct !== spuId) {
            dispatch(actions.receiveProduct(spuId))
        }
    }

    render() {
        const { spuId } = this.props.params
        const { products, detail, user, cart, dispatch } = this.props 

        return (
            <div>
                {
                    products.currentProduct && (
                        <ProductDetail 
                            products={products}
                            spuId={spuId}
                            detail={detail}
                            cart={cart}
                            user={user}
                            dispatch={dispatch}
                        />
                    )
                }
            </div>
        )
    }
}


function select(state) {
    return {
        products: state.products,
        detail: state.detail,
        cart: state.cart,
        user: state.user
    }
}

export default connect(select)(ProductContainer)