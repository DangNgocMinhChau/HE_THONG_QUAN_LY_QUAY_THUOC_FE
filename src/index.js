import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./static/sb-admin-2.css";
import "./static/sb-admin-2.min.css";
import "./static/style.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { applyMiddleware, compose, createStore } from "redux";
import appReducers from "./reducers/index";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import thunk from "redux-thunk";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "font-awesome/css/font-awesome.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  appReducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
