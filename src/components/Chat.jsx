import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons"

const Chat = () => {
  return (
    <div className="chat-container">
      <div className='chat-header'>
        <div className='profile-icon'>M</div>
        <strong className="user chat-header-name">Mark</strong>
        <FontAwesomeIcon icon={ faAngleDown } className='chat-icon' />
      </div>
      <div className="chat-history">
      </div>
      <div className="chat-input-container">
        <div className='chat-tools-container'>
        <textarea className='chat-input' placeholder='Message'></textarea>
        <FontAwesomeIcon icon={ faPaperPlane } className='chat-icon' />
        </div>
      </div>
    </div>
  )
}

export default Chat