import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"

class AddContainer extends Component {
    handleNav(e) {
        this.setState({
            navId: e.target.value,
        })
    }
    handleCate(e) {
        this.setState({
            cateId: e.target.value,
        })
    }
    handleSku(e) {
        this.setState({
            sku: e.target.value,
        })
    }
    handlePrice(e) {
        this.setState({
            price: e.target.value,
        })
    }
    handleTitle(e) {
        this.setState({
            title: e.target.value,
        })
    }
    handleDesc(e) {
        this.setState({
            desc: e.target.value,
        })
    }
    handleThumb(e) {
        this.setState({
            thumb: e.target.value,
        })        
    }
    handleClick(e) {
        fetch("/v1/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state)
        }).then(res => res.json())
            .then(data => {
                if (data.status === 200) {
                    alert("save successfully!")
                } else {
                    alert("save occurs error!")
                }
            })
    }

    componentWillMount() {
        this.setState({
        })     
    }
    componentDidMount() {
        const { nav, dispatch } = this.props
        this.setState({
            navId: nav.nav[0] && nav.nav[0].categoryId,
        })

    }
    render() {
        const { user, admin, nav, dispatch } = this.props
        const { subCate } = nav
        return (
            <div className="child-container add-container">
                <div className="admin-form">
                    <div className="group">
                        <div className="label">产品名称</div>
                        <input type="text" placeholder="enter..."  onChange={this.handleTitle.bind(this)}/>
                    </div>
                    <div className="group">
                        <div className="label">简短描述</div>
                        <input type="text" placeholder="enter..."  onChange={this.handleDesc.bind(this)}/>                    
                    </div>
                    <div className="group">
                        <div className="label">选择类目</div>
                        <select id="select-nav" style={{ width: 200 }} name="nav" onChange={this.handleNav.bind(this)}>
                        {
                            nav.nav.map(n => <option key={n.title} value={n.categoryId}>{n.title}</option>)
                        }
                        </select>
                        <select id="select-2-nav" style={{ width: 200 }}  onChange={this.handleCate.bind(this)}>
                        {
                            this.state.navId
                            &&
                            nav.nav.filter(n => n.categoryId === this.state.navId)
                               .map(n => n.subCategoryId.map(m => <option key={m} value={m}>{nav.subCate[m].title}</option>))
                        }
                        </select>
                    </div>
                    <div className="group">
                        <div className="label">SKU</div>
                        <input type="text" placeholder="enter..."  onChange={this.handleSku.bind(this)}/>                    
                    </div>
                    <div className="group">
                        <div className="label">价格</div>
                        <input type="text" placeholder="enter..."  onChange={this.handlePrice.bind(this)}/>                    
                    </div>
                    <div className="group">
                        <div className="label">上传缩略图</div>
                        <input type="text" placeholder="url..."  onChange={this.handleThumb.bind(this)}/>                    
                    </div>
                    <div className="group">
                        <div className="label"></div>
                        <input type="submit" className="submit" name="submit" value="确定" onClick={this.handleClick.bind(this)}/>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        dispatch: state.dispatch,
        user: state.user,
        nav: state.nav,
        admin: state.admin,
    }
}

export default connect(select)(AddContainer)