

import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { heroku_path } from "./../path";

import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";

import { setCategories } from "./../actions/categories";
 
function ViewCategory() {
    const dispatch = useDispatch();
    const { addToast } = useToasts();    
    
    const categories = useSelector( state => state.categories.categories )
    const token = useSelector( state => state.token );
    
    React.useEffect( () => {
      dispatch(setCategories() );
    },[]);


  //   const handleEditSubCategory = e => {
  //       e.preventDefault();
  //       console.log( selectedCategory );
  //       const url = `${heroku_path}api/category/subCategory`;
  //       const config = { headers: {"x-auth-token": token }};
  //       setloadingSub(true);
  //       axios
  //       .put(url, {_id: selectedCategory._id, name: selectedCategory.name}, config )
  //       .then(res =>  {
  //           // seSubCCategories(res.data)
  //           setIndustry(res.data);
  //           setSmShowSubCat(false);
  //           setSelectedCategory({name:"", _id:""});
  //           setFormEdit("");
  //           setloadingSub(false);
  //           addToast('edit sub category success', { appearance: 'success' });
  //       })  
  //       .catch( err => {
  //         if( err.response ){
  //           if(err.response.status === 401 && err.response.data === "unauth"){
  //             addToast('you are not auth to access resource', { appearance: 'info' });
  //           }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
  //             addToast('please provide token', { appearance: 'info' });
  //           }else if(err.response.status === 403 && err.response.data === 'invalid token'){
  //             addToast('please provide valid token', { appearance: 'info' });
  //           }else{
  //             addToast('Server Error, Please try Again', { appearance: 'info' });
  //           }
  //         }
  //       })
  //   }


  //   const handleEditCategory = e => {
  //     e.preventDefault();
  //     console.log( selectedCategoryMain );
  //     const url = `${heroku_path}api/category`;
  //     const config = { headers: {"x-auth-token": token }};
  //     setloadingCat(true);
  //     axios
  //     .put(url, {_id: selectedCategoryMain._id, name: selectedCategoryMain.name}, config )
  //     .then(res =>  {
  //         console.log(res.data);
  //         setloadingCat(false);
  //         setIndustry(res.data)
  //         setSmShowCategory(false);
  //         setSelectedCategoryMain({name:"", _id:""});
  //         addToast('edit category success', { appearance: 'success' });
  //     })  
  //     .catch( err => {
  //       if(err.response){
  //         if(err.response.status === 401 && err.response.data === "unauth"){
  //           addToast('you are not auth to access resource', { appearance: 'info' });
  //         }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
  //           addToast('please provide token', { appearance: 'info' });
  //         }else if(err.response.status === 403 && err.response.data === 'invalid token'){
  //           addToast('please provide valid token', { appearance: 'info' });
  //         }else{
  //           addToast('Server Error, Please try Again', { appearance: 'info' });
  //         }
  //       }
  //     })
  // }

  //  const handleEditIndustry = e => {
  //    e.preventDefault();
  //    setloadingIndus(true);
  //    const url = `${heroku_path}api/category/industry`;
  //    const config = { headers: {"x-auth-token": token }};
  //    axios
  //    .put(url, {_id: selectedIndustryMain._id, name: selectedIndustryMain.name}, config )
  //    .then(res =>  {
  //        setloadingIndus(false);
  //        console.log(res.data)
  //        setSmShowIndustry(false);
  //        const result = industry.map( indus => {
  //          if(indus._id === res.data._id ){
  //            return res.data
  //          }
  //          return indus
  //        })      
  //       //  setIndustry(result);
  //       setIndustry(result)
  //        setSelectedIndustryMain({name:"", _id:""});
  //        addToast('edit category success', { appearance: 'success' });
  //    })  
  //    .catch( err => {
  //     if(err.response){
  //       if(err.response.status === 401 && err.response.data === "unauth"){
  //         addToast('you are not auth to access resource', { appearance: 'info' });
  //       }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
  //         addToast('please provide token', { appearance: 'info' });
  //       }else if(err.response.status === 403 && err.response.data === 'invalid token'){
  //         addToast('please provide valid token', { appearance: 'info' });
  //       }else{
  //         addToast('Server Error, Please try Again', { appearance: 'info' });
  //       }
  //     }
  //   })
  //  }


  //   const handleDeleteSubCategory = e => {
  //       e.preventDefault()
  //       const url = `${heroku_path}api/category/subCategory/${ selectedCategory._id }`;
  //       const config = { headers: {"x-auth-token": token }};
  //       setloadingDelete(true);
  //       axios
  //       .delete(url , config )
  //       .then(res =>  {
  //           setloadingDelete(false);
  //           setIndustry( res.data );
  //           setSmShowDeleteSubCategory(false);
  //           addToast('delete sub category success', { appearance: 'info' });
  //       })  
  //       .catch( err => {
  //         if(err.response){
  //           if(err.response.status === 401 && err.response.data === "unauth"){
  //             addToast('you are not auth to access resource', { appearance: 'info' });
  //           }else if(err.response.status === 401 && err.response.data === "Access denied. No token provided."){
  //             addToast('please provide token', { appearance: 'info' });
  //           }else if(err.response.status === 403 && err.response.data === 'invalid token'){
  //             addToast('please provide valid token', { appearance: 'info' });
  //           }else{
  //             addToast('Server Error, Please try Again', { appearance: 'info' });
  //           }
  //         }
  //       })
  //   }


    const handleDeleteCategory = e => {
      e.preventDefault()
      const url = `${heroku_path}api/category/`;
      const config = { headers: {"x-auth-token": token }};
      axios
      .delete(url , config )
      .then(res =>  {
        
        addToast('delete category success', { appearance: 'info' });
      })  
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
      })
    }







  return (
    <div className="ViewCategory">
        <div class="">
        <div class="main-panel">

        <Nav />
      
      <div class="content">
        <div class="container-fluid">


          <div class="row mt-5">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header card-header-primary">
                  <h4 class="card-title ">Category Table</h4>
                  <p class="card-category"> Here is table of all categories and sub categories in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Image </th>
                        <th> Category </th>
                        <th> EDIT </th>
                        <th> DELETE </th>
                      </thead>
                      <tbody>
                      {
                        categories && categories.map( (e, index) =>  
                          <tr>
                            <td> {index+1} </td>
                            <td> <img src={e.imageUrl} className="img img-fluid category-pic-table" alt=""/> </td>
                            <td>{e.name}</td>
                            <td > <img className="cursor-pointer" src={EditImg} alt=""/> </td>
                            <td  > <img className="cursor-pointer" src={closeImg} alt=""/>  </td>
                          </tr>
                        )
                      }
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
                  <h4 class="card-title ">Sub-Category Table</h4>
                  <p class="card-category"> Here is table of all categories and sub categories in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Category </th>
                        <th> Sub-Category </th>
                        <th> EDIT </th>
                        <th> DELETE </th>
                      </thead>
                      <tbody>
                      {
                        categories && categories.map( (e, index) =>  
                            e.SubCategory && e.SubCategory.map(s => 
                            <>
                              <tr>
                                <td> {index+1} </td>
                                <td>{e.name}</td>
                                <td>{s.name}</td>
                                <td > <img className="cursor-pointer" src={EditImg} alt=""/> </td>
                                <td > <img className="cursor-pointer" src={closeImg} alt=""/>  </td>
                              </tr>
                            </>
                          )
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
            show={smShowInudry}
            onHide={() => setSmShowIndustry(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit Industry
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleEditIndustry} >
                    <input type="text" required className="form-control mb-3" value={selectedIndustryMain.name } onChange={e => setSelectedIndustryMain({...selectedIndustryMain, name: e.target.value  })}  />
                    {
                      laodingIndus ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" disabled={ selectedIndustryMain.name.length < 1 } class="btn btn-primary btn-block">Update industry</button>
                    }
                </form>

            </Modal.Body>
        </Modal> */}

        {/* <Modal
            size="sm"
            show={smShowCategory}
            onHide={() => setSmShowCategory(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit Category
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleEditCategory} >
                    <input type="text" required className="form-control mb-3" value={selectedCategoryMain.name } onChange={e => setSelectedCategoryMain({...selectedCategoryMain, name: e.target.value  })}  />
                    {
                      laodingCat ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" disabled={ selectedCategoryMain.name.length < 1 }  class="btn btn-primary btn-block">Update Category</button>
                    }
                </form>

            </Modal.Body>
        </Modal> */}


        {/* <Modal
            size="sm"
            show={smShowSubCat}
            onHide={() => setSmShowSubCat(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Edit SubCategory
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>

                <form onSubmit={handleEditSubCategory} >
                    <input type="text" required className="form-control mb-3" value={selectedCategory.name} onChange={ e => setSelectedCategory({ ...selectedCategory, name: e.target.value }) } />
                    {
                      laodingSub ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" disabled={ selectedCategory.name.length < 1 }  class="btn btn-primary btn-block">Update Sub Category</button>
                    }
                </form>

            </Modal.Body>
        </Modal> */}
         
        {/* <Modal
            size="sm"
            show={smShowDeleteIndus}
            onHide={() => setSmShowDeleteIndus(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Industry
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleDeleteIndustry} >
                     <p>{selectedCategory.name}</p> 
                    <p> Are you sure you want to delete <span className="font-weight-bold">{ selectedIndustryMain.name }</span> ? </p>
                    {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary btn-block">Delete Industry</button>
                    }
                    
                </form>
            </Modal.Body>
        </Modal> */}

        {/* <Modal
            size="sm"
            show={smShowDeleteIndus}
            onHide={() => setSmShowDeleteIndus(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Industry
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleDeleteIndustry} >
                    <p> Are you sure you want to delete <span className="font-weight-bold">{selectedIndustryMain.name}</span> ? </p>
                    {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary btn-block">Delete Sub Category</button>
                    }
                    
                </form>
            </Modal.Body>
        </Modal> */}

        {/* <Modal
            size="sm"
            show={smShowDeleteCategory}
            onHide={() => setSmShowDeleteCategory(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Industry
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={ handleDeleteCategory } >
                    <p> Are you sure you want to delete <span className="font-weight-bold">{selectedCategoryMain.name}</span> ? </p>
                    {
                      laodingDelete ?
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary btn-block">Delete Sub Category</button>
                    }
                    
                </form>
            </Modal.Body>
        </Modal> */}

        {/* <Modal
            size="sm"
            show={smShowDeleteSubCategory}
            onHide={() => setSmShowDeleteSubCategory(false)}
            aria-labelledby="example-modal-sizes-title-sm"
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
                Delete Sub Category
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleDeleteSubCategory} >
                    <p> Are you sure you want to delete <span className="font-weight-bold">{ selectedCategory.name }</span> ? </p>
                    {
                      laodingDelete ? 
                      <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={30} /></div>:
                      <button type="submit" class="btn btn-primary btn-block">Delete Sub Category</button>
                    }
                    
                </form>
            </Modal.Body>
        </Modal> */}

    </div>
  );
}

export default ViewCategory;
