import React, { Component, PropTypes } from "react";
import ProductsContainer from "./ProductsContainer";

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <ProductsContainer />

            </div>
        );
    }
}
