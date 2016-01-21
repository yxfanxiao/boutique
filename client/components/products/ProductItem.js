import React, { Component, PropTypes } from "react";

export default class ProductItem extends Component {
    render() {
        const { product } = this.props;
        return (
            <li className="product-item">
                <p>{product.title}</p>
                <p>{product.price}</p>
            </li>
        );
    }
}