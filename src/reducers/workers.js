const initState = { workers: [] };

const workersReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_WORKERS":
      return { ...state, workers: action.payload.workers };
    default:
      return state;
  }
};

export default workersReducer;
