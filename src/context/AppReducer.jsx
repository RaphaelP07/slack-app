export default (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};
