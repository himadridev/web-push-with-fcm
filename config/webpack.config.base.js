const paths = require("./paths");

module.exports = {
  context: paths.appSrc,
  entry: {
    vendor: [
      "react",
      "react-dom",
      "react-jss",
      "prop-types",
      "react-router-dom",
      "redux",
      "react-redux",
      "redux-saga",
      "localforage"
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"],
    modules: [paths.appSrc, "node_modules"],
    alias: {
      // create aliases here
    }
  }
};
