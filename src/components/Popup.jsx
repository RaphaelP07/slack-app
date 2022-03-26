import { useState, useContext } from "react"
import { GlobalContext } from "../context/GlobalState"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons"
import { v4 as uuidv4 } from "uuid"

const Popup = ({ loggedID, setIsCreatingChannel }) => {
  const { baseURL, headers, users, addChannel2 } = useContext(GlobalContext)
  const [channelName, setChannelName] = useState("")
  const [searchInput, setSearchInput] = useState("")
  const [channelMembers, setChannelMembers] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [errorMessage, setErrorMessage] = useState("")
  const memberAccounts = []

  const handleChange = (e) => {
    switch (e.target.id) {
      case "channelName":
        setChannelName(e.target.value)
        break
      case "searchInput":
        setSearchInput(e.target.value)
        setIsSearching(true)
        updateSuggestions(e)
        break
    }
  }

  const updateSuggestions = (e) => {
    let emails = []
    let suggestions = []

    emails =
      users.length > 0
        ? users[0].map((user) => {
            return user.email
          })
        : []

    suggestions = emails.filter((email) => {
      return email.includes(searchInput.toString())
    })

    setSuggestions(suggestions)
  }

  const passEmail = (user) => {
    const selectedEmail = users[0].filter((account) => {
      return account.email === user
    })
    setSearchInput(selectedEmail[0].email)
    setIsSearching(false)
    setSuggestions([])
  }

  const addMember = () => {
    setChannelMembers([...channelMembers, searchInput])
    setSearchInput("")
  }

  const addUser = channelMembers.forEach((member) => {
    memberAccounts.push(
      users[0].filter((user) => {
        return user.email === member
      })
    )
  })

  const memberIDs = memberAccounts.map((member) => {
    return member[0].id
  })

  const onSubmit = (e) => {
    e.preventDefault()
    // console.log(memberIDs)

    axios({
      method: "post",
      url: "http://206.189.91.54/api/v1/channels",
      headers: headers,
      data: {
        name: channelName,
        user_ids: memberIDs,
      },
    })
      .then((response) => {
        if (response.data.errors) {
          setErrorMessage(response.data.errors)
          return
        } else {
          setErrorMessage("")
          setIsCreatingChannel(false)
          addChannel2(response.data.data)
        }

        axios({
          method: "get",
          url: `${baseURL}/channels`,
          headers: headers,
        }).then((res) => {
          // console.log(res.data.data);
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleXClick = () => {
    setIsCreatingChannel(false)
  }

  const cancelSearch = () => {
    setIsSearching(false)
    setSuggestions([])
  }

  return (
    <div className="popup-wrapper" onClick={cancelSearch}>
      <div className="popup-header" onClick={cancelSearch}>
        <div className="popup-channel" onClick={cancelSearch}>
          <FontAwesomeIcon
            icon={faXmark}
            className="return-dashboard"
            onClick={handleXClick}
          />
        </div>
        <div className="popup">
          <div className="sub-header-channel">
            <h1>Create a new channel!</h1>
          </div>
          <div className="form-container">
            <form onSubmit={onSubmit} noValidate>
              <div>
                <input
                  autoComplete="off"
                  type="text"
                  id="channelName"
                  value={channelName}
                  placeholder="channel-name"
                  onChange={handleChange}
                ></input>
                <input
                  autoComplete="off"
                  type="text"
                  id="searchInput"
                  value={searchInput}
                  placeholder="member-email"
                  onChange={handleChange}
                ></input>
                {isSearching && (
                  <div className="search-drop-down-add">
                    {suggestions.map((user) => (
                      <p
                        className="search-users-channel"
                        key={uuidv4()}
                        onClick={() => passEmail(user)}
                      >
                        {user}
                      </p>
                    ))}
                  </div>
                )}
                <FontAwesomeIcon
                  icon={faPlus}
                  className={"add-channel-member"}
                  onClick={addMember}
                />
              </div>
              <div className="channel-members-container">
                {channelMembers.length > 0 &&
                  channelMembers.map((member) => (
                    <p className="channel-members" key={member}>
                      {member},{" "}
                    </p>
                  ))}
              </div>
              {errorMessage && <span>{errorMessage}</span>}
              <button className="btn-login" type="submit">
                Create Channel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup
