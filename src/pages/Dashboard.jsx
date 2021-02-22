import React from "react";
import {useSelector, useDispatch} from "react-redux";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import axios from "axios";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
// import { Ripple } from "react-css-spinner";
import { Ripple } from 'react-css-spinners';

function Dashboard() {
  // const dispatch = useDispatch();
  // const counter = useSelector( state => state.counter )
  const [ businessCount, setBusinessCount ] = React.useState("");
  const [ productsCount, setProductsCount ] = React.useState("");
  const [ servicesCount, setServicesCount ] = React.useState("");
  const [ usersCount, setUsersCount ] = React.useState("");
  const [ loading_bus, setLoadingBus ] = React.useState(true);
  const [ loading_users, setLoadingUsers ] = React.useState(true);
  const [ loading_products, setLoadingProducts ] = React.useState(true);
  const [ loading_services, setLoadingServices ] = React.useState(true);
  const [ loading_admins, setLoadingadmins ] = React.useState(true);
  const [ adminList, setAdminList ] = React.useState([]);
  const token = useSelector( state => state.token );
  const { addToast } = useToasts();


  React.useEffect(() => {
    axios
      .get(`${heroku_path}api/businesses/buinesscount`)
      .then(res => {setBusinessCount(res.data); setLoadingBus(false); })
      .catch( err => {
        if(err.response){
          if(err.response.status === 401 && err.response.data === "unauth"){
            addToast('you are not auth to access resource', { appearance: 'info' });
          }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            addToast('please provide token', { appearance: 'info' });
          }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            addToast('please provide valid token', { appearance: 'info' });
          }else{
            addToast('Server Error, Please try Again', { appearance: 'info' });
          }
        }
      });

    axios
      .get(`${heroku_path}api/products/productcount`)
      .then(res => {setProductsCount(res.data); setLoadingProducts(false) })
      .catch( err => {
        if(err.response){
          if(err.response.status === 401 && err.response.data === "unauth"){
            addToast('you are not auth to access resource', { appearance: 'info' });
          }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            addToast('please provide token', { appearance: 'info' });
          }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            addToast('please provide valid token', { appearance: 'info' });
          }else{
            addToast('Server Error, Please try Again', { appearance: 'info' });
          }
        }
      });

    axios
      .get(`${heroku_path}api/services/servicecount`)
      .then(res => {setServicesCount(res.data); setLoadingServices(false) })
      .catch( err => {
        if(err.response){
          if(err.response.status === 401 && err.response.data === "unauth"){
            addToast('you are not auth to access resource', { appearance: 'info' });
          }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            addToast('please provide token', { appearance: 'info' });
          }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            addToast('please provide valid token', { appearance: 'info' });
          }else{
            addToast('Server Error, Please try Again', { appearance: 'info' });
          }
        }
      });

    axios
      .get(`${heroku_path}api/users/userscount`)
      .then(res => {setUsersCount(res.data); setLoadingUsers(false); })
      .catch( err => {
        if(err.response){
          if(err.response.status === 401 && err.response.data === "unauth"){
            addToast('you are not auth to access resource', { appearance: 'info' });
          }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
            addToast('please provide token', { appearance: 'info' });
          }else if(err.response.status === 403 && err.response.data === 'invalid token'){
            addToast('please provide valid token', { appearance: 'info' });
          }else{
            addToast('Server Error, Please try Again', { appearance: 'info' });
          }
        }
      });
    
      setAdminList(""); 
      setLoadingadmins(false);

  },[])

  const printRole = admin => {
    if( admin.role === 3){
      return "SuperUser";
    }else if( admin.role === 2 ){
      return "Admin"
    }else if( admin.role === 1){
      return "Content Creator"
    }
  }

  return (
    <div className="dashboard">
  <div class="main-panel">
      
      <Nav />
      
      <div class="content">
        <div class="container-fluid">


          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-warning card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">content_copy</i>
                  </div>
                  <p class="card-category">Total Users</p>
                  <h3 class="card-title">
                    { loading_users ? <Ripple color="#8553aa" size={30} /> : usersCount }
                  </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                  <i class="material-icons">date_range</i>
                    <a href="javascript:;">this is total users count</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-success card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">store</i>
                  </div>
                  <p class="card-category" style={{fontSize:12}}>Total Workers</p>
                  <h3 class="card-title"> { loading_bus ? <Ripple color="#8553aa" size={30} /> : businessCount } </h3>
                </div>
                <div class="card-footer">
                  <div class="stats" style={{fontSize:12}}>
                    <i class="material-icons">date_range</i> this is total bunsinesses count
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-danger card-header-icon">
                  <div class="card-icon">
                    <i class="material-icons">info_outline</i>
                  </div>
                  <p class="card-category">Total Admins</p>
                  <h3 class="card-title"> 
                  {/* {productsCount}  */}
                  { loading_products ? <Ripple color="#8553aa" size={30} /> : productsCount }
                  </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">local_offer</i> this is total products count
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <div class="card card-stats">
                <div class="card-header card-header-info card-header-icon">
                  <div class="card-icon">
                    <i class="fa fa-twitter"></i>
                  </div>
                  <p class="card-category">Total Categories</p>
                  <h3 class="card-title"> 
                    {/* {servicesCount}  */}
                    { loading_services ? <Ripple color="#8553aa" size={30} /> : servicesCount }
                    </h3>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">update</i> this is total services count
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-5 col-md-12">
              <div class="card">
                <div class="card-header card-header-tabs card-header-primary">
                  <div class="nav-tabs-navigation">
                    <div class="nav-tabs-wrapper">
                      <span class="nav-tabs-title">Tasks:</span>
                      <ul class="nav nav-tabs" data-tabs="tabs">
                        <li class="nav-item">
                          <a class="nav-link active" href="#profile" data-toggle="tab">
                            <i class="material-icons">bug_report</i> Bugs
                            <div class="ripple-container"></div>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="card-body">
                  <div class="tab-content">
                    <div class="tab-pane active" id="profile">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" checked />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Sign contract for "What are conference organizers afraid of?"</td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="tab-pane" id="messages">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" checked />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                            </td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Sign contract for "What are conference organizers afraid of?"</td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="tab-pane" id="settings">
                      <table class="table">
                        <tbody>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Lines From Great Russian Literature? Or E-mails From My Boss?</td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" checked />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit
                            </td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div class="form-check">
                                <label class="form-check-label">
                                  <input class="form-check-input" type="checkbox" value="" checked />
                                  <span class="form-check-sign">
                                    <span class="check"></span>
                                  </span>
                                </label>
                              </div>
                            </td>
                            <td>Sign contract for "What are conference organizers afraid of?"</td>
                            <td class="td-actions text-right">
                              <button type="button" rel="tooltip" title="Edit Task" class="btn btn-primary btn-link btn-sm">
                                <i class="material-icons">edit</i>
                              </button>
                              <button type="button" rel="tooltip" title="Remove" class="btn btn-danger btn-link btn-sm">
                                <i class="material-icons">close</i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-7 col-md-12">
              <div class="card">
                <div class="card-header card-header-warning">
                  <h4 class="card-title">Admin Stats</h4>
                  <p class="card-category">New employees on 15th September, 2016</p>
                </div>
                <div class="card-body table-responsive">
                  <table class="table table-hover">
                    <thead class="text-warning">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Created At</th>
                    </thead>
                    <tbody>

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* <div class="row">
            <div class="col-md-6">
              <div class="card card-chart">
                <div class="card-header card-header-success">
                  <div class="ct-chart" id="dailySalesChart"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-line" style="width: 100%; height: 100%;"><g class="ct-grids"><line x1="40" x2="40" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="56.52232142857143" x2="56.52232142857143" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="73.04464285714286" x2="73.04464285714286" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="89.56696428571428" x2="89.56696428571428" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="106.08928571428571" x2="106.08928571428571" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="122.61160714285714" x2="122.61160714285714" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line x1="139.13392857142856" x2="139.13392857142856" y1="0" y2="120" class="ct-grid ct-horizontal"></line><line y1="120" y2="120" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line><line y1="96" y2="96" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line><line y1="72" y2="72" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line><line y1="48" y2="48" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line><line y1="24" y2="24" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line><line y1="0" y2="0" x1="40" x2="155.65625" class="ct-grid ct-vertical"></line></g><g><g class="ct-series ct-series-a"><path d="M40,91.2C56.522,79.2,56.522,79.2,56.522,79.2C73.045,103.2,73.045,103.2,73.045,103.2C89.567,79.2,89.567,79.2,89.567,79.2C106.089,64.8,106.089,64.8,106.089,64.8C122.612,76.8,122.612,76.8,122.612,76.8C139.134,28.8,139.134,28.8,139.134,28.8" class="ct-line"></path><line x1="40" y1="91.2" x2="40.01" y2="91.2" class="ct-point" ct:value="12" opacity="1"></line><line x1="56.52232142857143" y1="79.2" x2="56.53232142857143" y2="79.2" class="ct-point" ct:value="17" opacity="1"></line><line x1="73.04464285714286" y1="103.2" x2="73.05464285714287" y2="103.2" class="ct-point" ct:value="7" opacity="1"></line><line x1="89.56696428571428" y1="79.2" x2="89.57696428571428" y2="79.2" class="ct-point" ct:value="17" opacity="1"></line><line x1="106.08928571428571" y1="64.8" x2="106.09928571428571" y2="64.8" class="ct-point" ct:value="23" opacity="1"></line><line x1="122.61160714285714" y1="76.8" x2="122.62160714285714" y2="76.8" class="ct-point" ct:value="18" opacity="1"></line><line x1="139.13392857142856" y1="28.799999999999997" x2="139.14392857142855" y2="28.799999999999997" class="ct-point" ct:value="38" opacity="1"></line></g></g><g class="ct-labels"><foreignObject style="overflow: visible;" x="40" y="125" width="16.522321428571427" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="56.52232142857143" y="125" width="16.522321428571427" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">T</span></foreignObject><foreignObject style="overflow: visible;" x="73.04464285714286" y="125" width="16.522321428571423" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">W</span></foreignObject><foreignObject style="overflow: visible;" x="89.56696428571428" y="125" width="16.52232142857143" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">T</span></foreignObject><foreignObject style="overflow: visible;" x="106.08928571428571" y="125" width="16.52232142857143" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">F</span></foreignObject><foreignObject style="overflow: visible;" x="122.61160714285714" y="125" width="16.522321428571416" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 17px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" x="139.13392857142856" y="125" width="30" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 30px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" y="96" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">0</span></foreignObject><foreignObject style="overflow: visible;" y="72" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">10</span></foreignObject><foreignObject style="overflow: visible;" y="48" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">20</span></foreignObject><foreignObject style="overflow: visible;" y="24" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">30</span></foreignObject><foreignObject style="overflow: visible;" y="0" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">40</span></foreignObject><foreignObject style="overflow: visible;" y="-30" x="0" height="30" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">50</span></foreignObject></g></svg></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Daily Sales</h4>
                  <p class="card-category">
                    <span class="text-success"><i class="fa fa-long-arrow-up"></i> 55% </span> increase in today sales.</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> updated 4 minutes ago
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card card-chart">
                <div class="card-header card-header-warning">
                  <div class="ct-chart" id="websiteViewsChart"><svg xmlns:ct="http://gionkunz.github.com/chartist-js/ct" width="100%" height="100%" class="ct-chart-bar" style="width: 100%; height: 100%;"><g class="ct-grids"><line y1="120" y2="120" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line><line y1="96" y2="96" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line><line y1="72" y2="72" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line><line y1="48" y2="48" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line><line y1="24" y2="24" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line><line y1="0" y2="0" x1="40" x2="150.65625" class="ct-grid ct-vertical"></line></g><g><g class="ct-series ct-series-a"><line x1="44.610677083333336" x2="44.610677083333336" y1="120" y2="54.959999999999994" class="ct-bar" ct:value="542" opacity="1"></line><line x1="53.83203125" x2="53.83203125" y1="120" y2="66.84" class="ct-bar" ct:value="443" opacity="1"></line><line x1="63.053385416666664" x2="63.053385416666664" y1="120" y2="81.6" class="ct-bar" ct:value="320" opacity="1"></line><line x1="72.27473958333333" x2="72.27473958333333" y1="120" y2="26.400000000000006" class="ct-bar" ct:value="780" opacity="1"></line><line x1="81.49609374999999" x2="81.49609374999999" y1="120" y2="53.64" class="ct-bar" ct:value="553" opacity="1"></line><line x1="90.71744791666666" x2="90.71744791666666" y1="120" y2="65.64" class="ct-bar" ct:value="453" opacity="1"></line><line x1="99.93880208333333" x2="99.93880208333333" y1="120" y2="80.88" class="ct-bar" ct:value="326" opacity="1"></line><line x1="109.16015624999999" x2="109.16015624999999" y1="120" y2="67.92" class="ct-bar" ct:value="434" opacity="1"></line><line x1="118.38151041666666" x2="118.38151041666666" y1="120" y2="51.84" class="ct-bar" ct:value="568" opacity="1"></line><line x1="127.60286458333333" x2="127.60286458333333" y1="120" y2="46.8" class="ct-bar" ct:value="610" opacity="1"></line><line x1="136.82421875" x2="136.82421875" y1="120" y2="29.28" class="ct-bar" ct:value="756" opacity="1"></line><line x1="146.04557291666666" x2="146.04557291666666" y1="120" y2="12.599999999999994" class="ct-bar" ct:value="895" opacity="1"></line></g></g><g class="ct-labels"><foreignObject style="overflow: visible;" x="40" y="125" width="9.221354166666666" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="49.221354166666664" y="125" width="9.221354166666666" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">F</span></foreignObject><foreignObject style="overflow: visible;" x="58.44270833333333" y="125" width="9.221354166666668" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="67.6640625" y="125" width="9.221354166666664" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">A</span></foreignObject><foreignObject style="overflow: visible;" x="76.88541666666666" y="125" width="9.221354166666664" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">M</span></foreignObject><foreignObject style="overflow: visible;" x="86.10677083333333" y="125" width="9.221354166666671" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="95.328125" y="125" width="9.221354166666657" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">J</span></foreignObject><foreignObject style="overflow: visible;" x="104.54947916666666" y="125" width="9.221354166666671" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">A</span></foreignObject><foreignObject style="overflow: visible;" x="113.77083333333333" y="125" width="9.221354166666671" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">S</span></foreignObject><foreignObject style="overflow: visible;" x="122.9921875" y="125" width="9.221354166666657" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">O</span></foreignObject><foreignObject style="overflow: visible;" x="132.21354166666666" y="125" width="9.221354166666671" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 9px; height: 20px;">N</span></foreignObject><foreignObject style="overflow: visible;" x="141.43489583333331" y="125" width="30" height="20"><span class="ct-label ct-horizontal ct-end" xmlns="http://www.w3.org/2000/xmlns/" style="width: 30px; height: 20px;">D</span></foreignObject><foreignObject style="overflow: visible;" y="96" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">0</span></foreignObject><foreignObject style="overflow: visible;" y="72" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">200</span></foreignObject><foreignObject style="overflow: visible;" y="48" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">400</span></foreignObject><foreignObject style="overflow: visible;" y="24" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">600</span></foreignObject><foreignObject style="overflow: visible;" y="0" x="0" height="24" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 24px; width: 30px;">800</span></foreignObject><foreignObject style="overflow: visible;" y="-30" x="0" height="30" width="30"><span class="ct-label ct-vertical ct-start" xmlns="http://www.w3.org/2000/xmlns/" style="height: 30px; width: 30px;">1000</span></foreignObject></g></svg></div>
                </div>
                <div class="card-body">
                  <h4 class="card-title">Email Subscriptions</h4>
                  <p class="card-category">Last Campaign Performance</p>
                </div>
                <div class="card-footer">
                  <div class="stats">
                    <i class="material-icons">access_time</i> campaign sent 2 days ago
                  </div>
                </div>
              </div>
            </div>
          </div> */}

        </div>
      </div>

      <Footer />

    </div>




    </div>
  );
}

export default Dashboard;
