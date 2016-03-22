import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link, IndexLink } from "react-router"
import { Nav } from "../../components"


class Header extends Component {
    render() {
        const { nav, dispatch } = this.props
        return (
            <div>
                <Nav nav={nav} dispatch={dispatch} />
            </div>
        )
    }
}

function select(state) {
    return {
        nav: state.nav
    }
}

export default connect(select)(Header)