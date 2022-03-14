export default (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "SELECT_CHAT":
      const newChannels = state.channels
      newChannels.forEach(channel => {
        if (channel.id !== action.payload) {
          channel.selected = false
        }
      })
      const newUsers = state.users
      newUsers.forEach(user => {
        if (user.id !== action.payload) {
          user.selected = false
        }
      })
      return {
        ...state,
      }
    default:
      return state;
  }
};
