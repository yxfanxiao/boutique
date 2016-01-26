import React, { Component, PropTypes } from "react";
import ProductsContainer from "./ProductsContainer";
// import CarouselContainer from "./CarouselContainer";

export default class App extends Component {
    render() {
        return (
            <div className="app">
                // <CarouselContainer />
                <ProductsContainer />
            </div>
        );
    }
}
