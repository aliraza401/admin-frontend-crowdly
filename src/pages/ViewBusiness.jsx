import React, { useState } from "react";
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
import closeImg from "./../assets/img/close-line.png";


import userImg from "./../assets/img/user_img.png";
import reviewImg from "./../assets/img/message-2-fill.png";


function ViewBusiness( props ) {
  const [ user, setUser ] = React.useState({});
  const [ business, setBusiness ] = React.useState({});
  const [ products, setProducts ] = React.useState([]);
  const [ services, setServices ] = React.useState([]);
  const token = useSelector( state => state.token );

  const [laodingEdit, setloadingEdit] = React.useState(false);
  const [laodingDelete, setloadingDelete] = React.useState(false);

  const [location, setlocation ] = React.useState([]);
  const [categoryList, setCategoryList ] = React.useState([]);

  const [ showReview, setShowReview ] = React.useState(false);
  const [ showReviewService, setShowReviewService ] = React.useState(false);

  const [ seletedReviewProduct, setSelectedReviewProduct ] = React.useState({});
  const [ seletedReviewService, setSelectedReviewService ] = React.useState({});

  const [ seletedProduct, setSelectedProduct ] = React.useState({name: "", description: "", reviews: []});
  const [ seletedService, setSelectedService ] = React.useState({name: "", description: "", reviews: []});

  const [ showEditProduct, setShowEditProdust ] = React.useState(false);
  const [ showDeleteProduct, setShowDeleteProdust ] = React.useState(false);

  const [ showEditService, setShowEditService ] = React.useState(false);
  const [ showDeleteService, setShowDeleteService ] = React.useState(false);

  const business_id = props.match.params.id;
  const [smShowDelete, setSmShowDelete] = React.useState(false);
  const { addToast } = useToasts();
  const histroy = useHistory();

  
  React.useEffect( () => {
    const url = `${heroku_path}api/businesses/${business_id}`;
    const config = { headers: {"x-auth-token": token }};
    axios
    .get(url, config)
    .then(res =>  {
        setBusiness( res.data.business );
        setProducts( res.data.products );
        setServices( res.data.services );
    })  
    .catch( err => console.log(err) );

    let urlLocation = `https://dialbox-admin.herokuapp.com/api/city`;
    axios
      .get( urlLocation )
      .then( res => {
        setlocation( res.data )
      })
      .catch( err => console.log(err));

    axios
      .get( `https://dialbox-admin.herokuapp.com/api/category` )
      .then( res => {
        setCategoryList( res.data )
      })
      .catch( err => console.log(err));

  },[]);

  const handleEditBusiness = e => {
    e.preventDefault();
    const url = `${heroku_path}api/businesses`;
    const config = { headers: {"x-auth-token": token }};
    setloadingEdit(true);
    axios
    .put(url,business, config)
    .then(res =>  {
        setloadingEdit(false);
        setBusiness( res.data );
        console.log(res.data)
        addToast('business Edit success', { appearance: 'success' });
    })  
    .catch( err => {
    })
  }

  const handleDeleteBusiness = e => {
    e.preventDefault();
    const url = `${heroku_path}api/businesses/${business_id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
        if( res.data.deletedCount == 1 ){
            setloadingDelete(false);
            addToast('delete Business Successfully', { appearance: 'info' });
            setSmShowDelete(false);
            histroy.push("/view-customers");
        }
    })  
    .catch( err => { })
  }

  const handleEditProduct = e => {
    console.log(seletedProduct)
    e.preventDefault();
    const url = `${heroku_path}api/products`;
    const config = { headers: {"x-auth-token": token }};
    setloadingEdit(true);
    axios
    .put(url, { _id: seletedProduct._id, name: seletedProduct.name, description: seletedProduct.description } , config)
    .then(res =>  {
        setloadingEdit(false);
        const newArr = products.map(e => {
          if( e._id === res.data._id ){ return res.data; }
          return e;
        })
        console.log(newArr)
        setProducts(newArr);
        setShowEditProdust(false);
        addToast('Product Edit success', { appearance: 'success' });
    })  
    .catch( err => {
      console.log(err)
    })
  }


  const handleEditService = e => {
    console.log(seletedService)
    e.preventDefault();
    const url = `${heroku_path}api/services`;
    const config = { headers: {"x-auth-token": token }};
    setloadingEdit(true);
    axios
    .put(url, { _id: seletedService._id, name: seletedService.name, description: seletedService.description } , config)
    .then(res =>  {
        setloadingEdit(false);
        const newArr = services.map(e => {
          if( e._id === res.data._id ) return res.data; 
          return e;
        });
        setServices(newArr);
        setShowEditService(false);
        addToast('Product Edit success', { appearance: 'success' });
    })  
    .catch( err => {
      console.log(err)
    })
  }

  const handleDeleteProduct = e => {
    e.preventDefault();
    const url = `${heroku_path}api/products/${seletedProduct._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
      setloadingDelete(false);
      const newArr = products.filter(e => e._id !== res.data._id );
      console.log(newArr);
      setProducts(newArr);
      addToast('product deleted Successfully', { appearance: 'info' });
      setShowDeleteProdust(false);
    })  
    .catch( err => { })
  }

  const handleDeleteService = e => {
    e.preventDefault();
    const url = `${heroku_path}api/services/${seletedService._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
      setloadingDelete(false);
      const newArr = services.filter(e => e._id !== res.data._id );
      setServices(newArr);
      addToast('product deleted Successfully', { appearance: 'info' });
      setShowDeleteService(false);
    })  
    .catch( err => { })
  }


  const handleDeleteReviewProduct = product_temp => {
    console.log( product_temp )
    const url = `${heroku_path}api/products/${seletedProduct._id}/${product_temp._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
      console.log( res )
      const newArr = products.map(e => {
        if( e._id === res.data._id ) return res.data; 
        return e;
      });      setProducts(newArr);
      setShowReview(false);
      setloadingDelete(false);
      addToast('comment deleted Successfully', { appearance: 'info' });
    })  
    .catch( err => { })
  }

  const handleDeleteReviewService = service_temp => {
    const url = `${heroku_path}api/services/${seletedService._id}/${service_temp._id}`;
    const config = { headers: {"x-auth-token": token }};
    setloadingDelete(true);
    axios
    .delete(url, config)
    .then(res =>  {
      console.log( res )
      const newArr = services.map(e => {
        if( e._id === res.data._id ) return res.data; 
        return e;
      });      
      setServices(newArr);
      setShowReviewService(false);
      setloadingDelete(false);
      addToast('comment service deleted Successfully', { appearance: 'info' });
    })  
    .catch( err => console.log(err) )
  }

  const printUserBusiness = user => {
    if( user.roles ){
      if ( user.roles.includes("B_USER")  ) return "Business User"
      return "Regular User"
    }
  }

  const printUserType = user => {
    if ( user.isFacebookUser ) return "Facebook User"
    else if ( user.isGoogleUser ) return "Google User"
    else if ( user.isGoogleUser ) return "Custom User"
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
                  <h4 class="card-title">Edit Business</h4>
                  <p class="card-category">Complete your profile</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleEditBusiness}>
                    <div className="row">
                      <div className="col-md-6">

                      </div>
                      <div className="col-md-6 text-right">
                        <p class="card-description">
                          <span className="font-weight-bold">Created At: </span>
                          { business._id ? new Date( parseInt( business._id.substring(0,8), 16 ) * 1000 ).toDateString() : "" }
                        </p>
                      </div>
                    </div>

                    <div className="personal_form mb-4">
                    <h4 className="text-pri mb-3">Personal Info</h4>
                    <div class="form-row mb-4">
                      <div class="col">
                        <label htmlFor="" className="mb-0">Buisness Name</label>
                        <input type="text" value={business.name} onChange={(e) => setBusiness({ ...business, name: e.target.value })} className="form-control" />
                      </div>
                      <div class="col">
                      <label htmlFor="" className="mb-0">Contact Person</label>
                        <input value={business.contact} onChange={(e) => setBusiness({ ...business, contact: e.target.value })} className="form-control" />
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                      <label htmlFor="" className="mb-0">Buisness Email</label>
                        <input value={business.email} onChange={(e) => setBusiness({ ...business, email: e.target.value })} className="form-control" />
                      </div>
                      <div class="col">
                      <label htmlFor="" className="mb-0">Whatsapp Number</label>
                        <input value={business.whatsapp} onChange={(e) => setBusiness({ ...business, whatsapp: e.target.value })} className="form-control" />
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                      <label htmlFor="" className="mb-0">Cell No</label>
                        <input type="number" value={business.cellno} onChange={(e) => setBusiness({ ...business, cellno: e.target.value })} className="form-control" />
                      </div>
                      <div class="col">
                        <label htmlFor="" className="mb-0">Land Line No</label>
                        <input type="number" value={business.land_line_no} onChange={(e) => setBusiness({ ...business, business: e.target.value })} className="form-control" />
                      </div>
                    </div>

                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  mb-4 px-0">
                      <label htmlFor="" className="mb-0">Store type</label>
                      <select value={ business.store_type } onChange={(e) => setBusiness({ ...business, store_type: e.target.value })} required className="custom-select" style={{ border: `1px solid #1668a8` }}>
                        <option>Virtual Store / Physical Store</option>
                        <option value="Virtual">Virtual</option>
                        <option value="Physical">Physical</option>
                      </select>
                    </div>
                  </div>

                  <div className="description_form mb-4">
                    <h4 className="text-pri mb-3">Description Info</h4>
                    <div class="form-row mb-4">
                      <div class="col">
                        <label htmlFor="" className="mb-0">Business City</label>
                        <select name="city" value={ business.city }  onChange={(e) => setBusiness({ ...business, city: e.target.value })}  required className="custom-select" style={{border: `1px solid #1668a8` }}>
                          <option > Select City </option>
                          {
                            location.map(e => ( 
                              <option value={ e.name } key={ e._id } > { e.name } </option>
                            ))
                          }
                        </select>

                      </div>
                      <div class="col">
                        <label htmlFor="" className="mb-0">Business Area</label>
                        {/* <input /> */}
                        <select name="area" value={business.area} onChange={(e) => setBusiness({ ...business, area: e.target.value })} required className="custom-select" style={{border: `1px solid #1668a8` }}>
                            <option > Select Area </option>
                            {
                              location.map(e => 
                                  e.name === business.city  &&
                                  e.area.map(area => <option value={ area.name } key={ area.name } > { area.name } </option> )
                                  // (<option> First select city </option>) 
                                )
                            }
                          </select>
                      
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                        
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  px-0">
                          <label htmlFor="" className="mb-0">Business Province</label>
                          <select value={business.province} onChange={(e) => setBusiness({ ...business, province: e.target.value })} required className="custom-select" style={{ border: `1px solid #1668a8` }}>
                            <option>Province</option>
                            <option value="Punjab">Punjab</option>
                            <option value="KPK">KPK</option>
                            <option value="Sindh">Sindh</option>
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  px-0">
                          <label htmlFor="" className="mb-0">Business Country</label>
                          <select name="country" required className="custom-select" style={{ border: `1px solid #1668a8` }}>
                            <option value="Pakistan">Pakistan</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                        <label htmlFor="" className="mb-0">Business Url</label>
                        <input value={business.url}  className="form-control" onChange={(e) => setBusiness({ ...business, url: e.target.value })} />
                      </div>
                      <div class="col">
                        <label htmlFor="" className="mb-0">Business Date</label>
                        <input type="date"  className="form-control" value={business.date} onChange={(e) => setBusiness({ ...business, date: e.target.value })} style={{ height: 32 }} />
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                        <label htmlFor="" className="mb-0">Business timing</label>
                        <input  className="form-control" value={business.timings} onChange={(e) => setBusiness({ ...business, timings: e.target.value })} />
                      </div>
                      <div class="col">
                        <label htmlFor="" className="mb-0">number of employees</label>
                        <input type="number" className="form-control" value={business.number_of_employees} onChange={(e) => setBusiness({ ...business, number_of_employees: e.target.value })} />
                      </div>
                    </div>
                  </div>

                  <div className="category_form mb-3">
                    <h4 className="text-pri mb-3">Category Info</h4>
                    <div class="form-row mb-4">
                      <div class="col">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  px-0">
                          <label htmlFor="" className="mb-0"> category </label>
                          {/* <select required className="form-control" style={{ border: `1px solid #1668a8` }}>
                            <option value="">Category</option>
                            <option value="one">One</option>
                            <option value="one">Two</option>
                          </select> */}
                          <select name="category"  value={business.category} onChange={(e) => setBusiness({ ...business, category: e.target.value })}  required className="custom-select" style={{ border: `1px solid #1668a8` }}>
                            <option > Select Category </option>
                            {
                              categoryList.map(e => ( 
                                <option value={ e.name } key={ e._id } > { e.name } </option>
                              ))
                            }
                          </select>
                        </div>
                      </div>
                      <div class="col">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12  px-0">
                          <label htmlFor="" className="mb-0">Sub</label>
                          {/* <select value={business.subCategory} onChange={(e) => setBusiness({ ...business, subCategory: e.target.value })} id="store_type" required className="form-control" style={{ border: `1px solid #1668a8` }}>
                            <option value="">Sub-Category</option>
                            <option value="one">one</option>
                            <option value="two">Two</option>
                            <option value="three">Three</option>
                          </select> */}
                          <select name="subCategory"  value={business.subCategory} onChange={(e) => setBusiness({ ...business, subCategory: e.target.value })}   id="store_type" required className="custom-select" style={{ border: `1px solid #1668a8` }}>
                              <option > Select Area </option>
                              {
                                categoryList.map(e => 
                                    e.name === business.category  &&
                                    e.SubCategory.map(area => <option value={ area.name } key={ area.name } > { area.name } </option> )
                                    // (<option> First select city </option>) 
                                  )
                              }
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-row mb-4">
                      <div class="col">
                      <label htmlFor="" className="mb-0">service</label>
                        <input name="service"  className="form-control" value={business.service} onChange={(e) => setBusiness({ ...business, service: e.target.value })} />
                      </div>
                      <div class="col">
                        <label htmlFor="" className="mb-0">Industry</label>
                        <input type="text"  className="form-control" value={business.industry} onChange={(e) => setBusiness({ ...business, industry: e.target.value })} />
                      </div>
                    </div>

                    <label htmlFor="" className="mb-0">Bio</label>
                    <textarea
                      class="form-control mb-4"
                      rows="3"
                      defaultValue={business.bio}
                      onChange={(e) => setBusiness({ ...business, bio: e.target.value })}
                    ></textarea>
                  </div>

                    {
                      laodingEdit ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Update Business</button>
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
                      <button onClick={() => { setSmShowDelete(true) }} class="btn btn-primary pull-right bg-danger">Delete Business</button>
                    }
                </div>
              </div>
            </div>
          </div>

          <div class="row mt-5" style={{ maxHeight:500, overflowY: 'scroll' }} >
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Products Table</h4>
                  <p class="card-category"> Here is table of all users in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        {/* <th> Img </th> */}
                        <th> Name </th>
                        <th> Description </th>
                        <th> Created At </th>
                        <th> Reviews </th>
                        <th> Edit </th>
                        <th> Delete </th>
                      </thead>
                      <tbody>
                        {
                            // laodingList ?
                            // <Ripple color="#8553aa" size={30} />:
                            products.map( (e, index) => 
                              <>
                                  <tr>
                                      <td> {index+1} </td>
                                      {/* <td> 
                                        <img className='img img-fluid' style={{ height:100, width:100 }} src={ e.productImages[0] } ></img>
                                      </td> */}
                                      <td> {e.name} </td>
                                      <td> {e.description} </td>
                                      <td> { e._id ? new Date( parseInt( e._id.substring(0,8), 16 ) * 1000 ).toDateString() : "" } </td>
                                      <td style={{ color: '#1668a8', cursor: 'pointer' }} onClick={ () => { setSelectedProduct(e); setShowReview(true) }} > { e.reviews && e.reviews.length } <img src={reviewImg} alt=""/> </td>
                                      <td> <img onClick={ () => {setSelectedProduct(e); setShowEditProdust(true) }} className="cursor-pointer" src={EditImg} alt=""/>  </td>
                                      <td> <img onClick={ () => {setSelectedProduct(e); setShowDeleteProdust(true) }} className="cursor-pointer" src={closeImg} alt=""/> </td>
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
                  <h4 class="card-title ">Services Table</h4>
                  <p class="card-category"> Here is table of all users in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Name </th>
                        <th> Description </th>
                        <th> Created At </th>
                        <th> Reviews </th>
                        <th> Edit </th>
                        <th> Delete  </th>
                      </thead>
                      <tbody>
                        {
                          // laodingList ?
                          // <Ripple color="#8553aa" size={30} />:
                          services &&
                          services.map( (e, index) => 
                            <>
                                <tr>
                                    <td> {index+1} </td>
                                    <td> {e.name} </td>
                                    <td> {e.description} </td>
                                    <td> { e._id ? new Date( parseInt( e._id.substring(0,8), 16 ) * 1000 ).toDateString() : "" } </td>
                                    <td  style={{ color: '#1668a8', cursor: 'pointer' }} onClick={ () => { setSelectedService(e); setShowReviewService(true) }} > { e.reviews && e.reviews.length } <img src={reviewImg} alt=""/> </td>
                                    <td> <img onClick={ () => {setSelectedService(e); setShowEditService(true) }} className="cursor-pointer" src={EditImg} alt=""/>  </td>
                                    <td> <img onClick={ () => {setSelectedService(e); setShowDeleteService(true) }}  className="cursor-pointer" src={closeImg} alt=""/> </td>
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
          size="lg"
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
              <form onSubmit={handleDeleteBusiness} >
                  <p> Are you sure you want to delete <span className="font-weight-bold">  {business.name} </span> ? </p>
                  <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
              </form>
          </Modal.Body>
      </Modal>

      <Modal 
        show={showReview} 
        size="lg"
        onHide={ () => setShowReview(false) }
      >
        <Modal.Header closeButton>
          <Modal.Title> Product Reviews </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { 
              <table class="table">
              <thead class=" text-primary">
                <th> Rating </th>
                <th> Review </th>
                <th> Delete </th>
              </thead>
              <tbody>
                {
                  seletedProduct.reviews.map( e => 
                    <tr>
                        <td> {e.rating} /5 </td>
                        <td> {e.review} </td>
                        <td onClick={() => { handleDeleteReviewProduct(e) }} > <img className="cursor-pointer" src={closeImg} alt=""/> </td>
                    </tr>
                  )
                } 
              </tbody>
            </table>
          }
        </Modal.Body>
      </Modal>



      <Modal 
        show={showReviewService} 
        size="lg"
        onHide={ () => setShowReviewService(false) }
      >
        <Modal.Header closeButton>
          <Modal.Title> Product Reviews </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { 

              <table class="table">
              <thead class=" text-primary">
                <th> Rating </th>
                <th> Review </th>
                <th> Delete </th>
              </thead>
              <tbody>
                {
                  seletedService.reviews.map( e => 
                    <tr>
                        <td> {e.rating} /5 </td>
                        <td> {e.review} </td>
                        <td onClick={() => { handleDeleteReviewService(e) }} > <img className="cursor-pointer" src={closeImg} alt=""/> </td>
                    </tr>
                  )
                } 
              </tbody>
            </table>
          }
        </Modal.Body>
      </Modal>



      <Modal
        size="md"
        show={showEditProduct}
        onHide={() => setShowEditProdust(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit Product
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditProduct} >
                    <input type="text" required class="form-control mb-3"  value={seletedProduct.name} onChange={ e => setSelectedProduct({ ...seletedProduct, name: e.target.value }) } />
                    <input type="text" required class="form-control mb-3"  value={seletedProduct.description} onChange={ e => setSelectedProduct({ ...seletedProduct, description: e.target.value }) }  />
                    <button 
                      type="subimt" 
                      disabled={ seletedProduct.name.length < 1 || seletedProduct.description.length < 1  }  
                      className="btn btn-primary btn-block" 
                    > 
                      Edit 
                    </button>
                </form>
            </Modal.Body>
        </Modal>

        <Modal
            size="md"
            show={showDeleteProduct}
            onHide={() => setShowDeleteProdust(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Product
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleDeleteProduct} >
                    <p> Are you sure you want to delete <span className="font-weight-bold"> { seletedProduct.name } </span> ? </p>
                      <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
                </form> 
            </Modal.Body>
        </Modal>


        <Modal
        size="md"
        show={showEditService}
        onHide={() => setShowEditService(false)}
        aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit Service
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleEditService} >
                    <input type="text" required class="form-control mb-3"  value={seletedService.name} onChange={ e => setSelectedService({ ...seletedService, name: e.target.value }) } />
                    <input type="text" required class="form-control mb-3"  value={seletedService.description} onChange={ e => setSelectedService({ ...seletedService, description: e.target.value }) }  />
                    <button 
                      type="subimt" 
                      disabled={ seletedService.name.length < 1 || seletedService.description.length < 1  }  
                      className="btn btn-primary btn-block" 
                    > 
                      Edit 
                    </button>
                </form>
            </Modal.Body>
        </Modal>

        <Modal
            size="md"
            show={showDeleteService}
            onHide={() => setShowDeleteService(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Service
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleDeleteService} > */}
                    <p> Are you sure you want to delete <span className="font-weight-bold"> { seletedService.name } </span> ? </p>
                    <button type="subimt"  className="btn btn-primary btn-block" > Delete </button>
                </form> 
            </Modal.Body>
        </Modal>

    </div>
  );
}

export default ViewBusiness;
