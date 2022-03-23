import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faXmark } from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

const Users = () => {
  const { users, selectChat, baseURL, headers, retrieveMessages } = useContext(GlobalContext);
  const [rerender, setRerender] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    return;
  }, [rerender]);

  const select = (user) => {
    user.selected = true;
    setRerender(!rerender);
    selectedMessages(user.id)
    selectChat(user.id);
  };

  const selectedMessages = (id) => {
    axios({
      method: "get",
      url: `${baseURL}/messages?receiver_id=${id}&receiver_class=User`,
      headers: headers,
      receiver_id : id,
      receiver_class : "User"
    })
      .then((res) => {
        retrieveMessages(res.data.data);
      })
      // .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="section-title">
        <FontAwesomeIcon
          icon={faCaretDown}
          className={`floating-icon ${showUsers && "rotate"}`}
          onClick={() => setShowUsers(!showUsers)}
        />
        <p
          className="disable-highlight title-text"
          onClick={() => setShowUsers(!showUsers)}
        >
          Direct Messages
        </p>
      </div>
      <div className="side-bar-direct-messages">
        {showUsers === false &&
          users.length > 0 ?
          users[0].map((user) => (
            <div
              key={user.id}
              className={`user-container ${
                user.selected === true ? "selected" : ""
              }`}
              onClick={() => select(user)}
              title={user.email}
            >
              <div className="disable-highlight profile-icon">
                {user.email.split("")[0]}
              </div>
              <p className="disable-highlight user cut-text">{user.email}</p>
              <FontAwesomeIcon icon={faXmark} className="x-icon" />
            </div>
          )) : !showUsers &&
          <p className="loading">
            loading users...
          </p>
        }
      </div>
    </>
  );
};

export default Users;
