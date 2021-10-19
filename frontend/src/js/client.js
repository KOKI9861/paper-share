import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Layout from "./components/Layout";
import store from "./store";
import Submit from "./components/Submit";
import Content from "./components/content";
const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <Layout />
    {/* <Content /> */}
  </Provider>, app);