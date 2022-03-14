import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { v4 as uuidv4 } from "uuid";

//Initial State
const initialState = {
  users: [
    {
      email: "vince@gmail.com",
      password: "vince123",
      confirmedPassword: "vince123",
      id: uuidv4(),
      firstName: "Vince",
      lastName: "Neri",
      nickname: "vince001",
    },
    {
      email: "anne@gmail.com",
      password: "anne123",
      confirmedPassword: "anne123",
      id: uuidv4(),
      firstName: "Anne",
      lastName: "Mayer",
      nickname: "annemayer",
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

  // function addProfile(personalInfo) {
  //   dispatch({
  //     type: "ADD_PROFILE",
  //     payload: personalInfo,
  //   });
  // }

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
