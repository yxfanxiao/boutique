import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { ProductsList } from "../components";

class ProductsContainer extends Component {
    render() {
        const { products } = this.props;
        return (
            <div className="products-container">
                <h3>Products List</h3>
                <ProductsList products={products} />
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