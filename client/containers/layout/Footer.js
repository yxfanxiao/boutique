import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link, IndexLink } from "react-router"
import * as actions from "../../actions"

class Footer extends Component {
    render() {
        return (
            <div className="footer-container">
                <span className="copyright">河海大学 · 刘华鋆 · 版权所有  © 2016</span>
            </div>
        )
    }
}

function select(state) {
    return {
        user: state.user,
    }
}

export default connect(select)(Footer)