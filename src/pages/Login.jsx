import React from "react";
import SidebarImg from "./../assets/img/sidebar-1.jpg"
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import logoImg from "./../assets/img/logo.png";
import { heroku_path } from "./../path";
import { useToasts } from 'react-toast-notifications';
import {Ripple} from "react-css-spinners";

function Login(props) {
    const { addToast } = useToasts();
    const [ formdata, setFormData ] = React.useState({});
    const [ loading, setloading ] = React.useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector( state => state.isLoggedIn );

    React.useEffect( () => {
        // if( !isLoggedIn ){ props.history.push('/') }
    },[])

    const handleloginFormSubmit = e => {
        e.preventDefault();
        console.log("here")

        setloading(false);
        dispatch({
            type: 'SET_USER_DATA',
            usersData: { email: "ali@gmail.com", name:"Ali Raza", role: "3" },
            token: "38257281358123",
            isLoggedIn: true 
        }); 
        addToast('Login Successfully', { appearance: 'success' });
        props.history.push('/');

        // const url = `${heroku_path}api/admin/login`;
        // setloading(true);
        // axios.post( url, formdata )
        // .then( res => {
        //     if( res.status >= 200 && res.status < 300 ){
        //         console.log("here")
        //         setloading(false);
        //         const { email, name, role, token } = res.data;
        //         localStorage.setItem( "token", token );
        //         dispatch({
        //             type: 'SET_USER_DATA',
        //             usersData: { email, name, role },
        //             token: res.data.token,
        //             isLoggedIn: true
        //         }); 
        //         addToast('Login Successfully', { appearance: 'success' });
        //         props.history.push('/');
        //     }else{
        //         setloading(false);
        //     }
        // })
        // .catch( err => {
        //     if(err.response.status === 401 && err.response.data === "Invalid email or password."){
        //       console.log(err.response)
        //       addToast('wrong email or password', { appearance: 'info' });
        //       setFormData({ ...formdata, password: "" });
        //       setloading(false);
        //     }
        // })

    }
 

  return (
    <div className="text-center login">

    <form class="form-signin" onSubmit={handleloginFormSubmit} >
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
