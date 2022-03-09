import React from 'react'
import logo from '../images/slack-logo.png'

const Header = () => {
  return (
    <header>
      <div className="logo-container">
        <img src={logo} className="slack-logo" alt="slack-logo" />
      </div>
    </header>
  )
}

export default Header