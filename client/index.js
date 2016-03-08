import "./style"

import React, { Component, PropTypes } from "react"
import { render } from "react-dom"
import { Router, Route, IndexRoute, IndexLink, Redirect, Link, browserHistory } from "react-router"
import { Provider } from "react-redux"
import store from "./store/configureStore"
import reducers from "./reducers"
import * as actions from "./actions"
import { App, IndexContainer, ListContainer } from "./containers"



// init dispatch
store.dispatch(actions.fetchCarousel())
store.dispatch(actions.getAllProducts())



render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route>
                <Route path="/" component={App}>
                    <IndexRoute component={IndexContainer}/>
                    <Route path="list" component={ListContainer}/>
                </Route>
            </Route>
        </Router>
    </Provider>,
    document.getElementById("root")
)
