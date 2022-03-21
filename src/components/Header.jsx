import React, { useContext, useState } from 'react'
import logo from '../images/slack-logo-white.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { GlobalContext } from '../context/GlobalState';
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const Header = () => {
  const { clearStates, users, selectChat, headers, baseURL, retrieveMessages } = useContext(GlobalContext)
  const [searchInput, setSearchInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState([])

  const signOutClear = () => {
    localStorage.clear()
    clearStates()
  }
  
  const updateSuggestions = (e) => {
    setSearchInput(e.target.value)

    let emails = []
    let suggestions = []

    emails = 
    users.length > 0 ? 
    users[0].map((user) => {
      return user.email
    }) : []
    
    suggestions = emails.filter((email) => {
      return email.includes(searchInput.toString())
    })

    if (searchInput === '') {
      suggestions = []
    }
    
    setSuggestions(suggestions)
  }

  const passEmail = (user) => {
    const selectedEmail = users[0].filter((account) => {
      return account.email === user
    })
    
    selectedEmail[0].selected = true;
    selectedMessages(selectedEmail[0].id)
    setIsSearching(false)
    setSearchInput('')
    setSuggestions([])
  }

  const selectedMessages = (id) => {
    axios({
      method: "get",
      url: `${baseURL}/messages?receiver_id=${id}&receiver_class=User`,
      headers: headers,
      receiver_id : id,
      receiver_class : "User"
    })
      .then((res) => {
        retrieveMessages(res.data.data);
        selectChat(id);
      })
  }

  return (
    <header className='dashboard-header'>
      <div className="logo-container">
          <img src={logo} className="slack-logo" alt="slack-logo" onClick={() => window.location.reload()}/>
      </div>
      <div className="search-header-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input type="text" className='search-header' placeholder='search user email' autoComplete='off' value={searchInput} onClick={() => setIsSearching(true)} onChange={(e) => updateSuggestions(e) }/>
        {isSearching && 
          <div className="search-drop-down">
            {suggestions.map((user) => (
              <p className="search-users" key={uuidv4()} onClick={() => passEmail(user)} >{user}</p>
            ))}
          </div>}
      </div>
      <Link to="/slack-app">
        <button className='sign-out' onClick={signOutClear}>Sign Out</button>
      </Link>
    </header>
  )
}

export default Header