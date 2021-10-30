import React from "react";
import ReactDom from "react-dom";
// import { BrowserRouter as Router,Route,Link,Switch, } from 'react-router-dom'
// import Redirect from "./test/router/redirect/redirect";
import App from "./App.js";
// import { Router } from "react-router-dom";
// import history from "./history";

ReactDom.render(
  //   <Router history={history}>
  <App />,
  //   </Router>,
  document.getElementById("root")
);
