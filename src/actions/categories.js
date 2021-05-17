import axios from "axios";
import {path} from './../path';

export const setCategories = () => async (dispatch) => {
  
  let url = `${path}api/categories/all`;
  const data = await axios.get(url).catch((err) => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data;

  dispatch({
    type: "SET_CATEGORIES",
    payload: {
      categories: data.data,
    },
  });
};
 