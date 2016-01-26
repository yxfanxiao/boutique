import "./style";

import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";
import App from "./containers/App";
import { getAllProducts } from "./actions";

const devMode = process.env.NODE_ENV !== "production";
const middleware = devMode
    ? [ thunk, logger() ]
    : [ thunk ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

// Enable Webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept("./reducers", () => {
        const nextReducers = require("./reducers");
        store.replaceReducer(nextReducers);
    })
}

// init dispatch
store.dispatch(getAllProducts());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
