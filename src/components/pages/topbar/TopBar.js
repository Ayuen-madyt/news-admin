import React from "react";
import "./TopBar.css";
import novas from './novas.webp'
import { Settings } from "@material-ui/icons";
import {Link, useHistory} from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Topbar() {
  const id = localStorage.getItem('userId');
  const profiles = useSelector(state=>state.profile)

  const userProfile = ()=>{
      if(profiles.length>0){
          return profiles.find(profile=>profile.user==id);// use two equal signs for profile pic to appear
      }
  }
  let history = useHistory();

  const logOut =()=>{
    localStorage.removeItem('token');
    history.push('/');
     // reloading a page on button click
     window.location.reload();
}
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <img className="logo" alt="..." src={novas} />
        </div>
        <div className="topRight">
        <a href="https://novas101-frontend.herokuapp.com/" target="_blank" className="h6 text-muted topbarIconContainer">
            View Site
          </a>
          <div onClick={logOut} className="h6 text-muted topbarIconContainer">
            logout
          </div>
          <Link to="/control-admin-panel/profile" className="topbarIconContainer">
          <Settings />
          </Link>
          <div>
          <img src={userProfile() && userProfile().image} alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    </div>
  );
}