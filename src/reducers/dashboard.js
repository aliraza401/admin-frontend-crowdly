const initState = {
  usersCount: {},
};

const dashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_DASHBOARD":
      return { ...state, usersCount: action.payload.usersCount };
    default:
      return state;
  } 
};

export default dashboardReducer;
 