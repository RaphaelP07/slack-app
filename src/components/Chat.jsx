import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faPaperPlane } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'
import axios from 'axios'

const Chat = () => {
  const { users, channels, messages } = useContext(GlobalContext)
  const [ getCompleted,  setGetCompleted ] = useState(false)
  const [messageInput, setMessageInput] = useState('')
  
  useEffect(() => {
    if (users.length === 1) {
      setGetCompleted(true)
    } 
  }, [users.length])

  const receivers = getCompleted && users[0].concat(channels[0])
  
  const receiver = getCompleted && receivers.filter(receiver => {
    return receiver.selected === true
  })

  console.log(messages)

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
      {messages[0] === undefined ? '' : 
      <div className="chat-history">
            <>
              {
                messages.map(message => {
                  <div key={message.id}>
                    <p>
                    {message.sender.email}
                    {message.body}
                    {message.created_at}
                    </p>
                  </div>
                })
              }
            </>
          
          {/* <div key={messages[0].id}>
            <p>{messages[0].sender.email}</p>
            <p>{messages[0].body}</p>
            <p>{messages[0].created_at}</p>
          </div>
          <div key={messages[1].id}>
            <p>{messages[1].sender.email}</p>
            <p>{messages[1].body}</p>
            <p>{messages[1].created_at}</p>
          </div> */}
      </div>}
      <div className="chat-input-container">
        <form className='chat-tools-container' onSubmit={() => console.log('sent')}>
          <textarea className='chat-input' placeholder='Message'></textarea>
          <button type='submit'>
            <FontAwesomeIcon icon={ faPaperPlane } className='chat-icon' /> 
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat