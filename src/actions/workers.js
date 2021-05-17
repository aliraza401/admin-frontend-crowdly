import axios from "axios";
import { path } from './../path';

export const setUnverifiedWorkers = () => async (dispatch) => {

  let url = `${path}api/workers/not-verified`;
  const data = await axios.get(url).catch(err => {
    console.log(err.response)
    return { error: err.response };
  });

  if (data.error) return data;

  dispatch({
    type: "SET_WORKERS",
    payload: {
      workers: data.data,
    },
  });
};
