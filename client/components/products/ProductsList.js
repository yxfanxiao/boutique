import React, { Component, PropTypes } from "react"
import ProductItem from "./ProductItem"
import { Link, IndexLink } from "react-router"

export default class ProductsList extends Component {
    render() {
        const { productList, category } = this.props
        return (
            <div>
                <h1>{productList.title}</h1>
                <ul className="products-list">
                {
                    productList.recommendProducts.map(product => {
                        return (
                            <ProductItem product={product} key={product.spuId} />       
                        )
                    })
                }
                </ul>
                <Link to={`/list/${category}`}>更多{productList.title}好物</Link>
            </div>
        )
    }
}