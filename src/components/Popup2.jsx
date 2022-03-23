import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const Popup2 = ({ setIsAddingMember }) => {
  const { headers, channels, users } = useContext(GlobalContext);
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [memberID, setMemberID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "searchInput":
        setSearchInput(e.target.value);
        setIsSearching(true);
        updateSuggestions(e);
        break;
    }
  };

  const handleClick = () => {
    setIsAddingMember(false);
  };

  const selectedChannel =
    channels.length === 0
      ? ""
      : channels[0].filter((channel) => {
          return channel.selected === true;
        });

  const passEmail = (user) => {
    const selectedEmail = users[0].filter((account) => {
      return account.email === user;
    });
    setSearchInput(selectedEmail[0].email);
    setIsSearching(false);
    setSuggestions([]);
  };

  const updateSuggestions = (e) => {
    let emails = [];
    let suggestions = [];

    emails =
      users.length > 0
        ? users[0].map((user) => {
            return user.email;
          })
        : [];

    suggestions = emails.filter((email) => {
      return email.includes(searchInput.toString());
    });

    setSuggestions(suggestions);
  };

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
        setIsAddingMember(false);
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
              autoComplete="off"
              type="text"
              id="searchInput"
              value={searchInput}
              placeholder="member-ID's"
              onChange={handleChange}
            ></input>
            {isSearching && (
              <div className="search-drop-down-add-secondary">
                {suggestions.map((user) => (
                  <p
                    className="search-users-channel"
                    key={uuidv4()}
                    onClick={() => passEmail(user)}
                  >
                    {user}
                  </p>
                ))}
              </div>
            )}
            <span>{errorMessage}</span>
            <button className="popup2-submit">Add Member/s</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup2;
