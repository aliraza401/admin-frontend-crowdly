import axios from "axios";
import adminsReducer from "../reducers/admins";
import {path} from './../path';

export const setAdmins = () => async (dispatch) => {
  
  let url = `${path}api/admin/all`;
  const config = { headers: {"x-auth-token": localStorage.getItem("token") }};
  const data = await axios.get(url, config).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data; 

  console.log(data) 

  dispatch({
    type: "SET_ADMINS", 
    payload: { 
      admins: data.data,
    },
  });
};
  