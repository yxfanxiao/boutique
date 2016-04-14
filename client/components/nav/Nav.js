import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import * as actions from "../../actions"

export default class Nav extends Component {

    render() {
        const { nav } = this.props.nav
        const { currentList, dispatch } = this.props

        return (
            <div className="nav">
            <IndexLink to="/" key={-1} 
                className={!currentList && "active"}
                onClick={() => dispatch(actions.returnToIndex())}>首页</IndexLink>
            {
                nav.map((n, i) => <Link to={`/list/${n.categoryId}`} className={currentList === n.categoryId && "active"} key={i}>{n.title}</Link>)
            }
            </div>
        )
    }
}
