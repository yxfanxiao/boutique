import React, { Component, PropTypes } from "react"
import * as actions from "../../actions"

export default class CreateNewAddress extends Component {
    submitAddress() {
        const { user, dispatch } = this.props 
        const person = this.refs.person.value,
            tel = this.refs.tel.value,
            address = this.refs.address.value
     
        const telReg = /^\d{10,11}$/
        if (!person) {
            dispatch(actions.validateErr("收货人不能为空"))
        } else {
            if (!telReg.test(tel)) {
                dispatch(actions.validateErr("手机格式错误"))
            } else {
                if (!address) {
                    dispatch(actions.validateErr("请正确填写收货地址"))
                } else {
                    dispatch(actions.postAddress(user.signUp.name, {
                        person,
                        tel,
                        address
                    }))
                }
            }
        }
    }


    render() {
        const { user, dispatch } = this.props
        return (
            <div className="dialog-wrap create-new-address">
                <div className="group receive-person">
                    <input type="text" ref="person" placeholder="收货人" />
                </div>
                <div className="group receive-tel">
                    <input type="text" ref="tel" placeholder="联系方式（手机号码" />
                </div>
                <div className="group receive-address">
                    <input type="text" ref="address" placeholder="收货地址" />
                </div>
                {
                    user.errorMsg && 
                    <div className="group error">
                        <i className="iconfont icon-iconerror"/>
                        <span className="error-msg">{user.errorMsg}</span>
                     </div>
                }
                <button onClick={this.submitAddress.bind(this)}>确定</button>
            </div>
        )
    }
}