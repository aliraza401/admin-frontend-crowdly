import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

import { setLocations } from "../actions/locations";
import { setLoading } from "../actions/loading";


function AddLocation() {
  const [formCity, setFormCity] = React.useState({});
  const [formArea, setFormArea] = React.useState({});
  const [selectedArea, setSelectedArea] = React.useState({});
  const [smShowDelete, setSmShowDelete] = React.useState(false);
  const [smShow, setSmShow] = React.useState(false);
  const { addToast } = useToasts();

  const [loadingCity, setLoadingCity] = React.useState(false);
  const [loadingArea, setLoadingArea] = React.useState(false);
  const [loadingCityDrop, setLoadingCityDrop] = React.useState(true);

  const city = useSelector(state => state.locations.locations);
  const token = useSelector(state => state.user.token);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setLocations());
  }, []);

  const handleCitySubmmit = e => {
    e.preventDefault();
    console.log(formCity);
    const url = `${path}api/city`;
    const config = { headers: { "x-auth-token": token } };
    dispatch(setLoading(true));
    axios
      .post(url, { name: formCity.name }, config)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          setFormCity({ name: "" })
          dispatch(setLocations());
          addToast('city add success', { appearance: 'success' });
          dispatch(setLoading(false));
        }
      })
      .catch(err => {
        dispatch(setLoading(false));
          addToast('Server Error, Please try Again', { appearance: 'info' });
      })
  }

  const handleAreaSubmmit = e => {
    e.preventDefault();
    // console.log("33")
    const url = `${path}api/city/area`;
    const config = { headers: { "x-auth-token": token } };
    dispatch(setLoading(true));
    axios
      .post(url, { city_id: formArea._id, name: formArea.name, coordinates: formArea.coordinates }, config)
      .then(res => {
        if (res.status >= 200 && res.status < 300) {
          dispatch(setLoading(false));
          dispatch(setLocations())
          setFormArea({ name: "", coordinates: "", _id: "" });
          addToast('area add success', { appearance: 'success' });
        }
      })
      .catch(err => {
        dispatch(setLoading(false));
          addToast('Server Error, Please try Again', { appearance: 'info' });
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
                              <input type="text" required class="form-control" placeholder="e.g: Rawalpindi" value={formCity.name} onChange={e => setFormCity({ ...formCity, name: e.target.value })} />
                            </div>
                          </div>
                        </div>
                        <button type="submit" class="btn btn-primary pull-right">Add City</button>
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
                      <form onSubmit={handleAreaSubmmit} >
                        <div class="row">

                          <div class="col-md-12">
                            <div class="form-group">
                              {
                                <select value={formArea._id} onChange={e => setFormArea({ ...formArea, _id: e.target.value })} class="custom-select mb-3" id="validationCustom04">
                                  <option selected disabled value=""> City Name </option>
                                  {
                                    city && city.map(e => (
                                      <option value={e._id} key={e._id} > { e.name} </option>
                                    ))
                                  }
                                </select>
                              }
                              <label class="bmd-label-floating">Area Name</label>
                              <input type="text" required class="form-control mb-3" placeholder="e.g: DHA 2" value={formArea.name} onChange={e => setFormArea({ ...formArea, name: e.target.value })} />
                              <label class="bmd-label-floating">Enter Lat,Long</label>
                              <input type="text" required class="form-control" placeholder="copy from google maps" value={formArea.coordinates} onChange={e => setFormArea({ ...formArea, coordinates: e.target.value })} />
                            </div>
                          </div>

                        </div>
                        {
                          loadingArea ?
                            <div style={{ height: 50 }} class=" pull-right"><Ripple color="#8553aa" size={30} /></div> :
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