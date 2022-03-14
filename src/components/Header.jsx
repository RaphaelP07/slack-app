import React from 'react'
import logo from '../images/slack-logo.png'
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="logo-container">
      <Link to="/slack-app/dashboard"><img src={logo} className="slack-logo" alt="slack-logo" /></Link>
      </div>
    </header>
  )
}

export default Header