import React, { Component, PropTypes } from "react"
import { Link, IndexLink } from "react-router"
import { connect } from "react-redux"
import * as actions from "../../actions"
import { ProductsList } from "../../components"

class ListContainer extends Component {

    componentDidMount() {
        const { categoryId } = this.props.params
        const { products, dispatch } = this.props

        if (products.currentList !== categoryId) {
            dispatch(actions.receiveList(categoryId))
        }
    }

    componentDidUpdate(prevProps, prevState) {
        const { categoryId } = this.props.params
        const { products, dispatch } = this.props

        if (products.currentList !== categoryId) {
            dispatch(actions.receiveList(categoryId))
        }
    }

    render() {
        const { categoryId } = this.props.params
        const { dispatch } = this.props,
            { list, products } = this.props.products.list,
            p = []

        for (let subCategory in list) {
            p.push(subCategory)
        }
        return (
            <div>
            {
                p.map((subCategory, i) => {
                    return (
                        <div key={subCategory}>
                            <h1>{subCategory}</h1>
                            <div>
                                <h1>{list[subCategory].title}</h1>
                                <h3>{list[subCategory].desc}</h3> 
                                <ProductsList
                                    productList={list[subCategory].products.map((spuId) => products[spuId])}
                                    category={subCategory}
                                />
                            </div>
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

export default connect(select)(ListContainer)