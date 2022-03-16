import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from "./AppReducer";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

// initial state
const initialState = {
  users: [
    // {
    //   confirmedPassword: "raph123",
    //   password: "raph123",
    //   email: "raph@example.com",
    //   firstName: "Raphael",
    //   id: uuidv4(),
    //   lastName: "Padua",
    //   nickname: "Raph",
    //   selected: false,
    // },
    // {
    //   confirmedPassword: "john123",
    //   email: "john@example.com",
    //   firstName: "John",
    //   id: uuidv4(),
    //   lastName: "Nadal",
    //   nickname: "John",
    //   password: "john123",
    //   selected: false,
    // },
    // {
    //   confirmedPassword: "mark123",
    //   email: "mark@example.com",
    //   firstName: "Mark",
    //   id: uuidv4(),
    //   lastName: "Escullar",
    //   nickname: "Mark",
    //   password: "mark123",
    //   selected: false,
    // },
    // {
    //   confirmedPassword: "vince123",
    //   email: "vince@gmail.com",
    //   firstName: "Vince",
    //   id: uuidv4(),
    //   lastName: "Neri",
    //   nickname: "vince001",
    //   password: "vince123",
    //   selected: false,
    // },
    // {
    //   confirmedPassword: "anne123",
    //   email: "anne@gmail.com",
    //   id: uuidv4(),
    //   password: "anne123",
    //   selected: false,
    // },
  ],
  channels: [
    {
      id: uuidv4(),
      name: "batch16",
      user_ids: [],
      selected: false,
    },
    {
      id: uuidv4(),
      name: "group16",
      user_ids: [],
      selected: false,
    },
  ],
  // headers: {}
  headers: localStorage.getItem("headers") === null ? {} : localStorage.getItem("headers")
};

// create context
export const GlobalContext = createContext(initialState);

// provider component
export const GlobalProvider = ({ children, headers }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const baseURL = "http://206.189.91.54/api/v1/";

  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://206.189.91.54/api/v1/users',
      headers: state.headers
    })
      .then(res => {
        console.log(res.data.data)
        addAccount(res.data.data)
      })
      .catch(err => console.log(err))
  }, [state.headers])
  

  //Actions
  function addAccount(user) {
    dispatch({
      type: "ADD_ACCOUNT",
      payload: user,
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
      payload: headers
    })
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        channels: state.channels,
        baseURL: baseURL,
        addAccount,
        selectChat,
        setHeaders
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
