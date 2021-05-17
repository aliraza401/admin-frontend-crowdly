import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import EditImg from "./../assets/img/pencil-fill.png";
import { setLoading } from "../actions/loading";
import { setTeam } from './../actions/utils'


function ViewAdmins() {
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();
  const teams = useSelector(state => state.utils.teams);

  React.useEffect(() => {
    dispatch(setTeam());
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
                      <h4 class="card-title ">Join Club Table</h4>
                      <p class="card-category"> Here is table of all cities and area in system</p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            <th> No. </th>
                            <th> Name </th>
                            <th> Email </th>
                            <th> Contact Number </th>
                            <th> Skills </th>
                            <th> Bio </th>
                          </thead>
                          <tbody>
                            {
                              teams && teams.map((e, index) =>
                                <>
                                  <tr>
                                    <td> {index + 1} </td>
                                    <td> {e.name} </td>
                                    <td> {e.email} </td>
                                    <td> {e.contact_number} </td>
                                    <td> {e.skills} </td>
                                    <td> {e.bio} </td>
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


            </div>
          </div>

          <Footer />

        </div>

      </div>

    </div>
  );
}

export default ViewAdmins;
