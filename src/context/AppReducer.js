export default (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    // case "ADD_PROFILE":
    //   return {
    //     ...state,
    //     users: [],
    //   };
    default:
      return state;
  }
};
