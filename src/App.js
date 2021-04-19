import React from "react";
import "./assets/style/material-dashboard.css";
import "./assets/style/style2.scss";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddCategory from "./pages/AddCategory";
import ViewCategory from "./pages/ViewCategory";
import AddPackage from "./pages/AddPackage";
import ViewPackage from "./pages/ViewPackage";
import AddLocation from "./pages/AddLocation";
import ViewLocation from "./pages/ViewLocation";
import AddAdmin from "./pages/AddAdmin";
import Login from "./pages/Login";
import ViewAdmins from "./pages/ViewAdmins";
import ViewAdmin from "./pages/ViewAdmin";
import ViewCustomers from "./pages/ViewCustomers";
import ViewCustomer from "./pages/ViewCustomer";
import ViewUser from "./pages/ViewUser";
import ViewBusiness from "./pages/ViewBusiness";
import { heroku_path } from "./path";

import ProctedRoutes from "./ProctedRoutes";

import { useHistory, Switch, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { getUser } from "./actions/users";
import { setCategories } from "./actions/categories";
import { setLocations } from "./actions/locations";

function App() {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  React.useEffect(() => {
    dispatch(getUser());
    dispatch(setCategories());  
    dispatch(setLocations()); 
  }, []);

  return (
    <div className="App">
      <>
        {isLoggedIn && <Sidebar />}
        <Route path="/login" exact component={Login} />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/add-category" exact component={AddCategory} />
          <Route path="/view-category" exact component={ViewCategory} />
          <Route path="/add-package" exact component={AddPackage} />
          <Route path="/view-package" exact component={ViewPackage} />
          <Route path="/add-location" exact component={AddLocation} />
          <Route path="/view-location" exact component={ViewLocation} />
          <Route path="/add-admin" exact component={AddAdmin} />
          <Route path="/view-admins" exact component={ViewAdmins} />
          <Route path="/view-admin/:id" exact component={ViewAdmin} />
          <Route path="/view-customers" exact component={ViewCustomers} />
          <Route path="/view-customer/:id" exact component={ViewCustomer} />
          <Route path="/view-business/:id" exact component={ViewBusiness} />
          <Route path="/view-user/:id" exact component={ViewUser} />
          <Route path="*" component={() => "404 not found"} />
        </Switch>
      </>
    </div>
  );
}

export default App;
