import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'
import axios from 'axios'

const Chat = () => {
  const { users, channels, headers, retrieveMessages } = useContext(GlobalContext)
  const [ getCompleted,  setGetCompleted ] = useState(false)
  
  useEffect(() => {
    if (users.length === 1) {
      setGetCompleted(true)
    } 
  }, [users.length])

  const receivers = getCompleted && users[0].concat(channels[0])
  
  const receiver = getCompleted && receivers.filter(receiver => {
    return receiver.selected === true
  })

  return (
    <div className="chat-container">
      {receiver.length === undefined ? '' :
      <div className='chat-header'>
          {receiver.length === 0 ? '' : 
          <>
            <div className='profile-icon'>
              {receiver[0].hasOwnProperty('email') === true ? receiver[0].email.split('')[0] : receiver[0].name.split('')[0]}
            </div>
            <strong className="user chat-header-name">
              {receiver[0].hasOwnProperty('email') === true ? receiver[0].email : receiver[0].name }
            </strong>
            <FontAwesomeIcon icon={ faAngleDown } className='chat-icon' />
          </>}
      </div>}
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