import React, { Component, PropTypes } from "react";
import ProductItem from "./ProductItem";

export default class ProductsList extends Component {
    render() {
        const { products } = this.props;
        return (
            <ul className="products-list">
                {
                    products.map(product => {
                        return (
                            <ProductItem product={product} key={product.id} />       
                        );
                    })
                }
            </ul>
        );
    }
}