import React, { useContext, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons"
import { GlobalContext } from "../context/GlobalState"
import Popup from "./Popup"
import axios from "axios"

const Channels = () => {
  const { channels, selectChat, baseURL, headers, retrieveMessages } =
    useContext(GlobalContext)
  const [rerender, setRerender] = useState(false)
  const [showChannels, setShowChannels] = useState(false)
  const [isCreatingChannel, setIsCreatingChannel] = useState(false)

  const select = (channel) => {
    channel.selected = true
    selectedMessages(channel.id)
    selectChat(channel.id)
  }

  const showPopup = () => {
    setIsCreatingChannel(true)
  }

  const selectedMessages = (id) => {
    axios({
      method: "get",
      url: `${baseURL}/messages?receiver_id=${id}&receiver_class=Channel`,
      headers: headers,
      receiver_id: id,
      receiver_class: "Channel",
    }).then((res) => {
      retrieveMessages(res.data.data)
    })
  }

  return (
    <>
      <div className="section-title">
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`floating-icon ${showChannels && "rotate"}`}
          onClick={() => setShowChannels(!showChannels)}
        />
        <p
          className="disable-highlight title-text"
          onClick={() => setShowChannels(!showChannels)}
        >
          Channels
        </p>
        {!showChannels && (
          <FontAwesomeIcon
            icon={faPlus}
            className={"add-channel-button"}
            onClick={showPopup}
          />
        )}
      </div>
      <div className="side-bar-channels">
        {channels[0] === undefined
          ? !showChannels && (
              <p className="loading">
                You have not created or joined a channel yet.
              </p>
            )
          : !showChannels && channels.length > 0 && channels !== undefined
          ? channels[0].map((channel) => (
              <div
                key={channel.id}
                className={`channel-container ${
                  channel.selected === true ? "selected" : ""
                }`}
                onClick={() => select(channel)}
                title={channel.name}
              >
                <div className="disable-highlight profile-icon">
                  {channel.name.split("")[0]}
                </div>
                <p className="disable-highlight user">{channel.name}</p>
                <FontAwesomeIcon icon={faXmark} className="x-icon" />
              </div>
            ))
          : !showChannels && <p className="loading">loading channels...</p>}
        {/* {!showChannels && channels.length > 0 && channels !== undefined
          ? channels[0].map((channel) => (
              <div
                key={channel.id}
                className={`channel-container ${
                  channel.selected === true ? "selected" : ""
                }`}
                onClick={() => select(channel)}
                title={channel.name}
              >
                <div className="disable-highlight profile-icon">
                  {channel.name.split("")[0]}
                </div>
                <p className="disable-highlight user">{channel.name}</p>
                <FontAwesomeIcon icon={faXmark} className="x-icon" />
              </div>
            ))
          : !showChannels && <p className="loading">loading channels...</p>} */}
        {isCreatingChannel && (
          <Popup
            setIsCreatingChannel={setIsCreatingChannel}
            setRerender={setRerender}
            rerender={rerender}
          />
        )}
      </div>
    </>
  )
}

export default Channels
