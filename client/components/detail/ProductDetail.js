import React, { Component, PropTypes } from "react"

export default class ProductDetail extends Component {
    render() {
        const { product } = this.props

        return (
            <div className="product-detail">
                <div className="detail-top">
                    <div className="slide">
                        <div className="view">
                            <img src={product.src[1]}/>
                        </div>
                        <div className="list">
                        {
                            product.src.map((s, i) => <div className="j-thumb" key={i}><img src={s} /></div>)
                        }
                        </div>
                    </div>
                    <div className="info">
                        <div className="intro">
                            <div className="name">{product.name}</div>
                            <div className="desc">{product.desc}</div>
                        </div> 
                        <div className="price"></div>
                        <div className="j-param">
                        {
                            product.skuSpecList.map((spec, i) => { 
                                return spec.type === 0  
                                    ? (
                                        <div className="param" key={i}>
                                            <span className="name">{spec.name}</span>
                                            <div className="field">
                                                <ul className="m-tabs">
                                                {
                                                    spec.skuSpecValueList.map((specValue, j) => (<li className="tab" key={j}><span className="txt">{specValue.value}</span></li>))
                                                }
                                                </ul>
                                            </div>
                                        </div> 
                                    ): (
                                        <div className="param" key={i}>
                                            <span className="name">{spec.name}</span>
                                            <div className="field">
                                                <ul className="m-tabs">
                                                {
                                                    spec.skuSpecValueList.map((specValue, j) => (<li className="tab" key={j}><span className="txt">{specValue.value}</span></li>))
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                            })
                        }
                        </div>
                    </div>
                </div>
                <div className="detail-bottom">
                    123
                </div>
            </div>
        )    
    }
}