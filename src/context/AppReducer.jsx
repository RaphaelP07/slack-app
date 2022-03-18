export default (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "ADD_CHANNEL":
      return {
        ...state,
        channels: [...state.channels, action.payload],
      };
    case "SELECT_CHAT":
      const newChannels = state.channels[0];
      newChannels.forEach((channel) => {
        if (channel.id !== action.payload) {
          channel.selected = false;
        }
      });
      const newUsers = state.users[0];
      newUsers.forEach((user) => {
        if (user.id !== action.payload) {
          user.selected = false;
        }
      });
      return {
        ...state,
      };
    case "SET_HEADERS":
      return {
        ...state,
        headers: action.payload,
      };
    case "RETRIEVE_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};
