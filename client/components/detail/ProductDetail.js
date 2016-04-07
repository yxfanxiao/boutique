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

    componentWillUpdate(prevProps, prevState) {
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

    addToCart() {
        const { detail, user, cart, products, dispatch } = this.props 
        if (!user.login) {
            dispatch(actions.openModal("log-in", "登录"))
            return
        }
        const { selectedPara, quantity } = detail 
        const { currentProduct } = products
        const { name } = user.signUp

        const paras = `${selectedPara}`.split(";")
        const len = paras.length,
            para = []
        if (len === 1) {
            products.product.skuSpecList[0].skuSpecValueList.forEach(p => {
                if (p.id === +paras[0]) {
                    para.push(p.value)
                }
            })
        } else {
            products.product.skuSpecList.forEach(s => {
                s.skuSpecValueList.forEach(p => {
                    if (p.id === +paras[0] || p.id === +paras[1]) {
                        para.push(p.value)
                    }
                })
            })
        }
        dispatch(actions.fetchAddToCart({
            userName: name,
            spuId: currentProduct,
            skuId: selectedPara,
            pic: detail.thumbSrc,
            para,
            quantity,
            retailPrice: products.product.skuMap[selectedPara].retailPrice
        }))
    }

    purchaseRightNow() {

    }

    _thumb_onSelected(e) {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        
        const src = e.currentTarget.currentSrc
        if (src && detail.thumbSrc !== src) {
            dispatch(actions.selectThumbSrc(src))
        }
    }

    _para_onClick(paraId, e) {
        const { detail, dispatch } = this.props
        const targetId = e.currentTarget.getAttribute("data-id"),
            para = `para${paraId}`
        if (targetId && targetId !== detail.para) {
            dispatch(actions.selectPara(targetId, para))
        }
    }

    render() {
        const { products, detail, dispatch, spuId } = this.props,
            { product } = products        
        const { para0, para1 } = detail 

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
                        <div className="price">
                            <div className="name">售价</div>
                            <div className="desc">
                            {
                                para0 && para1 && product.skuMap[`${para0};${para1}`].retailPrice
                            }
                            {
                                para0 && !para1 && product.skuMap[para0].retailPrice
                            }
                            {
                                !para0 && para1 && product.skuMap[para1].retailPrice
                            }
                            </div>
                        </div>
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
                                                    spec.skuSpecValueList.map((specValue, j) => {
                                                        const className = classNames({
                                                            tab: true,
                                                            "tab-txt": true,
                                                            selected: specValue.id === detail.para0
                                                        })
                                                        return (<li className={className} key={j} data-id={specValue.id} data-value={specValue.value} onClick={this._para_onClick.bind(this, 0)}><span className="txt">{specValue.value}</span></li>)
                                                    })
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
                                                    spec.skuSpecValueList.map((specValue, j) => {
                                                        const className = classNames({
                                                            tab: true,
                                                            "tab-img": true,
                                                            selected: specValue.id === detail.para1
                                                        })
                                                        return (<li className={className} key={j} data-id={specValue.id} data-value={specValue.value}  onClick={this._para_onClick.bind(this, 1)}><img title={specValue.value} src={specValue.picUrl} onClick={this._thumb_onSelected.bind(this)} className={"thumb"}></img></li>)
                                                    })
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
                            <div className="purchase-detail" onClick={this.purchaseRightNow.bind(this)}>立即购买</div>
                            <div className="add-detail-to-cart" onClick={this.addToCart.bind(this)}><i className="iconfont icon-cart2"></i>加入购物车</div>
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