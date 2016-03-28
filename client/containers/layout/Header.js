import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link, IndexLink } from "react-router"
import { Nav } from "../../components"


class Header extends Component {
    render() {
        const { nav, currentList, dispatch } = this.props
        return (
            <div className="header">
                <div className="menu-wrap">
                    <div className="menu">
                        <div className="logo-wrap"><i className="iconfont icon-02jingpinrentiao"></i></div>
                        <div className="declare">品味良好的生活，从这里开始</div>
                    </div>
                </div>
                <div className="nav-wrap">
                    <Nav nav={nav} currentList={currentList} dispatch={dispatch} />
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        nav: state.nav,
        currentList: state.products.currentList
    }
}

export default connect(select)(Header)