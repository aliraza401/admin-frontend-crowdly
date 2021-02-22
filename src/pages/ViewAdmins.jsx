import React from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import {Modal} from  "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditImg from "./../assets/img/pencil-fill.png";
import { heroku_path } from "./../path";
import {Ripple} from "react-css-spinners";



function ViewAdmins() {
  const [ admins, setAdmins ] = React.useState([]);
  const token = useSelector( state => state.token );
  const [laodingList, setloadingList] = React.useState(true);


  React.useEffect( () => {
      const url = `${heroku_path}api/admin/admins`;
      const config = { headers: {"x-auth-token": token }};
      axios
      .get(url, config)
      .then(res =>  {
          console.log(res.data);
          setAdmins(res.data)
          setloadingList(false);

      })  
      .catch(err => console.log(err))
  },[]);

  const printRole = admin => {
    if( admin.role === 3){
      return "SuperAdmin";
    }else if( admin.role === 2 ){
      return "Admin"
    }else if( admin.role === 1){
      return "Content Creator"
    }
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
                  <h4 class="card-title ">Admin Table</h4>
                  <p class="card-category"> Here is table of all cities and area in system</p>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead class=" text-primary">
                        <th> No. </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th> Role </th>
                        <th> EDIT </th>
                      </thead>
                      <tbody>
                        {
                            laodingList ?
                            <Ripple color="#8553aa" size={30} />:
                            admins.map( (e, index) => 
                            <>
                                <tr>
                                    <td> {index+1} </td>
                                    <td> {e.name} </td>
                                    <td> {e.email} </td>
                                    <td> { printRole(e) } </td>
                                    <Link to={`/view-admin/${e._id}`}> <td> <img className="cursor-pointer" src={EditImg} alt=""/>  </td> </Link>
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

    </div>
  );
}

export default ViewAdmins;
