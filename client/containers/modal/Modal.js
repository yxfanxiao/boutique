import "./style"

import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import SignUp from "./SignUp"
import LogIn from "./LogIn"

class Modal extends Component {

    componentWillMount() {
        document.querySelector("body").className = "modal-open"
    }

    componentWillUnmount() {
        const { user, dispatch } = this.props
        dispatch(actions.validateName(null))
        document.querySelector("body").className = ""
    }

    closeButton_onClick() {
        const { dispatch } = this.props
        document.querySelector(".dialog").className = "dialog close";
        setTimeout(() => {
            dispatch(actions.closeModal())
        }, 1000)
    }

    render() {
        const { modal, user, dispatch } = this.props
        const className = classNames({
            modal,
            open: modal.status === "open"
        })
        return (
            <div className={className}>
                <div className="dialog">
                    <div className="dialog-header">
                        <span>{modal.title}</span>
                        <i className="iconfont icon-0015guanbi"
                            onClick={this.closeButton_onClick.bind(this)}>
                        </i>
                    </div>
                    {
                        modal.dialog === "sign-up" && <SignUp user={user} dispatch={dispatch} /> 
                    }
                    {
                        modal.dialog === "log-in" && <LogIn user={user} dispatch={dispatch} /> 
                    }
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        modal: state.modal,
        user: state.user
    }
}

export default connect(select)(Modal)