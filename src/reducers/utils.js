const initState = {
  teams: [],
  contacts: [],
};

const categoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_TEAMS":
      return { ...state, teams: action.payload.teams };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload.contacts };
    default:
      return state;
  }
};

export default categoryReducer;
 