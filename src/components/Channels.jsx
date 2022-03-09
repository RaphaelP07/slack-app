import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faLock } from "@fortawesome/free-solid-svg-icons"

const Channels = () => {
  return (
    <div className="side-bar-channels">
      <div className='section-title'>
        <FontAwesomeIcon icon={ faCaretDown } className='floating-icon' />
        <p className='title-text'> 
          Channels
        </p>
      </div>
      <div className="channel-container">
        <FontAwesomeIcon icon={ faLock } className='channel-icon' />
        <p className='channel'>batch16</p>
      </div>
      <div className="channel-container">
        <FontAwesomeIcon icon={ faLock } className='channel-icon' />
        <p className='channel'>group16</p>
      </div>
    </div>
  )
}

export default Channels