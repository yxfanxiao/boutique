import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import { connect } from "react-redux"

class ListContainer extends Component {
    render() {
        const category = this.props.params
        return (
            <div>
                <h3>列表页</h3>
            </div>
        )
    }
}


function select(state) {
    return {
        products: state.products
    }
}

export default connect(select)(ListContainer);