import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {DropdownButton, Dropdown } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom"; 
import { path } from "./../path";
import { useToasts } from 'react-toast-notifications';

import { logoutUser } from "./../actions/users"

function ViewCategory() {
  const name = useSelector(state => state.user.user.name);
  const email = useSelector(state => state.user.user.email);
  const role = useSelector(state => state.user.user.role);
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const history = useHistory();
  const { addToast } = useToasts();

  
  const printRole = () => {
    if ( role === 3  ){
      return <span className="font-weight-bold">SuperAdmin</span>
    }else if( role === 2 ){
      return <span className="font-weight-bold">Admin</span>
    }else{
      return <span className="font-weight-bold">Admin</span>
    }
  }

  const handleLogout = () => {
    dispatch(logoutUser());

    localStorage.removeItem("token");
    addToast('Logout Success', { appearance: 'error' })
    history.push("/login");

  }
  

  return ( 
      <nav class="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
        <div class="container-fluid">
          <div class="navbar-wrapper">
            <span class="navbar-brand" >
              Crowdly Admin Panel
            </span>
          </div>
          <div class="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li>{ printRole()  }</li>
              <li class="nav-item dropdown">

                    <Dropdown>
                      <Dropdown.Toggle>
                      <i class="material-icons">person</i>
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item onClick={ handleLogout } >Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  );
}

export default ViewCategory;
