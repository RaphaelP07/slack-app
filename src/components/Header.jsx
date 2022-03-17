import React from 'react'
import logo from '../images/slack-logo.png'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className='dashboard-header'>
      <div className="logo-container">
          <img src={logo} className="slack-logo" alt="slack-logo" onClick={() => window.location.reload()}/>
      </div>
      <Link to="/slack-app">
        <button className='sign-out' onClick={() => localStorage.clear()}>Sign Out</button>
      </Link>
    </header>
  )
}

export default Header