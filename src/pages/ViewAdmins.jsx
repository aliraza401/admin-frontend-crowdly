import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setLoading } from "../actions/loading";

import { setAdmins } from "./../actions/admins"; 

function ViewAdmins() {
  const token = useSelector((state) => state.token);
  const admins = useSelector((state) => state.admins.admins);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setAdmins());
  }, []);

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
                      <h4 class="card-title ">Admin Table</h4>
                      <p class="card-category">
                        {" "}
                        Here is table of all cities and area in system
                      </p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <th> No. </th>
                            <th> Name </th>
                            <th> Email </th>
                          </thead>
                          <tbody>
                            {admins &&
                              admins.map((e, index) => (
                                <>
                                  <tr>
                                    <td> {index + 1} </td>
                                    <td> {e.name} </td>
                                    <td> {e.email} </td>
                                  </tr>
                                </>
                              ))}
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

export default ViewAdmins;
