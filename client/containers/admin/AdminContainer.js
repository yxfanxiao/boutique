import "./style"
import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"
import { Link, IndexLink } from "react-router"


class AdminContainer extends Component {
    componentDidMount() {
        const { dispatch } = this.props
    }
    render() {
        const { user, nav, dispatch } = this.props
        if (!user.login || user.signUp.name !== "admin@qq.com") {
            return (
                <div className="admin-container">               
                    <span className="warning">你无权进入该页面！</span>
                </div>
            )
        }
        return (
            <div className="admin-container">
                <div className="admin-operation">
                    <Link to="/admin/add" activeStyle={{color: 'red', borderLeft: '3px solid red'}}><span className="add">上传新商品</span></Link>
                    <Link to="/admin/delete"  activeStyle={{color: 'red', borderLeft: '3px solid red'}}><span className="delete">删除商品</span></Link>     
                </div>
                {
                    this.props.children
                }
            </div>
        )
    }
}

function select(state) {
    return {
        dispatch: state.dispatch,
        user: state.user,
        nav: state.nav,
    }
}

export default connect(select)(AdminContainer)