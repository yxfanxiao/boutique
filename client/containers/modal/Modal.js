import "./style"

import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import Signup from "./Signup"

class Modal extends Component {

    componentWillMount() {
        document.querySelector("body").className = "modal-open"
    }

    componentWillUnmount() {
        document.querySelector("body").className = ""
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
                        <span>注册</span>
                        <i className="iconfont icon-0015guanbi"
                            onClick={() => dispatch(actions.closeModal())}>
                        </i>
                    </div>
                    <Signup user={user} dispatch={dispatch} />
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