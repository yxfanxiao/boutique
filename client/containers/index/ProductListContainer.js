import React, { Component, PropTypes } from "react"
import { connect } from "react-redux"
import { ProductsList } from "../../components"
import { Link, IndexLink } from "react-router"

class ProductsContainer extends Component {
    render() {
        const { products } = this.props
        const p = []
        for (let category in products.productList) {
            p.push(category)
        }
        return (
            <div className="products-container">
            {
                p.map((category, i) => {
                    return (
                        <div key={category}>
                            <div className="list-header">
                                <span className="title">{products.productList[category].title}</span>
                                <span className="desc">{products.productList[category].desc}</span>
                            </div>
                            <ProductsList 
                                productList={products.productList[category].recommendProducts}
                                category={category}
                            />
                            <Link className="more-details" to={`/list/${category}`}>更多{products.productList[category].title}好物<i className="iconfont icon-xiangyou" /></Link>
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
        products: state.products
    }
}

export default connect(select)(ProductsContainer)