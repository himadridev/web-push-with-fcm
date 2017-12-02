import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const renderRoot = () => {
  ReactDOM.render(
    <div>
      <App />
    </div>,
    document.getElementById("root")
  );
};

renderRoot();
