import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { Link, IndexLink } from "react-router"
import { Nav } from "../../components"
import * as actions from "../../actions"
import "./style"

class Header extends Component {
    componentDidUpdate() {
        const { user, cart, dispatch } = this.props     
        console.log(111111111111, user.login, cart.cart)
        if (user.login && !cart.cart) {
            dispatch(actions.fetchCart(user.signUp.name))
        }
    }

    render() {
        const { nav, currentList, cart, modal, user, dispatch } = this.props
        return (
            <div className="header">
                <div className="menu-wrap">
                    <div className="menu">
                        <div className="logo-wrap">
                            <Link to="/"  className="logo" onClick={() => dispatch(actions.returnToIndex())}>
                                <i className="iconfont icon-02jingpinrentiao"></i>
                            </Link>
                            <span className="declare">品味良好的生活，从这里开始</span>
                        </div>
                        <div className="user-wrap">
                        {
                            user.login
                                ? <div className="user">{user.signUp.name}</div>
                                : <div className="user">
                                    <span className="log-in" onClick={() => dispatch(actions.openModal("log-in", "登录"))}>登录</span>
                                    <b>|</b>
                                    <span className="sign-up" onClick={() => dispatch(actions.openModal("sign-up", "注册"))}>注册</span>
                                  </div>
                        }
                        </div>
                    </div>
                </div>
                <div className="nav-wrap">
                    <Nav nav={nav} currentList={currentList} dispatch={dispatch} />
                    <div className="cart-button">
                        <Link to="/my-cart">
                            <i className="iconfont icon-cart2" />
                            <span>购物车</span>
                            <span className="quality">{cart.quantity}</span>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        nav: state.nav,
        currentList: state.products.currentList,
        modal: state.modal,
        user: state.user,
        cart: state.cart
    }
}

export default connect(select)(Header)