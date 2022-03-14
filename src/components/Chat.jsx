import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'

const Chat = () => {
  const { users, channels } = useContext(GlobalContext)

  const receivers = users.concat(channels)

  const receiver = receivers.filter(receiver => {
    return receiver.selected === true
  })

  return (
    <div className="chat-container">
      <div className='chat-header'>
        {receiver.length === 0 ? '' :
          <>
            <div className='profile-icon'>
              {receiver[0].nickname !== undefined ? (receiver[0].nickname.split(''))[0] : ''}
              {receiver[0].name !== undefined ? (receiver[0].name.split(''))[0] : ''}
            </div>
            <strong className="user chat-header-name">
              {receiver[0].nickname}
              {receiver[0].name}
            </strong>
            <FontAwesomeIcon icon={ faAngleDown } className='chat-icon' />
          </>
        }
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