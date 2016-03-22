import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";

export default class Nav extends Component {

    render() {
        const { nav } = this.props.nav
        return (
            <div>
            {
                nav.map((n, i) => {
                    return (
                        i === 0
                            ? <IndexLink to="/" key={i}>{n.title}</IndexLink>
                            : <Link to="/list" key={i}>{n.title}</Link>
                    )
                })   
            }
            </div>
        )
    }
}
