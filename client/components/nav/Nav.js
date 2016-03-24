import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";

export default class Nav extends Component {

    render() {
        const { nav } = this.props.nav
        return (
            <div>
            <IndexLink to="/" key={-1}>首页</IndexLink>
            {
                nav.map((n, i) => <Link to={`/list/${n.categoryId}`} key={i}>{n.title}</Link>)
            }
            </div>
        )
    }
}
