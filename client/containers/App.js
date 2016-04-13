import "./style"

import React, { Component, PropTypes } from "react"
import Header from "./layout/Header"
import Footer from "./layout/Footer"
import { connect } from "react-redux"
import Modal from "./modal/Modal"

class App extends Component {
    getScrollbarWidth() {
        let oP = document.createElement("p"),
            styles = {
                width: "100px",
                height: "100px",
                overflowY: "scroll"
            },
            i, 
            scrollbarWidth
        for (i in styles) {
            oP.style[i] = styles[i]
        }
        document.body.appendChild(oP)
        scrollbarWidth = oP.offsetWidth - oP.clientWidth
        oP.remove()
        return scrollbarWidth
    }

    render() {
        if (this.props.modal.status === "open") {
            document.querySelector("#root").style.marginRight = this.getScrollbarWidth() + "px"
        } else {
            document.querySelector("#root").style.marginRight = ""
        }
        return (
            <div className="app">
                <Header />
                {this.props.children}
                {
                    this.props.modal.status === "open" && <Modal />
                }
                <Footer />
            </div>
        )
    }
}


function select(state) {
    return {
        modal: state.modal
    }
}

export default connect(select)(App)