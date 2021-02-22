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
import EditImg from "./../assets/img/pencil-fill.png";
import { Link } from "react-router-dom";


import userImg from "./../assets/img/user_img.png";


function ViewCustomer( props ) {
  const [ user, setUser ] = React.useState({});
  const [ editForm, setEditForm ] = React.useState({});
  const token = useSelector( state => state.token );

  const [laodingEdit, setloadingEdit] = React.useState(false);
  const [laodingDelete, setloadingDelete] = React.useState(false);

  const user_id = props.match.params.id;
  const [smShowDelete, setSmShowDelete] = React.useState(false);
  const { addToast } = useToasts();
  const histroy = useHistory();

  
  React.useEffect( () => {
    const url = `${heroku_path}api/users/${user_id}`;
    const config = { headers: {"x-auth-token": token }};
    axios
    .get(url, config)
    .then(res =>  {
        setUser( res.data );
        setEditForm( res.data );
        console.log(res.data);
        console.log( res.data.packages  );
    })  
    .catch( err => {
     
    })
  },[]);

  const handleEditUser = e => {
    e.preventDefault();
    console.log( editForm )
    const url = `${heroku_path}api/users`;
    const config = { headers: {"x-auth-token": token }};
    setloadingEdit(true);
    axios
    .put(url,editForm, config)
    .then(res =>  {
        setloadingEdit(false);
        addToast('user Edit success', { appearance: 'success' });
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

  const handleDeleteUser = e => {
    e.preventDefault();
    const url = `${heroku_path}api/users/${user._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
        if( res.data.deletedCount == 1 ){
            setloadingDelete(false);
            addToast('delete User Successfully', { appearance: 'info' });
            setSmShowDelete(false);
            histroy.push("/view-customers");
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


  const printUserBusiness = user => {
    if( user.roles ){
      if ( user.roles.includes("B_USER")  ) return "Business User"
      return "Regular User"
    }
  }

  const printUserType = user => {
    if ( user.isFacebookUser ) return "Facebook User"
    else if ( user.isGoogleUser ) return "Google User"
    else if ( user.isCustomUser ) return "Custom User"
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
                  <h4 class="card-title">Edit User Profile</h4>
                  <p class="card-category">Complete your profile</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleEditUser}>
                    <div className="row">
                      <div className="col-md-6">

                      </div>
                      <div className="col-md-6 text-right">
                        <p class="card-description">
                          <span className="font-weight-bold">Created At: </span>
                          { user._id ? new Date( parseInt( user._id.substring(0,8), 16 ) * 1000 ).toDateString() : "" }
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
                          <input disabled type="text" class="form-control"  required value={editForm.email} onChange={ e => setEditForm({ ...editForm, email: e.target.value }) } />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-5">
                        <div class="form-group bmd-form-group">
                          {/* <label class="bmd-label-floating"> Name: </label> */}
                          <input type="text" class="form-control" disabled value={printUserType(user)}  />
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group bmd-form-group">
                          {/* <label class="bmd-label-floating"> Name: </label> */}
                          <input type="text" class="form-control" disabled value={printUserBusiness(user)}  />
                        </div>
                      </div>
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
                    <img class="img img-fluid rounded-circle" style={{width: 120, height:120}} src={ user.imageUrl ? user.imageUrl : userImg } />
                  </a>
                </div>
                <div class="card-body">
                  <h6 class="card-category text-gray">  </h6>
                  <h4 class="card-title">{user.name}</h4>
                  <p class="card-description">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo, voluptatum perspiciatis illum voluptatem obcaecati tempore molestiae ad nulla accusantium adipisci?
                  </p>
                  {/* <a href="javascript:;" class="btn btn-primary btn-round">Follow</a> */}
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-5" style={{ maxHeight:500, overflowY: 'scroll' }} >
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Business Users Table</h4>
                  <p class="card-category"> Here is table of all users in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Package </th>
                        <th> Name </th>
                        <th> Cell </th>
                        <th> Area & City </th>
                        <th> Edit </th>
                      </thead>
                      <tbody>
                        {
                          //  <tr className="text-center"><Ripple color="#8553aa" size={30} /></tr> 
                          user.packages &&
                          user.packages.map( ( e, index) => 
                          <>
                            <tr>
                                <td> {index+1} </td>
                                {
                                  e.id &&
                                  <td> { e.id.name } </td>
                                }
                                {
                                  e.b_id ?
                                  <>
                                    <td> { e.b_id.name } </td>
                                    <td> { e.b_id.cellno } </td>
                                    <td> { e.b_id.area + " , " + e.b_id.city } </td>
                                    <Link to={`/view-business/${e.b_id._id}`}> <td> <img className="cursor-pointer" src={EditImg} alt=""/>  </td> </Link>
                                  </> :
                                 <>
                                  <td> - </td>
                                  <td> - </td>
                                  <td> - </td>
                                  <td> - </td>
                                </>
                                }
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
              <form onSubmit={handleDeleteUser} >
                  {/* <p>{selectedCategory.name}</p> */}
                  <p> Are you sure you want to delete <span className="font-weight-bold">  {user.name} </span> ? </p>
                  <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
              </form>
          </Modal.Body>
      </Modal>

    </div>
  );
}

export default ViewCustomer;
