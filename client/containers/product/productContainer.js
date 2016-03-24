import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import { connect } from "react-redux"
import { ProductDetail } from "../../components"
import * as actions from "../../actions"

class ProductContainer extends Component {

    componentDidMount() {
        const { spuId } = this.props.params
        const { products, dispatch } = this.props
        if (products.currentProduct !== spuId) {
            dispatch(actions.receiveProduct(spuId))
        }
    }
    componentDidUpdate(prevProps, prevState) {
        const { spuId } = this.props.params
        const { products, dispatch } = this.props

        if (products.currentProduct !== spuId) {
            dispatch(actions.receiveProduct(spuId))
        }
    }

    render() {
        const { spuId } = this.props.params
        const { products, dispatch } = this.props 

        return (
            <div>
                <h3>商品页</h3>
                {
                    products.currentProduct && (
                        <ProductDetail 
                            product={products.product}
                        />
                    )
                }
            </div>
        )
    }
}


function select(state) {
    return {
        products: state.products
    }
}

export default connect(select)(ProductContainer)