import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Carousel } from "../components";

class CarouselContainer extends Component {
    render() {
        const { products } = this.props;
        return (
            <div className="carousel-container">
                <h3>Carousel Container</h3>
                <Carousel pics={pics} />
            </div>
        );
    }
}

function select(state) {
    return {
        pics: state.products.map(product => product.url)
    }
}

export default connect(select)(CarouselContainer);