import { combineReducers } from "redux";
import usersReducer from "./users";
import modalsReducer from "./modals";
import loadingReducer from "./loading";
import dashboardReducer from "./dashboard";
import categoriesReducer from "./categories";
import locationsReducer from "./locations";

const rootReducer = combineReducers({
  user: usersReducer,
  modals: modalsReducer,
  isLoading: loadingReducer,
  dashboard: dashboardReducer,
  categories: categoriesReducer,
  locations: locationsReducer
}); 

export default rootReducer; 
