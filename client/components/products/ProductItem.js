import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"

export default class ProductItem extends Component {
    render() {
        const { product } = this.props
        return (
            <li className="product-item">
                <div className="product-item-img">
                    <Link to={`/product/${product.spuId}`}>
                        <img
                            src={product.src[0]}
                            alt={product.name}
                        />
                    </Link>
                </div>
                <div className="product-introduction">
                    <Link to={`/product/${product.spuId}`}>{product.name}</Link>
                    <p className="price">￥{product.skuList[0].retailPrice}</p>
                    <hr />
                    <p className="desc">{product.desc}</p>
                </div>
            </li>
        )
    }
}