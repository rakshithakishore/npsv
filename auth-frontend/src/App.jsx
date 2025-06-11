import React, { useEffect, useState } from "react";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";

import JoinForm from "./Components/JoinForm.jsx";
import Login from "./Loginpage.jsx";
import Conference from "./Components/Conference.jsx";
import Footer from "./Components/Footer.jsx";
import Chat from "./Components/Chat.jsx";
import Participant from "./Components/Participants.jsx";

import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  const handleLoginSuccess = (name, email) => {
    setUserName(name);
    setUserEmail(email);
    setIsLoggedIn(true);
    navigate("/"); // redirect to home
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="App">
            {isConnected ? (
              <>
                <div className="main-layout">
                  <Conference />
                  <Chat />
                </div>
                <Footer />
              </>
            ) : isLoggedIn ? (
              <JoinForm userName={userName} email={userEmail} />
            ) : (
              <Login onLoginSuccess={handleLoginSuccess} />
            )}
          </div>
        }
      />
      <Route
        path="/participants"
        element={
          isConnected ? (
            <Participant />
          ) : (
            <div style={{ color: "white", padding: "2rem" }}>
              ⚠️ You must be in a call to manage participants.
            </div>
          )
        }
      />
    </Routes>
  );
}

export default App;
