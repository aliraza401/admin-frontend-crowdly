import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";  
import { heroku_path } from "./../path";

import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";


function ViewCustomers() {
    const token = useSelector( state => state.token );
    const [ packages, setPackages ] = React.useState([]);
    const [selectedPackage, setSelectedPackage] = React.useState({name:"", price:"", description:""});
    const [smShow, setSmShow] = React.useState(false);
    const [smShowDelete, setSmShowDelete] = React.useState(false);
    const { addToast } = useToasts();

    const [laodingList, setloadingList] = React.useState(true);
    const [laodingpkg, setloadingPkg] = React.useState(false);
    const [laodingDelete, setloadingDelete] = React.useState(false);



    React.useEffect( () => {
        const url = `${heroku_path}api/packages`;
        const config = { headers: {"x-auth-token": token }};
        axios
        .get(url, config )
        .then(res =>  {
          setloadingList(false);
            setPackages(res.data)
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

    const handleEditPackage = e => {
        e.preventDefault();
        const url = `${heroku_path}api/packages`;
        const config = { headers: {"x-auth-token": token }};
        setloadingPkg(true);
        axios
        .put(url, {_id: selectedPackage._id, name: selectedPackage.name, price: selectedPackage.price, description: selectedPackage.description }, config )
        .then(res =>  {
            setloadingPkg(false);
            // seSubCCategories(res.data)
            const temp = packages.map( pkg => {
                if ( pkg._id === res.data._id ){
                    return pkg = res.data;
                }
                return pkg;
            });
            setPackages( temp );
            setSmShow(false);
            setSelectedPackage({ name: "", price: "", description: "" });
            addToast('edit package success', { appearance: 'success' });
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

    const handleDeletePackage = e => {
        e.preventDefault();
        console.log("here")
        const url = `${heroku_path}api/packages/${ selectedPackage._id }`;
        const config = { headers: {"x-auth-token": token }};
        setloadingDelete(true);
        axios
        .delete(url , config )
        .then(res =>  {
            console.log("also here")
            if( res.data.deletedCount == 1 ){
                const temp = packages.filter( pkg => pkg._id != selectedPackage._id );
                console.log(temp);
                addToast('delete pkg Successfully', { appearance: 'info' });
                setPackages( temp );
                setloadingDelete(false)
                setSmShowDelete(false);
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


  return (
    <div className="ViewPackage">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">

        <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Packages Table</h4>
                  <p class="card-category"> Here is table of all packages in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Name </th>
                        <th> Price </th>
                        <th> Description </th>
                        <th> EDIT </th>
                        <th> DELETE </th>
                      </thead>
                      <tbody>
                        {
                          laodingList ?
                           <tr className="text-center"><Ripple color="#8553aa" size={30} /></tr> :
                          packages.map( (e, index) => 
                          <>
                              <tr>
                                  <td> {index+1} </td>
                                  <td> {e.name} </td>
                                  <td> {e.price} </td>
                                  <td> {e.description} </td>
                                  <td onClick={() => { setSelectedPackage(e); setSmShow(true) }} > <img className="cursor-pointer" src={EditImg} alt=""/>  </td>
                                  <td onClick={() => { setSelectedPackage(e); setSmShowDelete(true) }} > <img className="cursor-pointer" src={closeImg} alt=""/> </td>
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
                    {/* <p>{selectedCategory.name}</p> */}
                    <p> Are you sure you want to delete <span className="font-weight-bold"> { selectedPackage.name } </span> ? </p>
                    {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
                    }
                </form>
            </Modal.Body>
        </Modal>

    </div>
  );
}

export default ViewCustomers;
