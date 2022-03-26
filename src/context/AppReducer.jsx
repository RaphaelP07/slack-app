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
    case "ADD_CHANNEL_2":
      if (state.channels[0] === undefined) {
        state.channels[0] = [action.payload]
      } else {
        state.channels[0].push(action.payload);
      }
      return {
        ...state,
      };
    case "SELECT_CHAT":
      if (state.channels[0] !== undefined && state.channels[0].length > 0) {
        const newChannels = state.channels[0];
        newChannels.forEach((channel) => {
          if (channel.id !== action.payload) {
            channel.selected = false;
          }
        });
      }
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
    case "CLEAR_STATES":
      return {
        users: [],
        channels: [],
        messages: [],
        headers: {},
      };
    default:
      return state;
  }
};
