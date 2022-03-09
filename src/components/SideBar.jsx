import React from 'react'
import Channels from './Channels'
import Users from './Users'

const SideBar = () => {
  return (
    <div className="side-bar">
      <Channels />
      <Users />
    </div>
  )
}

export default SideBar