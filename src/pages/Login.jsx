import React from "react";
import SidebarImg from "./../assets/img/sidebar-1.jpg"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import logoImg from "./../assets/img/logo.png";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";

import { setLoading } from "../actions/loading";
import { customLogin } from "../actions/users";

function Login(props) {
    const { addToast } = useToasts();
    const [ formdata, setFormData ] = React.useState({});
    const [ loading, setloading ] = React.useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector( state => state.isLoggedIn );

    React.useEffect( () => {
        // if( !isLoggedIn ){ props.history.push('/') }
    },[])

  const handleCustomLogin = e => { 
    e.preventDefault(); 
    dispatch(setLoading(true));
    dispatch(customLogin( formdata ))
    .then( res => {
      if(res.error){
          addToast( res.error.data.message , { appearance: 'info' });
          console.log(res.error);
      }else{
        addToast('Login Success', { appearance: 'success' });
        setFormData({});
        props.history.push("/")
      }
    });
    dispatch(setLoading(false));
  }
 

  return (
    <div className="text-center login">

    <form class="form-signin" onSubmit={handleCustomLogin} >
        <img class=" " src={logoImg} alt="" className="img img-fluid" style={{width:260}}  />
        <h4 class="h4 my-4 font-weight-normal"></h4>
        <label for="inputEmail"  class="sr-only">Email address</label>
        <input type="email" required id="inputEmail" class="form-control mb-3" placeholder="Email address" value={formdata.email} onChange={e => setFormData({ ...formdata, email: e.target.value })} required autofocus />
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" required id="inputPassword" class="form-control mb-4" placeholder="Password"  value={formdata.password} onChange={e => setFormData({ ...formdata, password: e.target.value })}  required />
        <div class="checkbox mb-3">
            {/* <label>
            <input type="checkbox" value="remember-me" /> 
             Remember me
            </label> */}
        </div>
        {
            loading ? 
            <div style={{height:50}} class=" text-center"><Ripple color="#8553aa" size={50} /></div>:
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        }
        <p class="mt-5 mb-3 text-muted">&copy; 2020-2024</p>
    </form>

    </div>
  );
}

export default Login;
