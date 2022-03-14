import React, { createContext, useReducer } from 'react'
import AppReducer from './AppReducer'

// initial state
const initialState = {
  data: [
    {
      id: 1736,
      email: "raph@example.com",
      provider: "email",
      uid: "raph@example.com",
      allow_password_change: false,
      name: "Raphael Padua",
      nickname: "Raph",
      image: null,
      selected: false
    },
    {
      id: 1737,
      email: "john@example.com",
      provider: "email",
      uid: "john@example.com",
      allow_password_change: false,
      name: "John Nadal",
      nickname: "John",
      image: null,
      selected: false
    },
    {
      id: 1738,
      email: "mark@example.com",
      provider: "email",
      uid: "mark@example.com",
      allow_password_change: false,
      name: "Mark Escullar",
      nickname: "Mark",
      image: null,
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
  function addAccount(account) {
    dispatch({
      type: 'ADD_ACCOUNT',
      payload: account
    })
  }

  return (
    <GlobalContext.Provider 
    value={{
        data: state.data,
        addAccount,
      }}>
      {children}
    </GlobalContext.Provider>
  )
}