
// import { combineReducers } from "redux";
// import loggedReducer from "./isLogged";

// const allReducers = combineReducers ({
//     isLoggedIn : loggedReducer
// } );

// export default allReducers;


const initalState = {
    usersData: {},
    token: "",
    isLoggedIn: true,
};

export default function reducer(state = initalState, action) {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                usersData: action.usersData,
                isLoggedIn: action.isLoggedIn,
                token: action.token,
            };
        case "GET_USER_DATA":
            return {
                ...state,
                usersData: action.usersData,
                isLoggedIn: action.isLoggedIn,
                token: action.token,
            };
        default:
            return state;
    }
}