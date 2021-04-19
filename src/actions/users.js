import axios from "axios";


export const customLogin = (data) => async (dispatch) => {
  let url = `http://localhost:5000/api/admin/login`;
  const user = await axios.post(url, data).catch((err) => {
    return { error: err.response };
  });

  if (user.error) return user;

  dispatch({
    type: "SET_USER",
    payload: { user: user.data.admin },
  });

  dispatch({
    type: "SET_ISLOGGED",
    payload: { isLoggedIn: true },
  });

  dispatch({
    type: "SET_TOKEN",
    payload: { token: user.data.token },
  });
  localStorage.setItem("token", user.data.token);

  dispatch({
    type: "SET_REFRESH_TOKEN", 
    payload: { refreshToken: user.data.refreshToken },
  });
  localStorage.setItem("refreshToken", user.data.refreshToken);
 
  return user;
 
};  
 
export const getUser = (response) => async (dispatch) => {
  let url = `http://localhost:5000/api/admin/`;
  const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
  const user = await axios.get(url, config).catch((err) => {
    // refresh token logic
    if( err.response.data.message === "jwt expired" && err.response.data.status === 401  ){
        let urlRefreshToken = `http://localhost:5000/api/users/refresh-token`;
        const config = {
          headers: { "x-auth-token": localStorage.getItem("refreshToken") },
        };
        axios
          .get(urlRefreshToken, config)
          .then( res => {
            localStorage.removeItem("token");
            localStorage.removeItem("tempToken");
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            getUser();
          })
          .catch((err) => console.log(err));
    }
     
  }); 


  if (user != undefined) {
    dispatch({
      type: "SET_USER",
      payload: { user: user.data.admin },
    });

    dispatch({
      type: "SET_ISLOGGED",
      payload: { isLoggedIn: true },
    });

    dispatch({
      type: "SET_TOKEN",
      payload: { token: localStorage.getItem("token") },
    });
  } else {
    dispatch({
      type: "SET_USER",
      payload: { user: {} },
    });

    dispatch({
      type: "SET_ISLOGGED",
      payload: { isLoggedIn: false },
    });

    dispatch({
      type: "SET_TOKEN",
      payload: { token: "" },
    });
  }
};

export const logoutUser = (response) => async (dispatch) => {
  dispatch({
    type: "SET_USER",
    payload: { user: {} },
  });

  dispatch({
    type: "SET_ISLOGGED",
    payload: { isLoggedIn: false },
  });

  dispatch({
    type: "SET_TOKEN",
    payload: { token: "" },
  });

  localStorage.removeItem("token");
};
