import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import { createStore, applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { Provider } from "react-redux";

// CENTRAL STORE
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
