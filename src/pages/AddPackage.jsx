import React from "react";
 
import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";



function AddPackege() {
    const [ formpackage, setFormpackage ] = React.useState({});
    const token = useSelector( state => state.token );
    const { addToast } = useToasts();

    const [ loadingPkg, setloadingPkg ] = React.useState(false);


    const handleSubmit = e => {
        e.preventDefault();
        console.log(formpackage)
        const url = `${heroku_path}api/packages`;
        const config = { headers: {"x-auth-token": token } };
        setloadingPkg(true);
        axios
        .post(url, formpackage, config )
        .then(res => {
            if(res.status >= 200 && res.status < 300 ){
              setloadingPkg(false);
              setFormpackage({ name: "", price: "", description: "" });
              addToast('add pkg success', { appearance: 'success' });
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
    <div className="AddPackage">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">

          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Add Package</h4>
                  <p class="card-category">Here you can add business packages</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubmit} >
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Package Name</label>
                          <input type="text" required class="form-control" placeholder="e.g: Gold" value={formpackage.name} onChange={ e => setFormpackage({ ...formpackage, name: e.target.value }) } />
                        </div>
                        <div class="form-group">
                          <label class="bmd-label-floating">Package Price</label>
                          <input type="text" required class="form-control" placeholder="e.g: 5000" value={formpackage.price} onChange={ e => setFormpackage({ ...formpackage, price: e.target.value }) }  />
                        </div>
                        <div class="form-group">
                          <label class="bmd-label-floating">Package Description</label>
                          <textarea required  class="form-control"  placeholder="e.g: describe limitation of package" value={formpackage.description} onChange={ e => setFormpackage({ ...formpackage, description: e.target.value }) }  />
                        </div>
                      </div>
                    </div>
                    {
                      loadingPkg ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add Package</button>
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

export default AddPackege;
