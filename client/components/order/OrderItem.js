import React, { Component, PropTypes } from "react"

export default class OrderItem extends Component {
    render() {
        const { order, item } = this.props 

        // will move to util
        Date.prototype.Format = function(fmt)   
        {
          var o = {   
            "M+" : this.getMonth()+1,                 //月份   
            "d+" : this.getDate(),                    //日   
            "H+" : this.getHours(),                   //小时   
            "m+" : this.getMinutes(),                 //分   
            "s+" : this.getSeconds(),                 //秒   
            "q+" : Math.floor((this.getMonth()+3)/3), //季度   
            "S"  : this.getMilliseconds()             //毫秒   
          };   
          if(/(y+)/.test(fmt))   
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
          for(var k in o)   
            if(new RegExp("("+ k +")").test(fmt))   
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
          return fmt;   
        }  


        return (
            <div className="order-item">
                <div className="header">
                    <div className="time">
                        <span className="title">下单时间</span>
                        <span className="value">{(new Date(item.create_at)).Format("yyyy-MM-dd HH:mm:ss")}</span>
                    </div>
                    <div className="id">
                        <span className="title">订单号</span>
                        <span className="value">{item._id.substr(0, 8)}</span>
                    </div>
                </div>
                <div className="body">
                {
                    item.carts.map((c, i) => {
                        const cart = order.carts[c]
                        return (
                            <div className="group" key={i}>
                                <img className="" src={cart.pic}></img>
                                <span className="title">{cart.title}</span>
                                <div className="params">
                                {
                                    cart.para.map((p, i) => <span className="para" key={i}>{p}</span>)
                                }
                                </div>  
                                <span className="quantity">{cart.quantity}</span>
                                <span className="price">{cart.retailPrice * cart.quantity}</span>
                            </div>
                        )
                    })
                }
                </div>
            </div>
        )
    }
}