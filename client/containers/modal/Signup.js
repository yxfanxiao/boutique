import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class Signup extends Component {
    submitSignUp() {
        const { dispatch } = this.props 
        const name = this.refs.name.value,
            pwd = this.refs.pwd.value,
            rePwd = this.refs.rePwd.value

        const pwdReg = /^\w{6,12}$/,
            eMailReg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
        if (!eMailReg.test(name)) {
            dispatch(actions.validateName("用户名格式错误"))
        } else {
            if (!pwdReg.test(pwd)) {
                dispatch(actions.validatePWD("密码格式错误"))
            } else {
                if (pwd !== rePwd) {
                    dispatch(actions.validatePWD("密码不一致"))
                } else {
                    dispatch(actions.postSignUp({
                        name,
                        pwd
                    }))
                 }
            }
        }
    }

    render() {
        const { user, dispatch } = this.props
        return (
            <div className="dialog-wrap sign-up">
                <div className="group name">
                    <input type="text" ref="name" placeholder="用户名(邮箱)" />
                </div>
                <div className="group pwd">
                    <input type="password" ref="pwd" placeholder="密码(6-12位, 数字字母下划线)" />
                </div>
                <div className="group rePwd">
                    <input type="password" ref="rePwd" placeholder="确认密码" />
                </div>
                {
                    user.signUpErrorMsg && 
                    <div className="group error">
                        <i className="iconfont icon-iconerror"/>
                        <span className="error-msg">{user.signUpErrorMsg}</span>
                     </div>
                }
                <button onClick={this.submitSignUp.bind(this)}>立即注册</button>
            </div>
        )
    }
}