import './App.css';
import React, {useEffect} from 'react';
import { fetchData } from './redux/actions'
import { fetchProfiles, fetchUsers } from './redux/actions'
import { useDispatch } from 'react-redux'
import Login from './components/authentication/Login'
import SignUp from './components/authentication/SignUp'
import CheckEmail from './components/authentication/CheckEmail'
import AdminIndex from './components/pages/Index';
import PasswordReset from './components/authentication/PasswordReset'
import PasswordResetConfirm from './components/authentication/PasswordResetConfirm';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchData());
    dispatch(fetchProfiles());
    dispatch(fetchUsers());
  },[])

  
    return (
       <Router>
        <div className="app">
            <Switch>
                <Route exact path="/" component={Login} />
                <Route path="/Signup" component={SignUp} />
                <Route path="/signupconfirm" component={CheckEmail} />
                {/* <Route path="/passwordreset" component={PasswordReset} /> */}
                <Route path="/reset-password" component={PasswordReset} />
                <Route path='/password/reset/confirm/:uid/:token/' component={PasswordResetConfirm} />
                <Route path="/control-admin-panel" component={AdminIndex} />
            </Switch>
        </div>
       </Router>
    )
}

export default App;
