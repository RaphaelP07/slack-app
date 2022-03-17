import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import axios from "axios";

const Popup = ({ loggedUser, loggedID }) => {
  const { baseURL, headers } = useContext(GlobalContext);
  const [channelName, setChannelName] = useState("");
  const ID = parseInt(loggedID);
  // const userHeaders = headers;

  const handleChange = (e) => {
    switch (e.target.id) {
      case "channelName":
        setChannelName(e.target.value);
        break;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log(channelName, ID);

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
        user_ids: [ID, 1736],
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="popup-wrapper">
      <div className="popup">
        <div className="sub-header">
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
            </div>
            <button className="btn-login" type="submit">
              Create Channel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Popup;
