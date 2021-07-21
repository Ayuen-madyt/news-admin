import React,{useState} from 'react'
import './SignUp.css'
import novas from './novas.webp'
import axios from 'axios'
import { getSignUpError } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {
    Link,
    useHistory
  } from "react-router-dom";

function SignUp() {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[passWord, setPassWord] = useState('');
    const[passConfirm, setPassConfirm] = useState('');
    const[loading, setLoading] = useState(false);
    const[agreeToTerms, setAgreeToTerms] = useState(false)

    let history = useHistory();
    const dispatch = useDispatch();

    const data = {
        username: username,
        email: email,
        password1: passWord,
        password2: passConfirm
    }

    const formData = new FormData();
    
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password1", passWord);
    formData.append("password2", passConfirm);

    const signUp = (e)=>{
        if(agreeToTerms){
            setLoading(!loading)
        e.preventDefault();
        axios.post('/user/accounts/registration/', formData)
        .then(res=>{
            setLoading(false)
            const token = res.data.key;
            if(token){
                history.push("/")
            }
        })
        .catch(error=>{
            setLoading(false)
            if (error.response) {
                //dispatching signup errors
                dispatch(getSignUpError(error.response.data))
            }
        })
        }
    }

    const error_signup = useSelector(state => state.errors.signup);

    const signup_error_name = ()=>{
        if(error_signup.username){
            const signup_error_email = error_signup.username[0];
        
                return (
                    <div className="alert alert-danger" role="alert">
                        {signup_error_email}
                    </div>
                )
        }
    }

    const signup_error_email = ()=>{
        if(error_signup.email){
            
            const signup_error_email = error_signup.email[0];
                return (
                    <div className="alert alert-danger" role="alert">
                        {signup_error_email}
                    </div>
                )
        }
    }

    const signup_error_password = ()=>{
        if(error_signup.non_field_errors){
            
            const signup_error_password = error_signup.non_field_errors[0];
                return (
                    <div className="alert alert-danger" role="alert">
                        {signup_error_password}
                    </div>
                )
        }
    }

    return (
        <div className="body">
            <div className="signup-form">
            <form method="post">
            <img style={{height:"90px", objectFit:"contain"}} alt="..." src={novas} />
            <h2 className="h4">Create Your Account</h2>
            <p>Please fill in this form to create an account!</p>
            {/* wsignup error */}
            {signup_error_email()}
            {signup_error_name()}
            {signup_error_password()}
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
                <input value={passWord} onChange={e=>setPassWord(e.target.value)} type="text" className="form-control" name="password" placeholder="Password" required="required" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon">
                    <i className="fa fa-lock" />
                    <i className="fa fa-check" />
                </span>
                <input value={passConfirm} onChange={e=>setPassConfirm(e.target.value)} type="text" className="form-control" name="confirm_password" placeholder="Confirm Password" required="required" />
                </div>
            </div>
            <div className="form-group">
                <label className="checkbox-inline"><input value={agreeToTerms} onChange={e=>setAgreeToTerms(e.target.value)} type="checkbox" required="required" /> I accept the <a href="http://localhost:3000/termsandconditions">Terms of Use</a> &amp; <a href="http://localhost:3000/termsandconditions">Conditions</a></label>
            </div>
            <Link to="/"><p>Already have an account? login here</p></Link>
            <div className="form-group">
            {loading? <div style={{marginLeft:"auto", marginRight:"auto"}} className="loader" ></div>: <button onClick={signUp} type="submit" className="btn btn-primary btn-lg">Send</button>}
            </div>
            </form>

        </div>
        </div>
    )
}

export default SignUp
