import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { ProductsList } from "../../components"
import { Link, IndexLink } from "react-router"

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
                    return (
                        <div key={category}>
                            <h1>{products.productList[category].title}</h1>
                            <ProductsList 
                                productList={products.productList[category].recommendProducts}
                                category={category}
                            />
                        <Link to={`/list/${category}`}>更多{products.productList[category].title}好物</Link>
                        </div>
                    )
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