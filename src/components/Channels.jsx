import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretDown,
  faXmark,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { GlobalContext } from "../context/GlobalState";
import Popup from "./Popup";
import axios from "axios";

const Channels = () => {
  const { channels, selectChat, baseURL, headers, retrieveMessages } =
    useContext(GlobalContext);
  const [rerender, setRerender] = useState(false);
  const [showChannels, setShowChannels] = useState(false);
  const [isCreatingChannel, setIsCreatingChannel] = useState(false);

  useEffect(() => {
    return;
  }, [rerender]);

  const select = (channel) => {
    channel.selected = true;
    setRerender(!rerender);
    selectedMessages(channel.id);
    selectChat(channel.id);
  };

  const showPopup = () => {
    setIsCreatingChannel(true);
  };

  const selectedMessages = (id) => {
    axios({
      method: "get",
      url: `${baseURL}/messages?receiver_id=${id}&receiver_class=Channel`,
      headers: headers,
      receiver_id: id,
      receiver_class: "Channel",
    }).then((res) => {
      retrieveMessages(res.data.data);
    });
  };

  return (
    <div className="side-bar-channels">
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
        <FontAwesomeIcon
          icon={faPlus}
          className={"add-channel-button"}
          onClick={showPopup}
        />
      </div>
      {!showChannels &&
        channels.length > 0 &&
        channels[0].map((channel) => (
          <div
            key={channel.id}
            className={`channel-container ${
              channel.selected === true ? "selected" : ""
            }`}
            onClick={() => select(channel)}
          >
            <div className="disable-highlight profile-icon">
              {channel.name.split("")[0]}
            </div>
            <p className="disable-highlight user">{channel.name}</p>
            <FontAwesomeIcon icon={faXmark} className="x-icon" />
          </div>
        ))}
      {isCreatingChannel && (
        <Popup setIsCreatingChannel={setIsCreatingChannel} />
      )}
    </div>
  );
};

export default Channels;
