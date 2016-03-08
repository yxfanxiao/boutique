import React, { Component, PropTypes } from "react"

import ProductsContainer from "./ProductsContainer"
import CarouselContainer from "./CarouselContainer"

export default class IndexContainer extends Component {
    render() {
        return (
            <div>
                <CarouselContainer />
                <ProductsContainer />
            </div>
        )
    }
}
