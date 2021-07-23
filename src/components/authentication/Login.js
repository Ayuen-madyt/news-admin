import React,{useState} from 'react'
import './Login.css'
import novas from './novas.webp'
import { addUserDetails, getLoginError } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
    Link,
    useHistory
  } from "react-router-dom";

function Login() {
    const[email, setEmail] = useState('');
    const[passWord, setPassWord] = useState('');
    const[username, setUsername] = useState('');
    const dispatch = useDispatch();
    let history = useHistory();

    // const [width, setWidth] = useState(window.innerWidth);

    const data = {
        username:username,
        email:email,
        password:passWord
    }

    const login = (e)=>{
        e.preventDefault();
        // http://127.0.0.1:8000
        axios.post('/users/api-token-auth/', data)
        .then(res=>{
            dispatch(addUserDetails(res.data));
            history.push("/control-admin-panel")
            // window.location.reload()
        })
        .catch(error=>{
            //dispatching signup errors
            dispatch(getLoginError(error.response.data))
        })
    }

    const error_login_state = useSelector(state => state.errors.login);

    const error_login = ()=>{
        if(error_login_state.non_field_errors){
            const error_login = error_login_state.non_field_errors[0];
        
                return (
                    <div className="alert alert-danger" role="alert">
                        {error_login}
                    </div>
                )
        }
    }

    return (
        <div className="body">
            <div className="signup-form">
            <form method="post">
            <img style={{height:"90px", objectFit:"contain"}} alt="..." src={novas} />
            <h2 className="h4">Sign in to your account</h2>
            <p>Please fill in this form to create an account!</p>
            {/* login error */}
            {error_login()}
            <hr />
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user" /></span>
                <input value={username} onChange={e=>setUsername(e.target.value)} type="text" className="form-control" name="username" placeholder="Username" required="required" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-paper-plane" /></span>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" name="email" placeholder="Email Address" required="required" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-lock" /></span>
                <input value={passWord} onChange={e=>setPassWord(e.target.value)} type="text" type="password" className="form-control" name="password" placeholder="Password" required="required" />
                </div>
            </div>
            {/* <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="fa fa-lock" />
                    <i className="fa fa-check" />
                </span>
                </div>
            </div> */}
            <Link to="/reset-password"><p>Forgot password?</p></Link>
            <div className="form-group">
                <button onClick={login} type="submit" className="btn btn-primary btn-lg">Login</button>
            </div>
            </form>

        </div>
        </div>
    )
}

export default Login