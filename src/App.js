import React from "react";
import "./assets/style/material-dashboard.css";
import "./assets/style/style2.scss";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/AddCategory";
import ViewCategory from "./pages/ViewCategory";
import AddLocation from "./pages/AddLocation";
import ViewLocation from "./pages/ViewLocation";
import AddAdmin from "./pages/AddAdmin";
import Login from "./pages/Login";
import ViewAdmins from "./pages/ViewAdmins";
import ViewWorkers from "./pages/ViewWorkers";
import ViewTeam from "./pages/ViewTeam";
import ViewContact from "./pages/ViewContact";


import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { getUser } from "./actions/users";
import { setCategories } from "./actions/categories";
import { setLocations } from "./actions/locations";
import { setAdmins } from "./actions/admins";
import { setUnverifiedWorkers } from "./actions/workers";
import { Roller } from "react-css-spinners";



function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const loading = useSelector((state) => state.isLoading.loading);
  const dispatch = useDispatch();
  const { addToast } = useToasts(); 

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(setCategories());
    dispatch(setLocations());
    dispatch(setAdmins());
    dispatch(setUnverifiedWorkers());
  }, []);

  return (
    <div className="App">
      <>
        {loading && (
          <div className="overlay-loading">
            <Roller color="#00796b" className="loading-spinner" size={70} />
          </div>
        )}
        { !isLoggedIn ? "" : <Sidebar />}
        <Route path="/login" exact component={Login} />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/add-category" exact component={AddCategory} />
          <Route path="/view-category" exact component={ViewCategory} />
          <Route path="/add-location" exact component={AddLocation} />
          <Route path="/view-location" exact component={ViewLocation} />
          <Route path="/add-admin" exact component={AddAdmin} /> 
          <Route path="/view-admins" exact component={ViewAdmins} />
          <Route path="/view-workers" exact component={ViewWorkers} />
          <Route path="/view-team" exact component={ViewTeam} />
          <Route path="/view-contact" exact component={ViewContact} />
          <Route path="*" component={() => ""} />
        </Switch> 
      </>
    </div>
  );
}

export default App;
