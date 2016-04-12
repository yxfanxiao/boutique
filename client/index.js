import "./style"

import React, { Component, PropTypes } from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, IndexLink, Redirect, Link, browserHistory } from "react-router"
import { Provider } from "react-redux"
import store from "./store/configureStore"
import reducers from "./reducers"
import * as actions from "./actions"
import { App, IndexContainer, ListContainer, ProductContainer, CartContainer, OrderContainer, OrderListContainer } from "./containers"



// init dispatch
store.dispatch(actions.fetchNav())
store.dispatch(actions.fetchCarousel())
store.dispatch(actions.fetchProductList())



render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route>
                <Route path="/" component={App}>
                    <IndexRoute component={IndexContainer}/>
                    <Route
                        path="list/:categoryId"
                        component={ListContainer}
                    />
                    <Route path="product/:spuId" component={ProductContainer}/>
                    <Route path="my-cart" component={CartContainer}/>
                    <Route path="order" component={OrderContainer}/>
                    <Route path="order/list" component={OrderListContainer}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
