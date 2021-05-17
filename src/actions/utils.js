import axios from "axios";
import {path} from './../path';

export const setTeam = () => async (dispatch) => {
  
  let url = `${path}api/utility/team`;
  const data = await axios.get(url).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data;

  console.log(data)

  dispatch({
    type: "SET_TEAMS",
    payload: {
      teams: data.data,
    },
  });
};
 


export const setContacts = () => async (dispatch) => {
  
  let url = `${path}api/utility/contact`;
  const data = await axios.get(url).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data;

  console.log(data)

  dispatch({
    type: "SET_CONTACTS",
    payload: {
      contacts: data.data,
    },
  });
};
 