import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import logo from "./logo.svg";

const styles = {
  app: {
    "text-align": "center"
  },
  appLogo: {
    animation: "App-logo-spin infinite 20s linear",
    height: "80px"
  },
  appHeader: {
    "background-color": "#222",
    height: "150px",
    padding: "20px",
    color: "white"
  },
  appTitle: {
    "font-size": "1.5em"
  },
  appIntro: {
    "font-size": "large"
  },
  [`@keyframes ${"App-logo-spin"}`]: {
    from: { transform: "rotate(0deg)" },
    to: { transform: "rotate(360deg)" }
  }
};

const Home = ({ classes }) => {
  return (
    <div className={ classes.app }>
      <header className={ classes.appHeader }>
        <img src={ logo } className={ classes.appLogo } alt="logo" />
        <h1 className={ classes.appTitle }>Welcome to React</h1>
      </header>
      <p className={ classes.appIntro }>
        Start building your web app.
      </p>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Home);
