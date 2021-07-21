import React,{useState} from 'react'
import './SignUp.css'
import axios from 'axios'
import { passWordResetSuccess,passWordResetFail } from '../../redux/actions';
import novas from './novas.webp'
import { useDispatch, useSelector } from 'react-redux';

// css styling is coming from signup.css

function PasswordReset() {
    const[email, setEmail] = useState('');
    const[loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const data = {
        'email': email,
    }
    
    const resetPassWord = (e)=>{
        setLoading(!loading)
        e.preventDefault();
        // http://127.0.0.1:8000
        axios.post('/user/accounts/password/reset/', data)
        .then(res=>{
            // console.log(res.data)
            dispatch(passWordResetSuccess(res.data.detail))
            setLoading(false)
        })
        .catch(error=>{
            setLoading(false)
            if(error.response.data.email[0]==="Enter a valid email address."){
                // console.log(error.response.data)
                return dispatch(passWordResetFail(error.response.data.email[0]))
            }
            if(error.response.data.email[0]==="This field may not be blank."){
                // console.log(error.response.data)
                return dispatch(passWordResetFail(error.response.data.email[0]))
            }
            if(error.response.data.email.email[0]){
                // console.log(error.response.data)
                return dispatch(passWordResetFail(error.response.data.email.email[0]))
            }
        })
    }

    const passReset = useSelector(state => state.passwordReset);

    const passWord_Reset = ()=>{
        if(passReset==="Password reset e-mail has been sent."){
            return (
                <div className="alert alert-info" role="alert">
                    {passReset} check your email, {email}
                </div>
            )
        }
        else if(passReset==="The e-mail address is not assigned to any user account"){
            return (
                <div className="alert alert-danger" role="alert">
                    {passReset}
                </div>
            )
        }
        else if(passReset==="Enter a valid email address."){
            return (
                <div className="alert alert-danger" role="alert">
                    {passReset}
                </div>
            )
        }
        else if(passReset==="This field may not be blank."){
            return (
                <div className="alert alert-danger" role="alert">
                    {passReset}
                </div>
            )
        }
    }

    return (
        <div className="body">
            <div className="signup-form">
            <form action="/examples/actions/confirmation.php" method="post">
            <img style={{height:"90px", objectFit:"contain"}} alt="..." src={novas} />
            <h2 className="h4">Password Reset</h2>
            <p>Please enter your email here to reset your password!</p>
            {/* wsignup error */}
            {passWord_Reset()}
            <hr />
    
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-paper-plane" /></span>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className="form-control" name="email" placeholder="Email Address" required="required" />
                </div>
            </div>
            <div className="form-group">
                {loading? <div style={{marginLeft:"auto", marginRight:"auto"}} className="loader" ></div>: <button onClick={resetPassWord} type="submit" className="btn btn-primary btn-lg">Send</button>}
            </div>
            </form>

        </div>
        </div>
    )
}

export default PasswordReset
