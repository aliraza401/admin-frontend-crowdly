import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";


function AddLocation() {
  const [ city, setCity ] = React.useState([]);
  const [ formCity, setFormCity ] = React.useState({});
  const [ formArea, setFormArea ] = React.useState({});
  const [selectedArea, setSelectedArea] = React.useState({});
  const [smShowDelete, setSmShowDelete] = React.useState(false);
  const [smShow, setSmShow] = React.useState(false);
  const { addToast } = useToasts();
 
  const [ loadingCity, setLoadingCity ] = React.useState(false);
  const [ loadingArea, setLoadingArea ] = React.useState(false);
  const [ loadingCityDrop, setLoadingCityDrop ] = React.useState(true);


  const token = useSelector( state => state.token );

  React.useEffect( () => {
      if(token){
        const url = `${heroku_path}api/city`;
        const config = { headers: {"x-auth-token": token } };
        axios
          .get(url, config )
          .then(res =>  {setCity(res.data); setLoadingCityDrop(false); } )  
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
  },[]);
  
  const handleCitySubmmit = e => {
    e.preventDefault();
    console.log( formCity );
    const url = `${heroku_path}api/city`;
    const config = { headers: {"x-auth-token": token } };
    setLoadingCity(true);
    axios
      .post(url, {name: formCity.name} , config )
      .then(res => {
          if(res.status >= 200 && res.status < 300 ){
            setLoadingCity(false);
            setFormCity({ name: "" })
            setCity( prev => [ ...prev, res.data ] );
            addToast('city add success', { appearance: 'success' });
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

  const handleAreaSubmmit = e => {
    e.preventDefault();
    // console.log("33")
    const url = `${heroku_path}api/city/area`;
    const config = { headers: {"x-auth-token": token } };
    setLoadingArea(true);
    axios
      .post(url, formArea , config )
      .then(res => {
          if(res.status >= 200 && res.status < 300 ){
            setLoadingArea(false)
            setFormArea({ name:"", coordinates:"", _id:"" });
            addToast('area add success', { appearance: 'success' });
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
    <div className="AddLocation">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">

          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Add City</h4>
                  <p class="card-category">Here you can add City</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleCitySubmmit} >
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">City Name</label>
                          <input type="text" required class="form-control" placeholder="e.g: Rawalpindi" value={formCity.name} onChange={e=> setFormCity({ ...formCity, name: e.target.value })} />
                        </div>
                      </div>
                    </div>
                    {
                      loadingCity ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add City</button>
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

          <div class="row">
            <div class="col-md-8">
              <div class="card">

                <div class="card-header card-header-primary">
                  <h4 class="card-title">Add Area</h4>
                  <p class="card-category">Here you can add Areas</p>
                </div>
                <div class="card-body">
                  <form  onSubmit={handleAreaSubmmit} >
                    <div class="row">

                      <div class="col-md-12">
                        <div class="form-group">
                          {
                              loadingCityDrop ?
                              <Ripple color="#8553aa" size={30} />:
                              <select value={ formArea._id } onChange={ e => setFormArea({ ...formArea, _id: e.target.value }) } class="custom-select mb-3" id="validationCustom04">
                                <option selected disabled value=""> City Name </option>
                                  {
                                      city.map(e => (
                                          <option value={ e._id } key={ e._id } > { e.name } </option>
                                      ))
                                  }
                              </select>
                          }
                          <label class="bmd-label-floating">Area Name</label>
                          <input type="text"  required class="form-control mb-3"  placeholder="e.g: DHA 2" value={formArea.name} onChange={e=> setFormArea({ ...formArea, name: e.target.value })} />
                          <label class="bmd-label-floating">Enter Lat,Long</label>
                          <input type="text"  required class="form-control"  placeholder="copy from google maps" value={formArea.coordinates} onChange={e=> setFormArea({ ...formArea, coordinates: e.target.value })}  />
                        </div>
                      </div>

                    </div>
                    {
                      loadingArea ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add Area</button>
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

export default AddLocation;
