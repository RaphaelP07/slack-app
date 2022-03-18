import React from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Chat from "./Chat";
import ErrorPage from "./ErrorPage";
import { useEffect, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";

const Dashboard = ({ loggedUser, loggedID }) => {
  const { headers, addAccount, addChannel, baseURL } = useContext(GlobalContext);
  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/users`,
      headers: headers,
    })
      .then((res) => {
        addAccount(res.data.data);
      })
  }, []);

  useEffect(() => {
    axios({
      method: "get",
      url: `${baseURL}/channels`,
      headers: headers,
    }).then((res) => {
      addChannel(res.data.data);
    });
  }, []);

  return loggedUser === "" ? (
    <ErrorPage />
  ) : (
    <div className="main-container">
      <Header />
      <SideBar />
      <Chat />
    </div>
  );
};

export default Dashboard;
