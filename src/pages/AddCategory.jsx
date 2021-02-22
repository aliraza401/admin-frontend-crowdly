import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { useSelector } from "react-redux";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

import axios from "axios";


function AddCategory() {
    const { addToast } = useToasts();
    const [ categories, setCategories ] = React.useState([]);
    const [ industries, setIndustries ] = React.useState([]);
    const [ formIndustry, setFormIndustry ] = React.useState({});
    const [ formCategory, setFormCategory ] = React.useState({});
    const [ formSubCategory, setFormSubCategory ] = React.useState({});

    const [ loading_indus, setLoadingIndus ] = React.useState(false);
    const [ loading_category, setLoadingCat ] = React.useState(false);
    const [ loading_subCategory, setLoadingSub ] = React.useState(false);
    const [ loading_drop_industry, setLoadingDropIndustry ] = React.useState(true);
    const [ loading_drop_cat, setLoadingDropCat ] = React.useState(true);


    const token = useSelector( state => state.token )
    
    React.useEffect( () => {
        if(token){
          axios
            .get(`${heroku_path}api/category`)
            .then(res =>  { setCategories(res.data); setLoadingDropCat(false); }  )  
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
            
          axios
            .get(`${heroku_path}api/category/industry`)
            .then(res =>  {setIndustries(res.data); setLoadingDropIndustry(false);}  )  
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

    const handleIndustrySubmit = e => {
      e.preventDefault();
      const url = `${heroku_path}api/category/industry`;
      const config = { headers: {"x-auth-token": token } };
      setLoadingIndus(true);
      axios
        .post(url, formIndustry , config )
        .then(res => {
            if(res.status >= 200 && res.status < 300 ){
              setFormIndustry({ name: "" })
              setIndustries( prev => [ ...prev, res.data ] );
              addToast('add industry success', { appearance: 'success' });
              setLoadingIndus(false);
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

    const handleCategorySubmmit = e => {
        e.preventDefault();
        console.log(formCategory)
        const url = `${heroku_path}api/category`;
        const config = { headers: {"x-auth-token": token } };
        setLoadingCat(true);
        axios
          .post(url, formCategory , config )
          .then(res => {
              if(res.status >= 200 && res.status < 300 ){
                setFormCategory({ name: "", i_id: "" })
                setCategories( prev => [ ...prev, res.data ] );
                setLoadingCat(false);
                addToast('add category success', { appearance: 'success' });
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

    const handleSubCategorySubmmit = e => {
        e.preventDefault();
        console.log("33")
        console.log( formSubCategory )
        const url = `${heroku_path}api/category/subCategory`;
        const config = { headers: {"x-auth-token": token } };
        setLoadingSub(true);
        axios
          .post(url, formSubCategory , config )
          .then(res => {
              if(res.status >= 200 && res.status < 300 ){
                setFormSubCategory({name:"",_id:""});
                setLoadingSub(false);
                addToast('add sub category success', { appearance: 'success' });
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
    <div className="AddCategory">
        <div class="">
        <div class="main-panel">
        
        <Nav />


      <div class="content">
        <div class="container-fluid">

          <div class="row">
            <div class="col-md-8">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title">Add Category</h4>
                  <p class="card-category">Here you can add business categories</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleCategorySubmmit} >
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          <label class="bmd-label-floating">Add Category Name</label>
                          <input type="text" required class="form-control" placeholder="Sedan, MPV" value={formCategory.name} onChange={ e => setFormCategory({...formCategory, name: e.target.value}) } />
                        </div>
                      </div>
                    </div>
                    {
                      loading_category ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add Category</button>
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
                  <h4 class="card-title">Add Sub Category</h4>
                  <p class="card-category">Here you can add business categories</p>
                </div>
                <div class="card-body">
                  <form onSubmit={handleSubCategorySubmmit} >
                    <div class="row">
                      <div class="col-md-12">
                        <div class="form-group">
                          {
                            loading_drop_cat?
                            <Ripple color="#8553aa" size={30} />:
                            <select name="city" value={formSubCategory._id} required  onChange={ e => setFormSubCategory({...formSubCategory, _id: e.target.value}) }  class="custom-select mb-3" id="validationCustom04" style={{border: `1px solid #1668a8` }}>
                            <option selected disabled value=""> Select Category </option>
                                {
                                    categories.map(e => (
                                        <option value={ e._id } key={ e._id } > { e.name } </option>
                                    ))
                                }
                            </select>
                          }
                          <label class="bmd-label-floating">Add Sub Category Name</label>
                          <input type="text" required class="form-control" placeholder=""  value={formSubCategory.name} onChange={ e => setFormSubCategory({...formSubCategory, name: e.target.value}) } />
                        </div>
                      </div>
                    </div>
                    {
                      loading_subCategory ? 
                      <div style={{height:50}} class=" pull-right"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary pull-right">Add Sub Category</button>
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

export default AddCategory;
