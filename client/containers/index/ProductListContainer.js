import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { ProductsList } from "../../components"

class ProductsContainer extends Component {
    render() {
        const { products } = this.props
        const p = []
        for (let category in products.productList) {
            p.push(category)
        }
        return (
            <div className="products-container">
            {
                p.map((category, i) => {
                    return (<ProductsList 
                        productList={products.productList[category]}
                        category={category}
                        key={category}
                    />)
                })
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

export default connect(select)(ProductsContainer)