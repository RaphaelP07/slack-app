import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons"

const Users = () => {
  return (
    <div className="side-bar-direct-messages">
      <div className='section-title'>
          <FontAwesomeIcon icon={ faCaretDown } className='floating-icon' />
        <p className='title-text'>Direct Messages</p>
      </div>
      <div className="user-container">
        <div className='profile-icon'>J</div>
        <p className="user">John</p>
        <FontAwesomeIcon icon={ faXmark } className='x-icon' />
      </div>
      <div className="user-container selected">
        <div className='profile-icon'>M</div>
        <p className="user">Mark</p>
        <FontAwesomeIcon icon={ faXmark } className='x-icon' />
      </div>
      <div className="user-container">
        <div className='profile-icon'>R</div>
        <p className='user'>Raph</p>
        <p className='user-indicator'>you</p>
        <FontAwesomeIcon icon={ faXmark } className='x-icon' />
      </div>
    </div>
  )
}

export default Users