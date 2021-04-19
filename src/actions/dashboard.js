import axios from "axios";

export const setDashboard = () => async (dispatch) => {
  
  let url = `http://localhost:5000/api/utility/dashboard`;
  const data = await axios.get(url).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data;

  dispatch({
    type: "SET_DASHBOARD", 
    payload: {
      usersCount: data.data,
    },
  });
};
