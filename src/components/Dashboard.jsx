import React from 'react'
import Header from './Header'
import SideBar from './SideBar'
import Chat from './Chat'
import ErrorPage from './ErrorPage'

const Dashboard = ({ loggedUser }) => {
  return (
    loggedUser === '' ?
    <ErrorPage />
    :
    <div className="main-container">
      <Header />
      <SideBar />
      <Chat />
    </div>
  )
}

export default Dashboard