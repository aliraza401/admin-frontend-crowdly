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
import { useToasts } from 'react-toast-notifications';



function App() {
  const isLoggedIn = useSelector( state => state.isLoggedIn );
  const dispatch = useDispatch();
  const { addToast } = useToasts();


  // first main method when application start
  React.useEffect( () => {
  const token = localStorage.getItem("token");
  if(token){
    const url = `${heroku_path}api/admin/admins`;
    const config = { headers: {"x-auth-token": token } };
    axios
      .get(url, config)
      .then(res => {
        const {email, name, role} = res.data;
        dispatch({
          type: 'SET_USER_DATA',
          usersData: {email, name, role},
          token,
          isLoggedIn: true,
        })
      })
      .catch( err => {
        if(err.response){
          if(err.response.status === 401 && err.response.data === "unauth"){
            addToast('you are not auth to access resource', { appearance: 'info' });
          }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            addToast('please provide token', { appearance: 'info' });
          }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            addToast('please provide valid token', { appearance: 'info' });
          }else{
            addToast('Server Error, Please try Again', { appearance: 'info' });
          }
        }
      });
  }else{
    dispatch({
      type: 'SET_USER_DATA',
      isLoggedIn: false,
    })
  }
},[])

  return (
    <div className="App">
      <>
      { isLoggedIn && <Sidebar />  }
      <Route path="/login" exact component={Login} />
          <Switch>
            <ProctedRoutes path="/" exact component={Dashboard} />
            <ProctedRoutes path="/add-category" exact component={AddCategory } />
            <ProctedRoutes path="/view-category" exact component={ViewCategory } />
            <ProctedRoutes path="/add-package" exact component={AddPackage } />
            <ProctedRoutes path="/view-package" exact component={ViewPackage } />
            <ProctedRoutes path="/add-location" exact component={AddLocation } />
            <ProctedRoutes path="/view-location" exact component={ViewLocation } />
            <ProctedRoutes path="/add-admin" exact component={AddAdmin } />
            <ProctedRoutes path="/view-admins" exact component={ViewAdmins} />
            <ProctedRoutes path="/view-admin/:id" exact component={ViewAdmin} />
            <ProctedRoutes path="/view-customers" exact component={ViewCustomers} />
            <ProctedRoutes path="/view-customer/:id" exact component={ViewCustomer} />
            <ProctedRoutes path="/view-business/:id" exact component={ViewBusiness} />
            <ProctedRoutes path="/view-user/:id" exact component={ViewUser} />
            <ProctedRoutes path="*" component={ () => "404 not found" } />
          </Switch>
      </>

    </div>
  );
}

export default App;
