import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class Count extends Component {
    render() {
        const { quantity, handlerDecrease, handlerIncrease } = this.props
        return (
            <div className="count">
                <span className="less" onClick={handlerDecrease.bind(this)}><i className="iconfont icon-font46"></i></span>
                <span className="j-count">{quantity}</span>
                <span className="more" onClick={handlerIncrease.bind(this)}><i className="iconfont icon-jiahao"></i></span>
            </div>
        )
    }
}