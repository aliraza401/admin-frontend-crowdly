import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { useHistory } from "react-router-dom";
import {Ripple} from "react-css-spinners";

import UserImg from "./../assets/img/marc.jpg";


function ViewAdmin( props ) {
  const [ admin, setAdmin ] = React.useState({});
  const [ editForm, setEditForm ] = React.useState({});
  const token = useSelector( state => state.token );

  const [laodingEdit, setloadingEdit] = React.useState(false);
  const [laodingDelete, setloadingDelete] = React.useState(false);

  const admin_id = props.match.params.id;
  const [smShowDelete, setSmShowDelete] = React.useState(false);
  const { addToast } = useToasts();
  const histroy = useHistory();
  
  React.useEffect( () => {
    const url = `${heroku_path}api/admin/admin/${admin_id}`;
    const config = { headers: {"x-auth-token": token }};
    axios
    .get(url, config)
    .then(res =>  {
        const { _id ,name, email, role } = res.data;
        console.log({ _id, name, email, role });
        setAdmin({ _id, name, email, role });
        setEditForm({ _id, name, email, role });
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
  },[]);

  const handleEditAdmin = e => {
    e.preventDefault();
    console.log( editForm )
    const url = `${heroku_path}api/admin`;
    const config = { headers: {"x-auth-token": token }};
    setloadingEdit(true);
    axios
    .put(url,editForm, config)
    .then(res =>  {
        setloadingEdit(false);
        const { _id, name, email, role } = res.data;
        console.log({ _id, name, email, role });
        setAdmin({ _id, name, email, role });
        setEditForm({ _id, name, email, role });
        addToast('admin Edit success', { appearance: 'success' });
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
  }

  const handleDeleteAdmin = e => {
    e.preventDefault();
    const url = `${heroku_path}api/admin/${admin._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
        if( res.data.deletedCount == 1 ){
          setloadingDelete(false);
            addToast('delete Admin Successfully', { appearance: 'info' });
            setSmShowDelete(false);
            histroy.push("/view-admins");
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
  }


  // {email: "Khan@gmail.com",
  //  name: "Mubeen Khan", 
  //  role: 1, 
  //  token: "eWjsgo"}


  const printRole = () => {
    if( admin.role === 3){
      return "SuperAdmin";
    }else if( admin.role === 2 ){
      return "Admin"
    }else if( admin.role === 1){
      return "Content Creator"
    }
  }


  return (
    <div className="ViewLocation">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">

        <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Edit Admin Profile</h4>
                  <p class="card-category">Complete your profile</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleEditAdmin}>
                    <div className="row">
                      <div className="col-md-6">

                      </div>
                      <div className="col-md-6 text-right">
                        <p class="card-description">
                          <span className="font-weight-bold">Created At: </span>
                          { admin._id ? new Date( parseInt( admin._id.substring(0,8), 16 ) * 1000 ).toDateString() : "" }
                        </p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-5">
                        <div class="form-group bmd-form-group">
                          {/* <label class="bmd-label-floating"> Name: </label> */}
                          <input type="text" class="form-control"  required value={editForm.name} onChange={ e => setEditForm({ ...editForm, name: e.target.value }) } />
                        </div>
                      </div>
                      <div class="col-md-7">
                        <div class="form-group bmd-form-group">
                          {/* <label class="bmd-label-floating">Email: </label> */}
                          <input type="text" class="form-control"  required value={editForm.email} onChange={ e => setEditForm({ ...editForm, email: e.target.value }) } />
                        </div>
                      </div>
                    </div>
                    <div class="form-group bmd-form-group">
                      {/* <label class="bmd-label-floating">Role: </label> */}
                      {/* <input type="text" class="form-control" value={ printRole() } /> */}
                      <select name="city" value={editForm.role} required  onChange={ e => setEditForm({...editForm, role: e.target.value}) }  class="custom-select mb-3" id="validationCustom04" style={{border: `1px solid #1668a8` }}>
                          <option > Select Role </option>
                          <option value="1"  > Content Editor </option>
                          <option value="2"  > Admin </option>
                          <option value="3"  > Super Admin </option>
                      </select>
                    </div>
                    {
                      laodingEdit ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Update Profile</button>
                    }
                    <div class="clearfix"></div>
                  </form>
                  <hr></hr>
                  <p class="card-description">
                    Lorem ipsum dolor obcaecati tempore molestiae ad nulla accusantium adipisci?
                  </p>
                  {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button onClick={() => { setSmShowDelete(true) }} class="btn btn-primary pull-right bg-danger">Delete Profile</button>
                    }
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card card-profile">
                <div class="card-avatar">
                  <a href="javascript:;">
                    <img class="img" src={UserImg} />
                  </a>
                </div>
                <div class="card-body">
                  <h6 class="card-category text-gray"> {printRole()} </h6>
                  <h4 class="card-title">{admin.name}</h4>
                  <p class="card-description">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, voluptatum perspiciatis illum voluptatem obcaecati tempore molestiae ad nulla accusantium adipisci?
                  </p>
                  {/* <a href="javascript:;" class="btn btn-primary btn-round">Follow</a> */}
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

        <Footer />

    </div>

        </div>

      <Modal
          size="sm"
          show={smShowDelete}
          onHide={() => setSmShowDelete(false)}
          aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
              Delte Package
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <form onSubmit={handleDeleteAdmin} >
                  {/* <p>{selectedCategory.name}</p> */}
                  <p> Are you sure you want to delete <span className="font-weight-bold">  {admin.name} </span> ? </p>
                  <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
              </form>
          </Modal.Body>
      </Modal>

    </div>
  );
}

export default ViewAdmin;
