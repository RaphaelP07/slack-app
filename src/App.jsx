import './App.css';
import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'
import Chat from './components/Chat'

import { GlobalProvider } from './context/GlobalState';

function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <Router>
      <GlobalProvider>
        <Routes>
          <Route
            path='slack-app/dashboard'
            element={
              <div className="main-container">
                <Header />
                <SideBar />
                <Chat />
              </div>
            }
          />
        </Routes>
      </GlobalProvider>
    </Router>
  );
}

export default App;
