import "./style"

import React, { Component, PropTypes } from "react"
import Header from "./Header"

export default class App extends Component {
    render() {
        return (
            <div className="app">
                <Header />
                {this.props.children}
                <h1>Footer</h1>
            </div>
        )
    }
}
