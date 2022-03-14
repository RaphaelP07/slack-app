import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Login from "./components/Login";
import Register from "./components/Register";
import Setup from "./components/Setup";
import ErrorPage from "./components/ErrorPage";

import { GlobalProvider } from './context/GlobalState';

function App() {
  const [loggedUser, setLoggedUser] = useState("");

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/slack-app/" element={<Login loggedUser={loggedUser} setLoggedUser={(email) => setLoggedUser(email)} />} />
          <Route path="/slack-app/register" element={<Register />} />
          <Route path="/slack-app/setup" element={<Setup loggedUser={loggedUser} />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path='slack-app/dashboard' element={<Dashboard loggedUser={loggedUser}/>} />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
