import Login from "./components/Login";
import Register from "./components/Register";
import Setup from "./components/Setup";
import ErrorPage from "./components/ErrorPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./context/GlobalState";
import { useState } from "react";

function App() {
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <Login loggedUser={loggedUser} setLoggedUser={setLoggedUser} />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/setup" element={<Setup loggedUser={loggedUser} />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
