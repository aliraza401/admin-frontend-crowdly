const initState = {
  userRequestsList: {},
  userRequest: {}
};  
 
const workerReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_USER_REQUESTS":
      return { ...state, userRequestsList: action.payload.userRequestsList };
    case "SET_USER_REQUEST":
      return { ...state, userRequest: action.payload.userRequest };
    default:
      return state;
  } 
};  

export default workerReducer;
