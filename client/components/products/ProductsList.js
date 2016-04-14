import React, { Component, PropTypes } from "react"
import ProductItem from "./ProductItem"

export default class ProductsList extends Component {
    render() {
        const { productList } = this.props
        return (
            <div>
                <ul className="products-list">
                {
                    productList.map(product => {
                        return (
                            <ProductItem product={product} key={product.spuId} />       
                        )
                    })
                }
                </ul>
            </div>
        )
    }
}