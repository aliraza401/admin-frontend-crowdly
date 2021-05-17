import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

import { setLocations } from "../actions/locations";
import { setLoading } from "../actions/loading";


function ViewLocation() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const city = useSelector(state => state.locations.locations)
  const token = useSelector(state => state.user.token);


  const handleDeleteCity = _id => {
    const url = `${path}api/city/${_id}`;
    const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    dispatch(setLoading(true));
    axios
      .delete(url, config)
      .then(res => {
        dispatch(setLocations()); 
        addToast('delete city success', { appearance: 'info' });
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        addToast('Server Error, Please try Again', { appearance: 'info' });
      })
  }

  const handleDeleteArea = _id => {
    const url = `${path}api/city/area/${_id}`;
    const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    dispatch(setLoading(true));
    axios
      .delete(url, config)
      .then(res => {
        dispatch(setLocations());
        addToast('delete area success', { appearance: 'info' });
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        addToast('Server Error, Please try Again', { appearance: 'info' });
      })
  }



  return (
    <div className="ViewLocation">
      <div class="">
        <div class="main-panel">

          <Nav />

          <div class="content">
            <div class="container-fluid">

              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header card-header-primary">
                      <h4 class="card-title ">City Table</h4>
                      <p class="card-category"> Here is table of all cities and aCityrea in system</p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <th> No. </th>
                            <th> City Name </th>
                            {/* <th> EDIT </th> */}
                            <th> DELETE </th>
                          </thead>
                          <tbody>
                            {
                              city.map((e, index) =>
                                <>
                                  <tr>
                                    <td> {index + 1} </td>
                                    <td> {e.name} </td>
                                    {/* <td> <img className="cursor-pointer" src={EditImg} alt="" />  </td> */}
                                    <td > <img onClick={() => handleDeleteCity(e._id)} className="cursor-pointer" src={closeImg} alt="" /> </td>
                                  </tr>
                                </>
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              <div class="row">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header card-header-primary">
                      <h4 class="card-title ">Area Table</h4>
                      <p class="card-category"> Here is table of all cities and aCityrea in system</p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <th> No. </th>
                            <th> City Name </th>
                            <th> Area Name </th>
                            <th> Coordinates </th>
                            {/* <th> EDIT </th> */}
                            <th> DELETE </th>
                          </thead>
                          <tbody>
                            {
                              city && city.map((e, index) =>
                                e.areas && e.areas.map((are) =>
                                  <tr>
                                    <td> {index + 1} </td>
                                    <td> {e.name} </td>
                                    <td> {are.name} </td>
                                    <td> {are.coordinates} </td>
                                    {/* <td > <img className="cursor-pointer" src={EditImg} alt="" />  </td> */}
                                    <td > <img onClick={() => handleDeleteArea(are._id)} className="cursor-pointer" src={closeImg} alt="" /> </td>
                                  </tr>
                                )
                              )
                            }
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </div>
          </div>

          <Footer />

        </div>

      </div>









    </div>
  );
}

export default ViewLocation;
