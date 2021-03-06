/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import NewsPage from "views/News/News.js";
import MediaMetionsCore from "views/MediaMetionsCore/MediaMetionsCore.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";
//import 'bootstrap/dist/css/bootstrap.css';
//import 'bootstrap/dist/css/bootstrap.min.css';

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/admin" component={Admin} />
      {/* <Route path="/rtl" component={RTL} /> */}
      {/* <Route path="/news" component={NewsPage} />
    <Route path="/MediaMetionsCore" component={MediaMetionsCore} /> */}
      <Redirect from="/" to="/admin/dashboard" />
      <Redirect from="/" to="/news" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
