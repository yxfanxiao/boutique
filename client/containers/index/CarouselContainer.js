import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Carousel } from "../../components"

class CarouselContainer extends Component {
    render() {
        const { carousel, dispatch } = this.props
        return (
            <div className="carousel-container">
                <Carousel carousel={carousel} dispatch={dispatch} />
            </div>
        )
    }
}

function select(state) {
    return {
        carousel: state.carousel,
        dispatch: state.dispatch
    }
}

export default connect(select)(CarouselContainer)