import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'

const Users = () => {
  const { data } = useContext(GlobalContext)
  const [rerender, setRerender] = useState(false)
  
  useEffect(() => {
    console.log('rerender')
  }, [rerender])

  const select = (index, user) => {
    user.selected=!user.selected
    setRerender(!rerender)
  }

  return (
    <div className="side-bar-direct-messages">
      <div className='section-title'>
          <FontAwesomeIcon icon={ faCaretDown } className='floating-icon' />
        <p className='title-text'>Direct Messages</p>
      </div>
    {data.map(user => 
      <div key={user.id} className={`user-container ${user.selected === true ? 'selected' : ''}`} onClick={() => select(data.indexOf(user), user)} >
        <div className='profile-icon'>{(user.nickname.split(''))[0]}</div>
        <p className="user">{user.nickname}</p>
        <FontAwesomeIcon icon={ faXmark } className='x-icon' />
      </div>
    )}
    </div>
  )
}

export default Users