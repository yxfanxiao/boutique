import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { Carousel } from "../components";

class CarouselContainer extends Component {
    render() {
        const { carousel, dispatch } = this.props;
        // console.log(dispatch);
        console.log(this.props);
        console.log(1111);
        return (
            <div className="carousel-container">
                <h3>Carousel Container</h3>
                <Carousel carousel={carousel} dispatch={dispatch} />
            </div>
        );
    }
}

function select(state) {
    return {
        carousel: state.carousel,
        dispatch: state.dispatch
    }
}

export default connect(select)(CarouselContainer);