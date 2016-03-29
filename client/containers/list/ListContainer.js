import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import { connect } from "react-redux"
import * as actions from "../../actions"
import { ProductsList } from "../../components"
import "./style"

class ListContainer extends Component {

    componentDidMount() {
        const { categoryId } = this.props.params
        const { products, dispatch, nav } = this.props

        nav  || dispatch(actions.fetchNav())
        if (products.currentList !== categoryId) {
            dispatch(actions.receiveList(categoryId))

        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.props.params
        const { products, dispatch, nav } = this.props

        nav  || dispatch(actions.fetchNav())
        if (products.currentList !== categoryId) {
            dispatch(actions.receiveList(categoryId))
            dispatch(actions.fetchNav())
        }
    }

    render() {
        const { categoryId } = this.props.params
        const { dispatch, nav } = this.props,
            { list, products } = this.props.products.list,
            p = []

        for (let subCategory in list) {
            p.push(subCategory)
        }
        const currentCategory = nav.nav.filter((n, i) => n.categoryId === categoryId)
        return (
            <div className="list-container">
            {
                categoryId && currentCategory.length && 
                    <div className="cate-banner" 
                        style={{backgroundImage: currentCategory[0].src}}>
                        <h2 style={{backgroundImage: "url(http://yanxuan.nosdn.127.net/809a9dced054facf5506b452f963ecca.png)"}}>{currentCategory[0].desc}</h2>
                    </div>
            }
            {
                p.map((subCategory, i) => {
                    return (
                        <div key={subCategory} className="lists">
                            <div className="list-header">
                                <div className="list-title">
                                    <img className="list-icon" src={list[subCategory].icon} />
                                    <span className="list-title">{list[subCategory].title}</span>
                                </div>
                                <div className="list-desc">{list[subCategory].desc}</div>
                            </div>
                            <ProductsList
                                productList={list[subCategory].products.map((spuId) => products[spuId])}
                                category={subCategory}
                            />
                        </div>
                    )
                })
            }
            </div>
        )
    }
}


function select(state) {
    return {
        products: state.products,
        nav: state.nav
    }
}

export default connect(select)(ListContainer)