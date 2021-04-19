import axios from "axios";


// export const setWorkersHomePage = () => async (dispatch) => {
//   const url = `http://localhost:5000/api/workers/home-page`;
//   const workers = await axios.get(url);

//   dispatch({
//     type: "SET_WORKERS",
//     payload: {
//       workerList: workers.data,  
//     }, 
//   });
// }; 

export const setUserRequests = () => async (dispatch) => {
  const url = `http://localhost:5000/api/UserRequest/all`;
  const us = await axios.get(url);

  dispatch({
    type: "SET_USER_REQUESTS",
    payload: {
      userRequestsList: us.data,
    },
  });
}; 

export const setUserRequest = id => async (dispatch) => {
  const url = `http://localhost:5000/api/UserRequest/single/${id}`;
  const us = await axios.get(url);

  console.log(us); 

  dispatch({
    type: "SET_USER_REQUEST",
    payload: {
      userRequest: us.data.userRequest,
    },
  });
};


