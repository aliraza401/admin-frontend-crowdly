import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { useSelector } from "react-redux";
import { useToasts } from 'react-toast-notifications';
import axios from "axios";
import { setLoading } from "../actions/loading";
import { useDispatch } from "react-redux";
import { path } from './../path';

function AddCategory() {
  const { addToast } = useToasts();
  const [formAdmin, setFormAdmin] = React.useState({});
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const handleAdminSubmmit = e => {
    e.preventDefault();
    const url = `${path}api/admin`;
    const config = { headers: { "x-auth-token": token } };
    dispatch(setLoading(true));
    axios
      .post(url, formAdmin, config)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          setFormAdmin({ name: "", email: "", password: "" });
          addToast('admin add success', { appearance: 'success' });
          dispatch(setLoading(false));

        }
      })
      .catch(err => {
        dispatch(setLoading(false));
        addToast('Server Error, Please try Again', { appearance: 'info' });
      })
  };


  return (
    <div className="AddCategory">
      <div class="">
        <div class="main-panel">

          <Nav />

          <div class="content">
            <div class="container-fluid">

              <div class="row">
                <div class="col-md-8">
                  <div class="card">
                    <div class="card-header card-header-primary">
                      <h4 class="card-title">Add Admin</h4>
                      <p class="card-category">Here you can add business categories</p>
                    </div>
                    <div class="card-body">
                      <form onSubmit={handleAdminSubmmit} >
                        <div class="row">
                          <div class="col-md-12">
                            <div class="form-group">
                              <input type="text" required class="form-control mb-3" placeholder="Name" value={formAdmin.name} onChange={e => setFormAdmin({ ...formAdmin, name: e.target.value })} />
                              <input type="text" required class="form-control mb-3" placeholder="Email" value={formAdmin.email} onChange={e => setFormAdmin({ ...formAdmin, email: e.target.value })} />
                              <input type="text" required class="form-control mb-3" placeholder="Password" value={formAdmin.password} onChange={e => setFormAdmin({ ...formAdmin, password: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary pull-right">Add Admin</button>
                        <div class="clearfix"></div>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="card card-profile">
                    <div class="card-avatar">
                    </div>
                    <div class="card-body">
                      <p class="card-description mt-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, temporibus.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, aut?
                  </p>
                      {/* <a class="btn btn-primary text-white btn-round">Follow</a> */}
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

export default AddCategory;