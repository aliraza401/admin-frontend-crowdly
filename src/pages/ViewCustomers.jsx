import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import userImg from "./../assets/img/user_img.png";
import ShowError from "./../showError";
import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";
import { Link } from "react-router-dom";


function ViewPackage() {
    const token = useSelector( state => state.token );
    const [ users, setUsers ] = React.useState([]);
    const [ businessUsers, setBusinessUsers ] = React.useState([]);
    const { addToast } = useToasts();

    const [ loadingUsers, setLoadingUsers ] = React.useState(true);
    const [ loadingBusers, setLoadingBUsers ] = React.useState(true);



    React.useEffect( () => {
        const url = `${heroku_path}api/users/business_users`;
        const config = { headers: {"x-auth-token": token }};
        axios
        .get(url, config )
        .then(res =>  {
          setBusinessUsers(res.data);
          setLoadingBUsers(false)
        })  
        .catch( err => {
            const result = ShowError(err)
            addToast( result.msg + result.status , { appearance: 'info' });
        });

        axios
        .get( `${heroku_path}api/users/users` , config )
        .then(res =>  {
          setUsers(res.data)
          setLoadingUsers(false)
        })  
        .catch( err => {
          const result = ShowError(err)
          addToast( result.msg + result.status , { appearance: 'info' });
        });

    },[]);

    // const handleEditPackage = e => {
    //     e.preventDefault();
    //     const url = `${heroku_path}api/packages`;
    //     const config = { headers: {"x-auth-token": token }};
    //     setloadingPkg(true);
    //     axios
    //     .put(url, {_id: selectedPackage._id, name: selectedPackage.name, price: selectedPackage.price, description: selectedPackage.description }, config )
    //     .then(res =>  {
    //         setloadingPkg(false);
    //         // seSubCCategories(res.data)
    //         const temp = packages.map( pkg => {
    //             if ( pkg._id === res.data._id ){
    //                 return pkg = res.data;
    //             }
    //             return pkg;
    //         });
    //         setPackages( temp );
    //         setSmShow(false);
    //         setSelectedPackage({ name: "", price: "", description: "" });
    //         addToast('edit package success', { appearance: 'success' });
    //     })  
    //     .catch( err => {
    //       if(err.response.status === 401 && err.response.data === "unauth"){
    //         addToast('you are not auth to access resource', { appearance: 'info' });
    //       }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
    //         addToast('please provide token', { appearance: 'info' });
    //       }else if(err.response.status === 403 && err.response.data === 'invalid token'){
    //         addToast('please provide valid token', { appearance: 'info' });
    //       }else{
    //         addToast('Server Error, Please try Again', { appearance: 'info' });
    //       }
    //     })
    // }

    // const handleDeletePackage = e => {
    //     e.preventDefault();
    //     console.log("here")
    //     const url = `${heroku_path}api/packages/${ selectedPackage._id }`;
    //     const config = { headers: {"x-auth-token": token }};
    //     setloadingDelete(true);
    //     axios
    //     .delete(url , config )
    //     .then(res =>  {
    //         console.log("also here")
    //         if( res.data.deletedCount == 1 ){
    //             const temp = packages.filter( pkg => pkg._id != selectedPackage._id );
    //             console.log(temp);
    //             addToast('delete pkg Successfully', { appearance: 'info' });
    //             setPackages( temp );
    //             setloadingDelete(false)
    //             setSmShowDelete(false);
    //         }
    //     })  
    //     .catch( err => {
    //       if(err.response.status === 401 && err.response.data === "unauth"){
    //         addToast('you are not auth to access resource', { appearance: 'info' });
    //       }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
    //         addToast('please provide token', { appearance: 'info' });
    //       }else if(err.response.status === 403 && err.response.data === 'invalid token'){
    //         addToast('please provide valid token', { appearance: 'info' });
    //       }else{
    //         addToast('Server Error, Please try Again', { appearance: 'info' });
    //       }
    //     })
    // }


  return (
    <div className="ViewCustomers">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">

        <div class="row" style={{ maxHeight:500, overflowY: 'scroll' }}>
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Users </h4>
                  <p class="card-category"> Here is table of all users in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Picture </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> View Details </th>
                      </thead>
                      <tbody>
                        {
                          //  <tr className="text-center"><Ripple color="#8553aa" size={30} /></tr> 
                          users.map( (e, index) => 
                          <>
                            <tr>
                                <td> {index+1} </td>
                                <td> <img src={ e.imageUrl ? e.imageUrl : userImg } className="img img-fluid rounded-circle" style={{ width: 50, height: 50 }} ></img> </td>
                                <td> {e.name} </td>
                                <td> {e.email} </td>
                                <Link to={`/view-user/${e._id}`}> <td> <img className="cursor-pointer" src={EditImg} alt=""/>  </td> </Link>
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

          <div class="row mt-5" style={{ maxHeight:500, overflowY: 'scroll' }} >
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Business Customers </h4>
                  <p class="card-category"> Here is table of all customers in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> EDIT </th>
                        <th> View Details </th>
                      </thead>
                      <tbody>
                        {
                          //  <tr className="text-center"><Ripple color="#8553aa" size={30} /></tr> 
                          businessUsers.map( (e, index) => 
                          <>
                            <tr>
                                <td> {index+1} </td>
                                <td> <img src={e.imageUrl ? e.imageUrl : userImg} className="img img-fluid  rounded-circle" style={{ width: 50, height: 50 }} ></img> </td>
                                <td> {e.name} </td>
                                <td> {e.email} </td>
                                <Link to={`/view-customer/${e._id}`}> <td> <img className="cursor-pointer" src={EditImg} alt=""/>  </td> </Link>
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

        {/* <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit Package
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditPackage} >
                    <input type="text" required class="form-control mb-3"  value={selectedPackage.name} onChange={ e => setSelectedPackage({ ...selectedPackage, name: e.target.value }) } />
                    <input type="text" required class="form-control mb-3"  value={selectedPackage.price} onChange={ e => setSelectedPackage({ ...selectedPackage, price: e.target.value }) }  />
                    <textarea required class="form-control mb-3"  value={selectedPackage.description} onChange={ e => setSelectedPackage({ ...selectedPackage, description: e.target.value }) }  /> 
                    {
                      laodingpkg ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button 
                        type="subimt" 
                        disabled={ selectedPackage.name.length < 1 || selectedPackage.price.length < 1 || selectedPackage.description.length < 1  }  
                        className="btn btn-primary btn-block" 
                      > 
                        Edit 
                      </button>
                    }
                </form>
            </Modal.Body>
        </Modal>

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
                <form onSubmit={handleDeletePackage} >
                    <p>{selectedCategory.name}</p>
                    <p> Are you sure you want to delete <span className="font-weight-bold"> { selectedPackage.name } </span> ? </p>
                    {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
                    }
                </form>
            </Modal.Body>
        </Modal> */}

    </div>
  );
}

export default ViewPackage;
