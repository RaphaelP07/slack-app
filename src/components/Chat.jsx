import React, { useContext, useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faPlus,
  faPaperPlane,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import SecondPopup from "./SecondPopup";
import axios from "axios";

const Chat = () => {
  const { users, channels, messages, baseURL, headers, retrieveMessages } =
    useContext(GlobalContext)
  const [getCompleted, setGetCompleted] = useState(false)
  const [messageInput, setMessageInput] = useState("")
  const [isAddingMember, setIsAddingMember] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (users.length > 0) {
      setGetCompleted(true)
    }
  }, [users.length])

  // const receivers = getCompleted && users[0].concat(channels[0]);
  const receivers =
    channels[0] !== undefined && channels[0].length > 0
      ? getCompleted && users[0].concat(channels[0])
      : getCompleted && users[0]

  const receiver =
    getCompleted &&
    receivers.filter((receiver) => {
      return receiver.selected === true
    })

  const receiverClass =
    receiver === false || receiver.length === 0
      ? ""
      : receiver[0].hasOwnProperty("email")
      ? "User"
      : "Channel"

  const sendMessage = (e) => {
    e.preventDefault()

    axios({
      method: "post",
      url: `${baseURL}/messages`,
      headers: headers,
      data: {
        receiver_id: receiver[0].id,
        receiver_class: receiverClass,
        body: messageInput,
      },
    }).then(() => {
      axios({
        method: "get",
        url: `${baseURL}/messages?receiver_id=${receiver[0].id}&receiver_class=${receiverClass}`,
        headers: headers,
        data: {
          receiver_id: receiver[0].id,
          receiver_class: receiverClass,
          body: messageInput,
        },
      }).then((res) => retrieveMessages(res.data.data))
    })

    setMessageInput("")
  }

  const enter = (e) => {
    if (e.keyCode === 13) {
      sendMessage(e)
    }
  }

  return (
    <div className="chat-container">
      {receiver.length === undefined ? (
        ""
      ) : (
        <div className="chat-header">
          {receiver.length === 0 ? (
            ""
          ) : (
            <>
              {/* <div className="profile-icon">
                {receiver[0].hasOwnProperty("email") === true
                  ? receiver[0].email.split("")[0]
                  : receiver[0].name.split("")[0]}
              </div> */}
              <strong className="user chat-header-name">
                {receiver[0].hasOwnProperty("email") === true
                  ? receiver[0].email
                  : receiver[0].name}
              </strong>
              {receiverClass === "Channel" ? (
                <button
                  className="add-member"
                  onClick={() => setIsAddingMember(true)}
                >
                  <FontAwesomeIcon icon={faPlus} className='+-icon' />
                </button>
              ) : (
                ""
              )}
              {isAddingMember && (
                <SecondPopup setIsAddingMember={setIsAddingMember} />
              )}
            </>
          )}
        </div>
      )}
      {messages === undefined ? (
        ""
      ) : (
        <div className="chat-history">
          <>
            {messages.map((message) => (
              <div
                key={messages.indexOf(message)}
                className="message-container"
              >
                {message.sender.email ===
                (messages[messages.indexOf(message) - 1] === undefined
                  ? messages[messages.indexOf(message)].receiver.email
                  : messages[messages.indexOf(message) - 1].sender.email) ? (
                  ""
                ) : (
                  <div className="message-sender">
                    <div className="disable-highlight sender-icon">
                      {message.sender.email.split("")[0]}
                    </div>
                    <h4 className="sender-name">{message.sender.email}</h4>
                  </div>
                )}
                <div
                  className={`message-body-container 
                ${
                  message.sender.email ===
                  (messages[messages.indexOf(message) + 1] === undefined
                    ? messages[messages.indexOf(message)].receiver.email
                    : messages[messages.indexOf(message) + 1].sender.email)
                    ? ""
                    : "border-bottom"
                }`}
                >
                  <p className="message-body">{message.body}</p>
                  <p className="message-date">
                    {message.created_at.slice(11, 16)},{" "}
                    {message.created_at.slice(0, 10)}
                  </p>
                </div>
              </div>
            ))}
          </>
        </div>
      )}
      <div className="chat-input-container">
        <form className="chat-tools-container" onSubmit={sendMessage}>
          <textarea
            className="chat-input"
            placeholder="Message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyUp={(e) => enter(e)}
          ></textarea>
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} className="chat-icon" />
          </button>
        </form>
      </div>
    </div>
  )
}

export default Chat
