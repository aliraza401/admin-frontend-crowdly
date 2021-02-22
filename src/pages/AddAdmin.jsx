import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

 
import axios from "axios";


function AddCategory() {
    const { addToast } = useToasts();
    const [ formAdmin, setFormAdmin ] = React.useState({});
    
    const [ loadingAdmin, setloadingAdmin ] = React.useState(false);
    
    const token = useSelector( state => state.token );

    const handleAdminSubmmit = e => {
        e.preventDefault();
        const url = `${heroku_path}api/admin`;
        const config = { headers: {"x-auth-token": token } };
        axios
          .post(url, formAdmin , config )
          .then(res => {
              if(res.status >= 200 && res.status < 300 ){
                // teast admin created success
                setFormAdmin({name:"",email:"",password:"",role:""});
                addToast('admin add success', { appearance: 'success' });
              }
          })  
          .catch( err => {
            if(err.response.status === 401 && err.response.data === "unauth"){
              addToast('you are not auth to access resource', { appearance: 'info' });
            }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
              addToast('please provide token', { appearance: 'info' });
            }else if(err.response.status === 403 && err.response.data === 'invalid token'){
              addToast('please provide valid token', { appearance: 'info' });
            }else{
              addToast('Server Error, Please try Again', { appearance: 'info' });
            }
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
                          <input type="text" required class="form-control mb-3" placeholder="Name" value={formAdmin.name} onChange={ e => setFormAdmin({...formAdmin, name: e.target.value}) } />
                          <input type="text" required class="form-control mb-3" placeholder="Email" value={formAdmin.email} onChange={ e => setFormAdmin({...formAdmin, email: e.target.value}) } />
                          <input type="text" required class="form-control mb-3" placeholder="Password" value={formAdmin.password} onChange={ e => setFormAdmin({...formAdmin, password: e.target.value}) } />
                          <select name="city" value={formAdmin.role} required  onChange={ e => setFormAdmin({...formAdmin, role: e.target.value}) }  class="custom-select mb-3" id="validationCustom04" style={{border: `1px solid #1668a8` }}>
                              <option > Select Role </option>
                              <option value="1"  > Content Editor </option>
                              <option value="2"  > Admin </option>
                              <option value="3"  > Super Admin </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {
                      loadingAdmin ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add Admin</button>
                    }
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
