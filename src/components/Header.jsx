import React, { useContext } from 'react'
import logo from '../images/slack-logo.png'
import { Link } from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';

const Header = () => {
  const { clearStates } = useContext(GlobalContext)

  const signOutClear = () => {
    localStorage.clear()
    clearStates()
    console.log('clear')
  }
  return (
    <header className='dashboard-header'>
      <div className="logo-container">
          <img src={logo} className="slack-logo" alt="slack-logo" onClick={() => window.location.reload()}/>
      </div>
      <Link to="/slack-app">
        <button className='sign-out' onClick={signOutClear}>Sign Out</button>
      </Link>
    </header>
  )
}

export default Header