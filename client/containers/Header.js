import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router"


export default class Header extends Component {
    render() {
        return (
            <div>
                <h1>HEAD</h1>
                <ul>
                    <li><IndexLink to="/">首页</IndexLink></li>
                    <li><Link to="/list">列表</Link></li>
                </ul>
            </div>
        );
    }
}
