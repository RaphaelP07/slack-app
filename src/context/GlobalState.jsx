import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// initial state
const initialState = {
  users: [],
  channels: [],
  headers:
    localStorage.getItem("headers") === null
      ? {}
      : JSON.parse(localStorage.getItem("headers")),
  messages: []
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://206.189.91.54/api/v1";

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://206.189.91.54/api/v1/users",
  //     headers: state.headers,
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       addAccount(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [state.headers]);

  // useEffect(() => {
  //   axios({
  //     method: "get",
  //     url: "http://206.189.91.54/api/v1/channels",
  //     headers: state.headers,
  //   })
  //     .then((res) => {
  //       console.log(res.data.data);
  //       addChannel(res.data.data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [state.headers]);

  //Actions
  function addAccount(user) {
    dispatch({
      type: "ADD_ACCOUNT",
      payload: user,
    });
  }

  function addChannel(channel) {
    dispatch({
      type: "ADD_CHANNEL",
      payload: channel,
    });
  }

  function selectChat(id) {
    dispatch({
      type: "SELECT_CHAT",
      payload: id,
    });
  }

  function setHeaders(headers) {
    dispatch({
      type: "SET_HEADERS",
      payload: headers,
    });
  }

  function retrieveMessages (messages) {
    dispatch({
      type: "RETRIEVE_MESSAGES",
      payload: messages,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        channels: state.channels,
        headers: state.headers,
        baseURL: baseURL,
        messages: state.messages,
        addAccount,
        selectChat,
        setHeaders,
        addChannel,
        retrieveMessages
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
