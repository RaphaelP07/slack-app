import React, { useContext, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from '../context/GlobalState'

const Channels = () => {
  const { channels, selectChat } = useContext(GlobalContext)
  const [rerender, setRerender] = useState(false)
  
  useEffect(() => {
    return
  }, [rerender])

  const select = (index, channel) => {
    channel.selected=!channel.selected
    setRerender(!rerender)
    selectChat(channel.id)
  }

  return (
    <div className="side-bar-channels">
      <div className='section-title'>
        <FontAwesomeIcon icon={ faCaretDown } className='floating-icon' />
        <p className='title-text'> 
          Channels
        </p>
      </div>
      {channels.map(channel => 
        <div key={channel.id} className={`channel-container ${channel.selected === true ? 'selected' : ''}`} onClick={() => select(channels.indexOf(channel), channel)} >
          <div className='profile-icon'>{(channel.name.split(''))[0]}</div>
          <p className="user">{channel.name}</p>
          <FontAwesomeIcon icon={ faXmark } className='x-icon' />
        </div>
      )}
    </div>
  )
}

export default Channels