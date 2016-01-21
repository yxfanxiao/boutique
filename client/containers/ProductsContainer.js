import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import ProductList from "../components/products/ProductList";

class ProductsContainer extends Component {
    render() {
        const { products } = this.props;
        return (
            <div className="products-container">
                <h3>Products List</h3>
                <ul>
                    {
                        products.map((product) => {
                            return (
                                <ProductList product={product} />
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}

function select(state) {
    return {
        products: state.products
    }
}

export default connect(select)(ProductsContainer);