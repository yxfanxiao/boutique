import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class Count extends Component {

    handlerIncrease() {
        const { detail,dispatch } = this.props
        dispatch(actions.increaseQuantity())
    }

    handlerDecrease () {
        const { detail,dispatch } = this.props
        dispatch(actions.decreaseQuantity())
    }

    render() {
        const { quantity } = this.props.detail
        return (
            <div className="count">
                <span className="less" onClick={this.handlerDecrease.bind(this)}><i className="iconfont icon-font46"></i></span>
                <span className="j-count">{quantity}</span>
                <span className="more" onClick={this.handlerIncrease.bind(this)}><i className="iconfont icon-jiahao"></i></span>
            </div>
        )
    }
}