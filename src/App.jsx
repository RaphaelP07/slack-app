import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Setup from "./components/Setup";
import ErrorPage from "./components/ErrorPage";
import Popup from "./components/Popup";

import { GlobalProvider } from "./context/GlobalState";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedID, setLoggedID] = useState("");
  // const [headers, setHeaders] = useState({})

  useEffect(() => {
    localStorage.getItem("loggedUser") !== null &&
      setLoggedUser(localStorage.getItem("loggedUser"));
  }, []);

  useEffect(() => {
    localStorage.getItem("loggedID") !== null &&
      setLoggedID(localStorage.getItem("loggedID"));
  }, []);

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/slack-app/"
            element={
              <Login
                loggedUser={loggedUser}
                setLoggedUser={(email) => setLoggedUser(email)}
                setLoggedID={(id) => setLoggedID(id)}
              />
            }
          />
          <Route path="/slack-app/register" element={<Register />} />
          <Route
            path="/slack-app/setup"
            element={<Setup loggedUser={loggedUser} />}
          />
          <Route
            path="slack-app/popup"
            element={<Popup loggedUser={loggedUser} loggedID={loggedID} />}
          />
          <Route path="*" element={<ErrorPage />} />
          <Route
            path="slack-app/dashboard"
            element={<Dashboard loggedUser={loggedUser} loggedID={loggedID} />}
          />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
