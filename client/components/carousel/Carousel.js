import React, { Component, PropTypes } from "react";
import * as actions from "../../actions";

export default class Carousel extends Component {
    constructor() {
        super();
        this.carouselInterval = null;
    }

    render() {
        const { dispatch, carousel } = this.props;
        const pics = carousel.pics.filter((d, i) => i < 4);
        const currentIndex = carousel.currentIndex;
        const className = classNames({
            // active: 
        });
clearTimeout(this.carouselInterval);
console.log(dispatch, currentIndex);
this.carouselInterval= window.setTimeout(() => {
    dispatch(actions.nextPicture(currentIndex))
}, 2000)

                    // pics.map((pic, i) => {
                    //     return (
                    //         <img src={pic} key={i} />
                    //     );
                    // })
        return (
            <div>
                {
                    <img src={pics[currentIndex]} />
                }
            </div>
        );
    }
}

