import React, { Component, PropTypes } from "react"

import ProductListContainer from "./ProductListContainer"
import CarouselContainer from "./CarouselContainer"

export default class IndexContainer extends Component {
    render() {
        return (
            <div>
                <CarouselContainer />
                <ProductListContainer />
            </div>
        )
    }
}
