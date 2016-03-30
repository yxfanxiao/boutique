import React, { Component, PropTypes } from "react"
import Count from "../count"
import * as actions from "../../actions"

export default class ProductDetail extends Component {
    componentWillMount() {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        
        if (detail.reloadFlag && product.spuId === spuId) {
            dispatch(actions.reloadDetail(product))
        }
        if (detail.reloadNavFlag && product.spuId === spuId && (products.currendList !== product.navId)) {
            dispatch(actions.confirmNav(product.navId))
            dispatch(actions.reloadNav())
        }
    }

    componentWillUnmount() {
        const { dispatch } = this.props
        dispatch(actions.resetReloadFlag())
        dispatch(actions.resetNav())
        dispatch(actions.confirmNav(""))
    }

    componentDidUpdate(prevProps, prevState) {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        

        if (detail.reloadFlag && product.spuId === spuId) {
            dispatch(actions.reloadDetail(product))
        }
        if (detail.reloadNavFlag && product.spuId === spuId && (products.currentList !== product.navId)) {
            dispatch(actions.confirmNav(product.navId))
            dispatch(actions.reloadNav())
        }
    }

    _thumb_onSelected(e) {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        
        const src = e.currentTarget.currentSrc
        if (src && detail.thumbSrc !== src) {
            dispatch(actions.selectThumbSrc(src))
        }
    }

    _para_onClick() {

    }

    render() {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        

        return (
            <div className="product-detail">
                <div className="detail-top">
                    <div className="slide">
                        <div className="view">
                            <img className="" src={detail.thumbSrc}/>
                        </div>
                        <div className="list">
                        {
                            product.src.map((s, i) => s ? <div className="j-thumb" key={i}><img src={s} className={detail.thumbSrc === s && "active"} onMouseEnter={this._thumb_onSelected.bind(this)} /></div> : null)
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
                                        <div className="param param-txt" key={i}>
                                            <span className="name">{spec.name}</span>
                                            <div className="field">
                                                <ul className="m-tabs">
                                                {
                                                    spec.skuSpecValueList.map((specValue, j) => (<li className="tab tab-txt" key={j}><span className="txt" onClick={this._para_onClick.bind(this)}>{specValue.value}</span></li>))
                                                }
                                                </ul>
                                            </div>
                                        </div> 
                                    ): (
                                        <div className="param param-img" key={i}>
                                            <span className="name">{spec.name}</span>
                                            <div className="field">
                                                <ul className="m-tabs">
                                                {
                                                    spec.skuSpecValueList.map((specValue, j) => (<li className="tab tab-img" key={j}><img title={specValue.value} src={specValue.picUrl} onClick={this._thumb_onSelected.bind(this)} className={"thumb"}></img></li>))
                                                }
                                                </ul>
                                            </div>
                                        </div>
                                    )
                            })
                        }
                        </div>
                        <div className="detail-quantity">
                            <div className="name">数量</div>
                            <Count detail={detail} dispatch={dispatch}/>
                        </div>
                        <div className="detail-purchase">
                            <div className="purchase-detail">立即购买</div>
                            <div className="add-detail-to-cart"><i className="iconfont icon-cart2"></i>加入购物车</div>
                        </div>
                    </div>
                </div>
                <div className="detail-bottom">
                    <div className="left">
                        <div className="nav"><span className="title">详情</span></div>
                        <div className="detail-img" dangerouslySetInnerHTML={{__html: product.detailHtml}}></div>
                    </div>
                    <div className="right">
                        <div className="detail-attr">
                            <div className="title">产品参数</div>
                            <div className="attrList">
                            {
                                product.attributes.map((attr, i) => (<div className="attr" key={i}><span className="attr-name">{attr.attrName}</span><span className="attr-value">{attr.attrValue}</span></div>))
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )    
    }
}