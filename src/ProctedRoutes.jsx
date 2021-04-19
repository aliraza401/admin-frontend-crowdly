import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";


function ProctedRoutes({ component: Component, ...rest }) {
  const isLoggedIn = useSelector( state => state.user.isLoggedIn);

  {
    isLoggedIn ? <h1 className="text-center" >Yes</h1> : <h1 className="text-center" >No</h1>
  }

  return (
    <Route 
      {...rest}
      render={ props => {
        if( isLoggedIn ){ 
          return <Component {...props} />
        }else{
          return <Redirect to="/login" />;
        }
           
      }}
    />
  );
}

export default ProctedRoutes;
