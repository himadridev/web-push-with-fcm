import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import Notify from "./containers/Notify";

const theme = createMuiTheme();

const styles = {
  "@global body": {
    margin: 0,
    padding: 0,
    fontSize: "16px",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    backgroundColor: "#f7f7f7"
  }
};

const App = ({ classes }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Notify />
    </MuiThemeProvider>
  );
};

export default injectSheet(styles)(App);
