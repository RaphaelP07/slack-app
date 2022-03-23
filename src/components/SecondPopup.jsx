import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const SecondPopup = ({ setIsAddingMember }) => {
  const { baseURL, headers, users, addChannel, channels } =
    useContext(GlobalContext);
  const [searchInput, setSearchInput] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [currentMembers, setCurrentMembers] = useState([]);
  const [memberID, setMemberID] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const memberAccount = [];
  const currentUsers = [];
  const currentUserAccounts = [];
  const currentUserEmails = [];

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/channels/${selectedChannelID}`,
      headers: headers,
      data: {
        id: selectedChannelID,
      },
    }).then((res) => {
      // console.log(res);
      setCurrentMembers(res.data.data.channel_members);
    });
  }, []);
  //   console.log(currentMembers);

  const addCurrentMembers = currentMembers.forEach((member) => {
    currentUsers.push(member.user_id);
  });
  //   console.log(currentUsers);

  const searchUserAccounts = currentUsers.forEach((account) => {
    currentUserAccounts.push(
      users[0].filter((user) => {
        return user.id === account;
      })
    );
  });

  //   console.log(currentUserAccounts);

  const getCurrentUserEmail = currentUserAccounts.forEach((account) => {
    currentUserEmails.push(account[0].uid);
  });

  // console.log(currentUserEmails);

  const selectedChannel =
    channels.length === 0
      ? ""
      : channels[0].filter((channel) => {
          return channel.selected === true;
        });

  const handleChange = (e) => {
    switch (e.target.id) {
      case "searchInput":
        setSearchInput(e.target.value);
        setIsSearching(true);
        updateSuggestions(e);
        setErrorMessage("");
        break;
    }
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

  const passEmail = (user) => {
    const selectedEmail = users[0].filter((account) => {
      return account.email === user;
    });
    setSearchInput(selectedEmail[0].email);
    setIsSearching(false);
    setSuggestions([]);
  };

  const addUser = memberAccount.push(
    users[0].filter((user) => {
      return user.email === searchInput;
    })
  );

  // console.log(memberAccount);

  const handleXClick = () => {
    setIsAddingMember(false);
  };

  const cancelSearch = () => {
    setIsSearching(false);
    setSuggestions([]);
  };

  const selectedChannelID = selectedChannel[0].id;

  //   console.log(memberID);

  const onSubmit = (e) => {
    e.preventDefault();
    setMemberID(memberAccount[0][0].id);

    axios({
      method: "post",
      url: "http://206.189.91.54/api/v1/channel/add_member",
      headers: headers,
      data: {
        id: selectedChannelID,
        member_id: memberAccount[0][0].id,
      },
    })
      .then((response) => {
        console.log(response.data.errors[0]);
        console.log(selectedChannelID);
        console.log(memberID);
        setSearchInput("");
        setErrorMessage(response.data.errors[0]);
        // setIsAddingMember(false);

        axios({
          method: "get",
          url: `${baseURL}/channels`,
          headers: headers,
        }).then((res) => {
          addChannel(res.data.data);
        });
        // window.location.reload(); //temporary solution
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="popup-wrapper-2" onClick={cancelSearch}>
      <div className="secondary-popup-container" onClick={cancelSearch}>
        <div className="secondary-popup-upper">
          <div className="secondary-popup-upper-header">
            <div></div>
            <h1>Add a member to {selectedChannel[0].name}:</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className="secondary-popup-x"
              onClick={handleXClick}
            />
          </div>
          <form className="secondary-popup-form" onSubmit={onSubmit}>
            <input
              autoComplete="off"
              type="text"
              id="searchInput"
              placeholder="member-email"
              value={searchInput}
              onChange={handleChange}
            ></input>
            {isSearching && (
              <div className="search-drop-down-add-secondary-popup">
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
            <button className="secondary-popup-button">ADD MEMBER</button>
            {errorMessage && <span>{errorMessage}</span>}
          </form>
        </div>
        <div className="secondary-popup-lower">
          <div className="secondary-popup-lower-header">
            <h2>Current members:</h2>
          </div>
          <div className="secondary-popup-lower-member-list">
            {currentUserEmails.length > 0 &&
              currentUserEmails.map((user) => <p key={user}>{user}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecondPopup;
