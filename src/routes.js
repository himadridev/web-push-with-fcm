import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Welcome from "./components/Welcome";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact={ true } path="/" component={ Welcome } />
      </Switch>
    </Router>
  );
};

export default Routes;
