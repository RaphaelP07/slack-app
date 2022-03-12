import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

//Initial State
const initialState = {
  users: [
    {
      id: 15,
      firstName: "Peter",
      lastName: "Pedro",
      email: "pepe@gmail.com",
      nickname: "Petro",
      password: "pedro123",
      confirmedPassword: "pedro123",
    },
    {
      id: 25,
      firstName: "Anne",
      lastName: "Babae",
      email: "babanne@gmail.com",
      nickname: "bananer",
      password: "anneb123",
      confirmedPassword: "anneb123",
    },
  ],
};

//Create Context
export const GlobalContext = createContext(initialState);

//Provider Component

export const GlobalProvider = ({ children } = {}) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //Actions
  function addAccount(user) {
    dispatch({
      type: "ADD_ACCOUNT",
      payload: user,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        addAccount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
