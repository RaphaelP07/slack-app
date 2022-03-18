import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Popup = ({ loggedUser, loggedID }) => {
  const { baseURL, headers } = useContext(GlobalContext);
  const [channelName, setChannelName] = useState("");
  const [memberID, setMemberID] = useState("");
  const [channelMembers, setChannelMembers] = useState([]);
  const navigate = useNavigate();
  const ID = parseInt(loggedID);
  // const userHeaders = headers;

  const handleChange = (e) => {
    switch (e.target.id) {
      case "channelName":
        setChannelName(e.target.value);
        break;
      case "memberID":
        setMemberID(+e.target.value);
        break;
    }
  };

  const addMember = () => {
    setChannelMembers([...channelMembers, memberID]);
    setMemberID("");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    //   axios
    //     .post("http://206.189.91.54/api/v1/channels", {
    //       name: channelName,
    //       user_ids: [ID, 1736],
    //       headers: headers,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // };

    axios({
      method: "post",
      url: "http://206.189.91.54/api/v1/channels",
      headers: headers,
      data: {
        name: channelName,
        user_ids: [channelMembers],
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

  const handleXClick = () => {
    navigate("/slack-app/dashboard");
  };

  return (
    <div className="popup-wrapper">
      <div className="popup-header">
        <div className="popup-channel">
          <FontAwesomeIcon
            icon={faXmark}
            className="return-dashboard"
            onClick={handleXClick}
          />
        </div>
        <div className="popup">
          <div className="sub-header-channel">
            <h1>Create a new channel!</h1>
          </div>
          <div className="form-container">
            <form onSubmit={onSubmit} noValidate>
              <div>
                <input
                  type="text"
                  id="channelName"
                  value={channelName}
                  placeholder="channel-name"
                  onChange={handleChange}
                ></input>
                <input
                  type="text"
                  id="memberID"
                  value={memberID}
                  placeholder="member-ID's"
                  onChange={handleChange}
                ></input>
                <FontAwesomeIcon
                  icon={faPlus}
                  className={"add-channel-member"}
                  onClick={addMember}
                />
              </div>
              {channelMembers.length > 0 &&
                channelMembers.map((member) => (
                  <span key={member}>{member}, </span>
                ))}
              <button className="btn-login" type="submit">
                Create Channel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
