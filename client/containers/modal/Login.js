import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class logIn extends Component {
    submitLogin() {
        const { dispatch } = this.props 
        const name = this.refs.name.value,
            pwd = this.refs.pwd.value
     
        const pwdReg = /^\w{6,12}$/,
            eMailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (!eMailReg.test(name)) {
            dispatch(actions.validateName("用户名格式错误"))
        } else {
            if (!pwdReg.test(pwd)) {
                dispatch(actions.validatePWD("密码格式错误"))
            } else {
                dispatch(actions.postLogIn({
                    name,
                    pwd
                }))
            }
        }
    }

    render() {
        const { user, dispatch } = this.props
        return (
            <div className="dialog-wrap log-in">
                <div className="group name">
                    <input type="text" ref="name" placeholder="用户名(邮箱)" value="liu@qq.com" />
                </div>
                <div className="group pwd">
                    <input type="password" ref="pwd" placeholder="密码(6-12位, 数字字母下划线)" value="123456" />
                </div>
                {
                    user.errorMsg && 
                    <div className="group error">
                        <i className="iconfont icon-iconerror"/>
                        <span className="error-msg">{user.errorMsg}</span>
                     </div>
                }
                <button onClick={this.submitLogin.bind(this)}>立刻登录</button>
            </div>
        )
    }
}