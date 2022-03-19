import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Popup2 = ({ setIsAddingMember }) => {
  const { headers, channels } = useContext(GlobalContext);
  const [memberID, setMemberID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "memberID":
        if (typeof e.target.value === "number") {
          setMemberID(+e.target.value);
        } else {
          setMemberID(e.target.value);
          setErrorMessage("Please put a valid ID number");
        }
        break;
    }
  };

  const handleClick = () => {
    setIsAddingMember(false)
  };

  const selectedChannel =
    channels.length === 0
      ? ""
      : channels[0].filter((channel) => {
          return channel.selected === true;
        });

  const onSubmit = (e) => {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://206.189.91.54/api/v1/channel/add_member",
      headers: headers,
      data: {
        id: selectedChannel[0].id,
        member_id: memberID,
      },
    })
      .then((response) => {
        console.log(response);
        navigate("/slack-app/dashboard");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="popup2-wrapper">
      <div className="popup2-container">
        <header>
          <FontAwesomeIcon
            icon={faXmark}
            className="popup2-return"
            onClick={handleClick}
          />
        </header>
        <div className="popup2-form-control">
          <h1>Add a member to {selectedChannel[0].name}:</h1>
          <form className="popup2-form" onSubmit={onSubmit}>
            <input
              type="text"
              id="memberID"
              placeholder="member-ID's"
              value={memberID}
              onChange={handleChange}
            ></input>
            <span>{errorMessage}</span>
            <button className="popup2-submit">Add Member/s</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
