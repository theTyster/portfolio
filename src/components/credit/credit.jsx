import ReactDOM from "react-dom/client";
import React from "react";

function Credit() {
  return (
    <p>A story by Ty ©️ {new Date().getFullYear()}</p>
  );
}

const component = ReactDOM.createRoot(document.getElementById("credit"));
component.render(<Credit />);
