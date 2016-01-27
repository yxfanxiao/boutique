import "./style";

import React, { Component, PropTypes } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import store from "./store/configureStore";
import reducers from "./reducers";
import * as actions from "./actions";


// init dispatch
store.dispatch(actions.fetchCarousel());
store.dispatch(actions.getAllProducts());



render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
