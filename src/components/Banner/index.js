import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import logo from "./bell-icon-72x72.png";

const styles = {
  app: {
    height: "72px",
    padding: "16px",
    backgroundColor: "#222",
    display: "flex"
  },
  appLogo: {
    marginRight: "16px"
  },
  appTitle: {
    fontSize: "1.5em"
  },
  appSubTitle: {
    fontWeight: 100
  },
  details: {
    width: "100%",
    color: "white",
    display: "flex",
    textAlign: "center",
    flexDirection: "column",
    marginTop: "10px"
  }
};

const Home = ({ classes }) => {
  return (
    <div className={ classes.app }>
      <img src={ logo } className={ classes.appLogo } alt="logo" />
      <span className={ classes.details }>
        <span className={ classes.appTitle } > Web Push Notification </span>
        <span className={ classes.appSubTitle }>with Firebase Cloud Messaging.</span>
      </span>
    </div>
  );
};

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Home);
