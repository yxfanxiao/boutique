import React, { Component, PropTypes } from "react";

export default class ProductItem extends Component {
    render() {
        const { product } = this.props;
        return (
            <li className="product-item">
                <div className="product-item-img">
                    <img
                        src={product.url}
                        alt={product.title}
                    />
                </div>
                <div className="product-introduction">
                    <a href="#">{product.title}</a>
                    <p>{product.price}</p>
                    <p>{product.desc}</p>
                </div>
            </li>
        );
    }
}