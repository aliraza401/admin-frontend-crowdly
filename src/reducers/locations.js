const initState = {
  locations: [],
};

const locationsReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOCATIONS":
      return { ...state, locations: action.payload.locations };
    default:
      return state;
  } 
};

export default locationsReducer;
  