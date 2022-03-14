import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'
import { v4 as uuidv4 } from "uuid";

// initial state
const initialState = {
  users: [
    {
      confirmedPassword: "raph123",
      password: "raph123",
      email: "raph@example.com",
      firstName: "Raphael",
      id: uuidv4(),
      lastName: "Padua",
      nickname: "Raph",
      selected: false
    },
    {
      confirmedPassword: "john123",
      email: "john@example.com",
      firstName: "John",
      id: uuidv4(),
      lastName: "Nadal",
      nickname: "John",
      password: "john123",
      selected: false
    },
    {
      confirmedPassword: "mark123",
      email: "mark@example.com",
      firstName: "Mark",
      id: uuidv4(),
      lastName: "Escullar",
      nickname: "Mark",
      password: "mark123",
      selected: false
    },
    {
      confirmedPassword: "vince123",
      email: "vince@gmail.com",
      firstName: "Vince",
      id: uuidv4(),
      lastName: "Neri",
      nickname: "vince001",
      password: "vince123",
      selected: false
    },
    {
      confirmedPassword: "anne123",
      email: "anne@gmail.com",
      firstName: "Anne",
      id: uuidv4(),
      lastName: "Mayer",
      nickname: "annemayer",
      password: "anne123",
      selected: false
    },
  ]
}

// create context
export const GlobalContext = createContext(initialState)

// provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState)

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
      }}>
      {children}
    </GlobalContext.Provider>
  )
}