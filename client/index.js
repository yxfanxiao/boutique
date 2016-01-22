import "./style";

import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";
import App from "./containers/App";
import { getAllProducts } from "./actions";

const middleware = process.env.NODE_ENV === "production" ? [ thunk ] : [ thunk, logger() ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

store.dispatch(getAllProducts());

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
