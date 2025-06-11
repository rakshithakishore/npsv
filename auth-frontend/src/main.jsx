import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // ✅ import

import "./index.css";
import { HMSRoomProvider } from "@100mslive/react-sdk";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {" "}
      {/* ✅ Wrap App here */}
      <HMSRoomProvider>
        <App />
      </HMSRoomProvider>
    </BrowserRouter>
  </React.StrictMode>
);
