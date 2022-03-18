import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const { users, channels, messages, baseURL, headers, retrieveMessages } =
    useContext(GlobalContext);
  const [getCompleted, setGetCompleted] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length > 0) {
      setGetCompleted(true);
    }
  }, [users.length]);

  const receivers = getCompleted && users[0].concat(channels[0]);

  const receiver =
    getCompleted &&
    receivers.filter((receiver) => {
      return receiver.selected === true;
    });

  const receiverClass =
    receiver === false || receiver.length === 0
      ? ""
      : receiver[0].hasOwnProperty("email")
      ? "User"
      : "Channel";

  const sendMessage = (e) => {
    e.preventDefault();

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
      }).then((res) => retrieveMessages(res.data.data));
    });
    // .catch((error) => {
    //   console.log(error);
    // });

    setMessageInput("");
  };

  const handleSecondPopup = () => {
    navigate("/slack-app/popup2");
  };

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
              <div className="profile-icon">
                {receiver[0].hasOwnProperty("email") === true
                  ? receiver[0].email.split("")[0]
                  : receiver[0].name.split("")[0]}
              </div>
              <strong className="user chat-header-name">
                {receiver[0].hasOwnProperty("email") === true
                  ? receiver[0].email
                  : receiver[0].name}
              </strong>
              {receiverClass === "Channel" ? (
                <button className="add-member" onClick={handleSecondPopup}>
                  <FontAwesomeIcon icon={faPlus} />
                  MEMBER
                </button>
              ) : (
                ""
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
                <div className="message-header">
                  <h4 className="message-sender">{message.sender.email}</h4>
                  <p className="message-date">
                    {message.created_at.split("")[11]}
                    {message.created_at.split("")[12]}
                    {message.created_at.split("")[13]}
                    {message.created_at.split("")[14]}
                    {message.created_at.split("")[15]},{" "}
                    {message.created_at.split("")[0]}
                    {message.created_at.split("")[1]}
                    {message.created_at.split("")[2]}
                    {message.created_at.split("")[3]}
                    {message.created_at.split("")[4]}
                    {message.created_at.split("")[5]}
                    {message.created_at.split("")[6]}
                    {message.created_at.split("")[7]}
                    {message.created_at.split("")[8]}
                    {message.created_at.split("")[9]}
                  </p>
                </div>
                <p className="message-body">{message.body}</p>
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
          ></textarea>
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} className="chat-icon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
