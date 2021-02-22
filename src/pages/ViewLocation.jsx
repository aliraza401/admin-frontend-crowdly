import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";


function ViewLocation() {
  const { addToast } = useToasts();
  const [ area, setArea ] = React.useState([]);
  const [ city, setCity ] = React.useState([]);
  const [selectedArea, setSelectedArea] = React.useState({name:""});
  const [selectedCity, setSelectedCity] = React.useState({name:""});
  const [smShowCity, setSmShowCity ] = React.useState(false);
  const [smShowArea, setSmShowArea ] = React.useState(false);
  const [smShowDeleteCity, setSmShowDeleteCity ] = React.useState(false);
  const [smShowDeleteArea, setSmShowDeleteArea ] = React.useState(false);

  const [laodingList, setloadingList] = React.useState(true);
  const [laodingCity , setloadingCity] = React.useState(false);
  const [laodingArea , setloadingArea] = React.useState(false);
  const [laodingDelete , setloadingDelete ] = React.useState(false);


  const token = useSelector( state => state.token );

  React.useEffect( () => {
      const url = `${heroku_path}api/city`;
      const config = { headers: {"x-auth-token": token }};
      axios
      .get(url, config )
      .then(res =>  {
          setloadingList(false);
          setCity( res.data )
          console.log(res.data)
      })  
      .catch(err => console.log(err))
  },[]);


  const handleEditArea = e => {
    e.preventDefault();
    console.log( selectedArea )
    const url = `${heroku_path}api/city/area`;
    const config = { headers: {"x-auth-token": token }};
    setloadingArea(true);
    axios
    .put(url, {_id: selectedArea._id, name: selectedArea.name, coordinates: selectedArea.coordinates }, config )
    .then(res =>  {
        setloadingArea(false);
        setCity(res.data)
        setSmShowArea(false);
        setSelectedArea({name:""});
        addToast('edit area success', { appearance: 'success' });
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

const handleEditCity = e => {
  e.preventDefault();
  console.log( selectedCity )
  const url = `${heroku_path}api/city`;
  const config = { headers: {"x-auth-token": token }};
  setloadingCity(true);
  axios
  .put(url, {_id: selectedCity._id, name: selectedCity.name }, config )
  .then(res =>  {
      console.log( res )
      const temp = city.map( ci => {
          if ( ci._id === res.data._id ) 
          return res.data;
          return ci;
      });
      console.log(temp)
      setloadingCity(false);
      setCity( temp );
      setSmShowCity(false);
      setSelectedArea({name:""});
      addToast('edit city success', { appearance: 'success' });
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


const handleDeleteArea = e => {
    e.preventDefault()
    const url = `${heroku_path}api/city/area/${selectedArea._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true)
    axios
    .delete(url , config )
    .then(res =>  {
        setloadingDelete(false)
        setCity( res.data );
        setSmShowDeleteArea(false);
        addToast('delete area success', { appearance: 'info' });
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


const handleDeleteCity = e => {
  e.preventDefault()
  const url = `${heroku_path}api/city/${selectedCity._id}`;
  const config = { headers: {"x-auth-token": token }};
  setloadingDelete(true)
  axios
  .delete(url , config )
  .then(res =>  {
      if( res.data.deletedCount == 1 ){
        setloadingDelete(false)
          const temp = city.filter( cat => cat._id != selectedCity._id );
          setCity( temp );
          setSmShowDeleteCity(false);
          setSelectedCity({name:""});          
          addToast('delete area success', { appearance: 'info' });
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
                  <h4 class="card-title ">City Table</h4>
                  <p class="card-category"> Here is table of all cities and aCityrea in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> City Name </th>
                        <th> EDIT </th>
                        <th> DELETE </th>
                      </thead>
                      <tbody>
                      {/* {
                          laodingList ?
                          <Ripple color="#8553aa" size={30} />:
                          city.map( (e, index) => 
                            <>
                                <tr>
                                    <td> {index+1} </td>
                                    <td> {e.name} </td>
                                    <td onClick={() => { setSelectedCity(e);  setSmShowCity(true) }} > <img className="cursor-pointer" src={EditImg} alt=""/>  </td>
                                    <td onClick={() => { setSelectedCity(e);  setSmShowDeleteCity(true) }} > <img className="cursor-pointer" src={closeImg} alt=""/> </td>
                                </tr> 
                            </>
                          )
                        } */}
                        <tr>
                          <td>1</td>
                          <td>Rawalpindi</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
                                                <tr>
                          <td>2</td>
                          <td>Islamabad</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Area Table</h4>
                  <p class="card-category"> Here is table of all cities and aCityrea in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> City Name </th>
                        <th> Area Name </th>
                        <th> Coordinates </th>
                        <th> EDIT </th>
                        <th> DELETE </th>
                      </thead>
                      <tbody>
                      {/* {
                          laodingList ?
                          <Ripple color="#8553aa" size={30} />:
                            city.map( e => 
                              e.area.map( (are, index) => 
                                <tr>
                                    <td> {index+1} </td>
                                    <td> {e.name} </td>
                                    <td> {are.name} </td>
                                    <td> {are.coordinates} </td>
                                    <td onClick={() => { setSelectedArea(are); setSmShowArea(true); }} > <img className="cursor-pointer" src={EditImg} alt=""/>  </td>
                                    <td onClick={() => { setSelectedArea(are); setSmShowDeleteArea(true); }} > <img className="cursor-pointer" src={closeImg} alt=""/> </td>
                                </tr> 
                              )
                            )
                        } */}
                        <tr>
                          <td>1</td>
                          <td>Rawalpindi</td>
                          <td>New lalzar</td>
                          <td>33.56137320107987, 73.06909285817189</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Rawalpindi</td>
                          <td>Askari 14</td>
                          <td>33.54554351721479, 73.06811439810966</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Islamabad</td>
                          <td>F7/1</td>
                          <td>33.716687573542444, 73.05480161321833</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Islamabad</td>
                          <td>I10/2</td>
                          <td>33.65002923528902, 73.02942868278869</td>
                          <td><img className="cursor-pointer" src={EditImg} alt=""/></td>
                          <td><img className="cursor-pointer" src={closeImg} alt=""/></td>
                        </tr>
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
            show={smShowCity}
            onHide={() => setSmShowCity(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit City
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleEditCity} >
                    <input type="text"  required className="form-control mb-3" value={selectedCity.name } onChange={e => setSelectedCity({...selectedCity, name: e.target.value  }) }  />
                    {
                      laodingCity ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="subimt" disabled={ selectedCity.name.length < 1 }  className="btn btn-primary btn-block mb-4" > Edit City </button>
                    }
                    
                </form>

            </Modal.Body>
        </Modal>

        <Modal
            size="sm"
            show={smShowArea}
            onHide={() => setSmShowArea(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit City
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

              <form onSubmit={handleEditArea} >
                  <input type="text"  required className="form-control mb-3" value={ selectedArea.name } onChange={ e => setSelectedArea({ ...selectedArea, name: e.target.value }) } />
                  <input type="text"  required className="form-control mb-3" value={ selectedArea.coordinates } onChange={ e => setSelectedArea({ ...selectedArea, coordinates: e.target.value }) } />
                  {
                    laodingArea ? 
                    <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                    <button type="subimt"  disabled={ selectedArea.name.length < 1 } className="btn btn-primary btn-block" > Edit Area  </button>
                  }
              </form>

            </Modal.Body>
        </Modal>


        <Modal   
            size="sm"
            show={smShowDeleteArea}
            onHide={() => setSmShowDeleteArea (false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Area
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleDeleteArea} >
                  {/* <p>{selectedCategory.name}</p> */}
                  <p> Are you sure you want to delete <span className="font-weight-bold" >{ selectedArea.name }</span> ? </p>
                  {
                    laodingDelete ? 
                    <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                    <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
                  }
              </form>
            </Modal.Body>
        </Modal>




        <Modal   
            size="sm"
            show={smShowDeleteCity}
            onHide={() => setSmShowDeleteCity(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Area
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleDeleteCity} >
                  {/* <p>{selectedCategory.name}</p> */}
                  <p> Are you sure you want to delete <span className="font-weight-bold" >{ selectedCity.name }</span> ? </p>
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

export default ViewLocation;
