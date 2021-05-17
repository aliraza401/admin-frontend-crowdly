

import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { path } from "./../path";

import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

import { setUnverifiedWorkers } from "./../actions/workers";
import { setLoading } from "../actions/loading";
import UserImg from './../assets/img/user_img.png'
 

function ViewCategory() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const workers = useSelector(state => state.workers.workers)

  React.useEffect(() => {
    dispatch(setUnverifiedWorkers());
  }, []); 

  const VeifyWorker = (worker_id) => {
    const url = `${path}api/workers/verify`;
    const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    dispatch(setLoading(true));
    axios
      .post(url, { worker_id }, config) 
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(setUnverifiedWorkers());
          addToast("Worker verified success", { appearance: 'success' });
          dispatch(setLoading(false));

        }
      })
      .catch(err => {
        dispatch(setLoading(false));
        console.log(err.response);
        addToast('Server Error, Please try Again', { appearance: 'info' });
      })
  }


  return (
    <div className="ViewCategory">
      <div class="">
        <div class="main-panel">

          <Nav />

          <div class="content">
            <div class="container-fluid">


              <div class="row mt-5">
                <div class="col-md-12">
                  <div class="card">
                    <div class="card-header card-header-primary">
                      <h4 class="card-title ">Workers Table</h4>
                      <p class="card-category"> Here is table of all workers and sub workers in system</p>
                    </div>
                    <div class="card-body">
                      <div class="table-responsive">
                        <table class="table">
                          <thead class=" text-primary">
                            {/* <th> No. </th> */}
                            <th> Name </th>
                            <th> Picture </th>
                            <th> Contact </th>
                            <th> Location </th>
                            <th> Category </th>
                            <th> CNIC NO </th>
                            <th>Created At</th>
                            <th> VERIFY </th>
                          </thead>
                          <tbody>
                            {
                              workers && workers.slice(0).reverse().map((e, index) =>
                                <tr>
                                  {/* <td> {index + 1} </td> */}
                                  <td>{e.u_id && e.u_id.name}</td>
                                  <td>{e.picture === "temp" ? <img className="img text-center w70px img-fluid" src={UserImg} /> : <img className="img w100px img-fluid" src={e.picture} />}</td>
                                  <td>{e.contact_number}</td>
                                  <td>{e.area && e.area.name + ", " + e.city && e.city.name}</td>
                                  <td>{e.subCategory_id && e.subCategory_id.name + ", " + e.category_id && e.category_id.name}</td>
                                  <td>{e.cnic_no && e.cnic_no}</td>
                                  <td>{new Date(parseInt(e._id.substring(0, 8), 16) * 1000).toDateString()}</td>
                                  <td>  <svg className="cursor-pointer" onClick={() => VeifyWorker(e._id)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z" /><path d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z" fill="rgba(22,104,168,1)" /></svg>  </td>
                                </tr> 
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

export default ViewCategory;
