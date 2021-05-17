const initState = {
  admins: [],
};

const adminsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_ADMINS":
      return { ...state, admins: action.payload.admins };
    default:
      return state;
  }
};

export default adminsReducer;
