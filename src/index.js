import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";

import burgerReducer from "./store/reducers/burgerBuilderReducer";
import orderReducer from "./store/reducers/orderReducer";
import ordersReducer from "./store/reducers/ordersReducer";
import authReducer from "./store/reducers/authReducer";

/*
 Connecting redux devtools to our app:
 --------------------------------------
  1) If you want the redux devtools be available in both production and devlopment use that statement:
     const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  2) If you want youe redux devtools to be only available in development (not in production), we use environment varaiables. ex: 
      const composeEnhancer = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
*/
const composeEnhancer =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

// Compining oure reducers
const reducer = combineReducers({
  burger: burgerReducer,
  order: orderReducer,
  orders: ordersReducer,
  auth: authReducer,
});

// Creating the store, and we pass to it as a second argument our enhancer that has configuration for redux devtools and thunk middleware
const store = createStore(reducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
