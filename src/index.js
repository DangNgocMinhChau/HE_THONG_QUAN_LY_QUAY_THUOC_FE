import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./static/sb-admin-2.css";
import "./static/sb-admin-2.min.css";
import "./static/style.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import vi_VN from "antd/lib/locale-provider/vi_VN";
import { ConfigProvider } from "antd";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const { PUBLIC_URL } = process.env;
const store = createStore(
  appReducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  composeEnhancer(applyMiddleware(thunk))
);

ReactDOM.render(
  <ConfigProvider locale={vi_VN}>
    <App store={store} basename={PUBLIC_URL} />
  </ConfigProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
