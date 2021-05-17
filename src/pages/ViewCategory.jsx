

import React from "react";

import Nav from "./../components/Nav";
import Footer from "./../components/Footer";
import { Modal } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { path } from "./../path";

import EditImg from "./../assets/img/pencil-fill.png";
import closeImg from "./../assets/img/close-line.png";
import { useToasts } from 'react-toast-notifications';
import { Ripple } from "react-css-spinners";

import { setCategories } from "./../actions/categories";
import { setLoading } from "../actions/loading";


function ViewCategory() {
  const dispatch = useDispatch();
  const { addToast } = useToasts();

  const categories = useSelector(state => state.categories.categories)
  const token = useSelector(state => state.token);

  React.useEffect(() => {
    dispatch(setCategories());
  }, []);



  const handleDeleteCategory = category_id => {
    const url = `${path}api/categories/${category_id}`;
    const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    dispatch(setLoading(true));
    axios
      .delete(url, config)
      .then(res => {
        dispatch(setCategories());
        addToast('delete category success', { appearance: 'info' });
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));

        if (err.response) {
          addToast('Server Error, Please try Again', { appearance: 'info' });
        }
      })
  }

  const handleDeleteSubCategory = _id => {
    const url = `${path}api/categories/subCategory/${_id}`;
    const config = { headers: { "x-auth-token": localStorage.getItem("token") } };
    dispatch(setLoading(true));
    axios
      .delete(url, config)
      .then(res => {
        dispatch(setCategories()) 
        addToast('delete category success', { appearance: 'info' });
        dispatch(setLoading(false));
      })
      .catch(err => {
        dispatch(setLoading(false));
        addToast('Server Error, Please try Again', { appearance: 'info' });
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
                            {/* <th> EDIT </th> */}
                            <th> DELETE </th>
                          </thead>
                          <tbody>
                            {
                              categories && categories.map((e, index) =>
                                <tr>
                                  <td> {index + 1} </td>
                                  <td> <img src={e.imageUrl} className="img img-fluid category-pic-table" alt="" /> </td>
                                  <td>{e.name}</td>
                                  {/* <td > <img className="cursor-pointer" src={EditImg} alt=""/> </td> */}
                                  <td  > <img onClick={() => handleDeleteCategory(e._id)} className="cursor-pointer" src={closeImg} alt="" />  </td>
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
                            {/* <th> EDIT </th> */} 
                            <th> DELETE </th>
                          </thead>
                          <tbody>
                            {
                              categories && categories.map((e, index) =>
                                e.SubCategory && e.SubCategory.map(s =>
                                  <>
                                    <tr>
                                      <td> {index + 1} </td>
                                      <td>{e.name}</td>
                                      <td>{s.name}</td>
                                      {/* <td > <img className="cursor-pointer" src={EditImg} alt=""/> </td> */}
                                      <td> <img onClick={() => handleDeleteSubCategory(s._id)} className="cursor-pointer" src={closeImg} alt="" />  </td>
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

    </div>
  );
}

export default ViewCategory;