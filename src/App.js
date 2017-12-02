import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

import Routes from "./routes";

const styles = {
  "@global body": {
    margin: "0",
    padding: "0"
  }
};

const App = ({ classes }) => {
  return (
    <div className="App">
      <Routes />
    </div>
  );
};

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(App);
