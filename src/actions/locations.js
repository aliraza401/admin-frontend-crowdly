import axios from "axios";

export const setLocations = () => async (dispatch) => {
  
  let url = `http://localhost:5000/api/city/`;
  const data = await axios.get(url).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  }); 

  if (data.error) return data;

  dispatch({
    type: "SET_LOCATIONS",
    payload: {
      locations: data.data,
    },
  });
}; 
 