import axios from "axios";
import {path} from './../path';

export const setDashboard = () => async (dispatch) => {
  
  let url = `${path}api/utility/dashboard`;
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
