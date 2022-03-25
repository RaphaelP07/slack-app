import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// initial state
const initialState = {
  users: [],
  channels: [],
  messages: [],
  headers:
    localStorage.getItem("headers") === null
      ? {}
      : JSON.parse(localStorage.getItem("headers")),
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://206.189.91.54/api/v1";

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

  function addChannel2(channel) {
    dispatch({
      type: "ADD_CHANNEL_2",
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

  function retrieveMessages(messages) {
    dispatch({
      type: "RETRIEVE_MESSAGES",
      payload: messages,
    });
  }

  function clearStates() {
    dispatch({
      type: "CLEAR_STATES",
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        channels: state.channels,
        headers: state.headers,
        messages: state.messages,
        baseURL: baseURL,
        addAccount,
        selectChat,
        setHeaders,
        addChannel,
        addChannel2,
        retrieveMessages,
        clearStates,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
