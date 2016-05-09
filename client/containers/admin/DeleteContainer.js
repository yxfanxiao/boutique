import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import * as actions from "../../actions"

class DeleteContainer extends Component {
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
    deleteProduct(e) {
        if (e.target.id) {
            fetch(`/v1/product/${e.target.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        this.setState({
                            products: this.state.products.filter(p => p.spuId !== e.target.id)
                        })
                        alert("删除成功！")
                    } else {
                        alert("delete error!")
                    }
                })

        }
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
    componentWillUpdate() {
        const nav = this.refs["nav"].value, 
            cate = this.refs["cate"].value
        if (nav && cate && cate != this.state.cateId) {
            fetch("/v1/cate/" + cate)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 200) {
                        this.setState({
                            products: data.data
                        })
                    } else {
                        alert("product error!")
                    }
                })
        }
    }
    render() {
        const { user, nav, dispatch } = this.props
        return (
            <div className="child-container delete-container">
                <div className="admin-form">
                    <div className="group">
                        <div className="label">选择类目</div>
                        <select id="select-nav" ref="nav"  style={{ width: 200 }} name="nav" onChange={this.handleNav.bind(this)}>
                        {
                            nav.nav.map(n => <option key={n.title} value={n.categoryId}>{n.title}</option>)
                        }
                        </select>
                        <select id="select-2-nav" ref="cate" style={{ width: 200 }}  onChange={this.handleCate.bind(this)}>
                        {
                            this.state.navId
                            &&
                            nav.nav.filter(n => n.categoryId === this.state.navId)
                               .map(n => n.subCategoryId.map((m, i) => <option key={i} value={m}>{nav.subCate[m].title}</option>))
                        }
                        </select>
                    </div>
                    <div className="group">
                        {
                            this.state.products &&
                            <div className="wrap">
                            {
                                this.state.products.map((p, i) => (
                                    <div className="products" key={i}>
                                        <img className="" src={p.src[0]}></img>
                                        <span className="title">{p.name}</span>
                                        <span className="desc">{p.desc}</span>
                                        <span className="delete" id={`${p.spuId}`} onClick={this.deleteProduct.bind(this)}>删除</span>
                                    </div>
                                ))
                            }
                            </div>
                        }
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
    }
}

export default connect(select)(DeleteContainer)