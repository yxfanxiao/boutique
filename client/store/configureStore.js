import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "../reducers";

const devMode = process.env.NODE_ENV !== "production";
const middleware = devMode
    ? [ thunk, logger() ]
    : [ thunk ];
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);


// Enable Webpack hot module replacement for reducers
if (module.hot) {
    module.hot.accept("../reducers", () => {
        const nextReducers = require("../reducers");
        store.replaceReducer(nextReducers);
    })
}


export default store;