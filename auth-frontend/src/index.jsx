import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Loginpage.jsx"; // or wherever your App component is
import "./index.css"; // THIS IS CRUCIAL

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
