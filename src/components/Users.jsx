import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'
import axios from 'axios'

const Users = () => {
  const { users, selectChat, baseURL } = useContext(GlobalContext)
  const [rerender, setRerender] = useState(false)
  const [showUsers, setShowUsers] = useState(false)
  
  useEffect(() => {
    return
  }, [rerender])

  const select = (index, user) => {
    user.selected=!user.selected
    setRerender(!rerender)
    selectChat(user.id)
  }

  console.log(users)

  return (
    <div className="side-bar-direct-messages">
      <div className='section-title'>
          <FontAwesomeIcon icon={ faCaretDown } className={`floating-icon ${showUsers && 'rotate'}`} onClick={() => setShowUsers(!showUsers)} />
        <p className='disable-highlight title-text' onClick={() => setShowUsers(!showUsers)}>Direct Messages</p>
      </div>
      {!showUsers && users.length > 0 && users[0].map(user => 
        <div key={user.id} className={`user-container ${user.selected === true ? 'selected' : ''}`} onClick={() => select(users.indexOf(user), user)} >
          <div className='disable-highlight profile-icon'>{user.email.split('')[0]}</div>
          <p className="disable-highlight user">{user.email}</p>
          <FontAwesomeIcon icon={ faXmark } className='x-icon' />
        </div>
      )}
    </div>
  )
}

export default Users