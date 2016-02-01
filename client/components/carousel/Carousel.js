import React, { Component, PropTypes } from "react";
import * as actions from "../../actions";

export default class Carousel extends Component {
    constructor() {
        super();
        this.carouselInterval = null;
    }

    setCarouselInterval() {
        const { dispatch, carousel } = this.props;
        let { pics, currentIndex, interval } = carousel;

        if (pics.length < 2) {
            return;
        }
        if (this.carouselInterval) {
            clearTimeout(this.carouselInterval);
        }
        this.carouselInterval = window.setTimeout(() => {
            if (currentIndex === pics.length - 1) {
                currentIndex = -1;
            }
            dispatch(actions.nextPicture(currentIndex));
        }, interval)
    }

    // jump to the selected pic through mouseover  
    handlerSelectPic(event) {
        // const selectIndex = +event.currentTarget.id.substr(-1);
        const selectIndex = +event.currentTarget.id.match(/\d+/)[0];
        if (selectIndex === null) {
            throw new Error("Carousel class is wrong...");
        }
        const { currentIndex } = this.props.carousel;
        if (selectIndex === currentIndex) {
            return;
        }
        const { dispatch } = this.props;
        dispatch(actions.indicatorHandler(selectIndex));
    }

    _carousel_onScroll(event) {
        const { scrollTop } = document.body;
        if (scrollTop > 800) {
            window.clearTimeout(this.carouselInterval);
        } else {
            this.setCarouselInterval();
        }       
    }

    // when fetch successfully, start carousel interval
    componentDidUpdate() {
        // stop carousel interval when scroll to below
        window.addEventListener("scroll", this._carousel_onScroll.bind(this));
        const { hasReceived } = this.props.carousel;
        if (hasReceived) {
            this.setCarouselInterval();
        }
    }

    // when remove carousel component, remove the listener
    componentWillUnmount() {
        window.removeListener("scroll", this._carousel_onScroll.bind(this));
    }

    render() {
        const { pics, currentIndex, hasReceived } = this.props.carousel;
        return (
            <div className="carousel">
                <ul className="carousel-pic-container">
                {
                    pics.map((pic, i) => {
                        const className = classNames({
                            selected: i === currentIndex 
                        });
                        return (
                            <li key={i} className={className}>
                                <a>
                                    <img src={pics[i]} />
                                </a>
                            </li>
                        )
                    })
                }
                </ul>
                {
                    hasReceived && (
                        <ul className="indicator">
                        {
                            pics.map((pic, i) => {
                                const className = classNames({
                                    selected: i === currentIndex 
                                });
                                return (
                                    <li key={i} 
                                        id={"carousel-indictor-" + i}
                                        className={className}
                                        onMouseEnter={this.handlerSelectPic.bind(this)}
                                        onClick={this.handlerSelectPic.bind(this)}>
                                    </li>
                                )
                            })
                        }
                        </ul>
                    )
                }
            </div>
        );
    }
}

