// this component is not currently in use, password reset confirm is being handled by django

import React,{useState} from 'react'
import './Login.css'
import logo3 from './logo3.webp'
import { passWordResetConfirmSuccess, passWordResetConfirmFail} from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function PasswordResetConfirm() {
    const[passWord1, setPassWord1] = useState('');
    const[passWord2, setPassWord2] = useState('');
    const dispatch = useDispatch();

    const data = {
        'New password1':passWord1,
        'New password2':passWord2
    }

    const resetPassWordConfirm = (e)=>{
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/accounts/password/reset/confirm', data)
        .then(res=>{
            console.log(res.data)
            dispatch(passWordResetConfirmSuccess(res.data.detail))
        })
        .catch(error=>{
            if(error.response.data.email[0]==="Enter a valid email address."){
                console.log(error.response.data)
                return passWordResetConfirmFail(error.response.data.email[0])
            }
            if(error.response.data.email[0]==="This field may not be blank."){
                console.log(error.response.data)
                return passWordResetConfirmFail(error.response.data.email[0])
            }
            if(error.response.data.email.email[0]){
                console.log(error.response.data)
                return passWordResetConfirmFail(error.response.data.email.email[0])
            }
        })
    }

    const passReset = useSelector(state => state.PasswordResetConfirm);

    const passWord_Reset_confirm = ()=>{
        if(passReset==="Password reset e-mail has been sent."){
            return (
                <div className="alert alert-info" role="alert">
                    {passReset} 
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
            <img style={{height:"90px", objectFit:"contain"}} alt="..." src={logo3} />
            <h2 className="h4">Enter your new password</h2>
            <p>Please fill in this form to reset your password!</p>
            {/* login error */}
            {passWord_Reset_confirm()}
            <hr />
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user" /></span>
                <input value={passWord1} onChange={e=>setPassWord1(e.target.value)} type="password" className="form-control" name="username" placeholder="New password" required="required" />
                </div>
            </div>
            <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-paper-plane" /></span>
                <input value={passWord2} onChange={e=>setPassWord2(e.target.value)} type="password" className="form-control" name="email" placeholder="Confirm new password" required="required" />
                </div>
            </div>
           
            <div className="form-group">
                <button onClick={resetPassWordConfirm} type="submit" className="btn btn-primary btn-lg">Reset password</button>
            </div>
            </form>

        </div>
        </div>
    )
}

export default PasswordResetConfirm