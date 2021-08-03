import React, {useState} from 'react'
import './Profile.css'
import axios from 'axios'
import { updateProfileSuccess, updateProfileFail } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom'

function Profile() {
    const[image, setImage] = useState(null);
    const[about, setAbout] = useState('');
    const id = localStorage.getItem('userId');
    const name = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const profiles = useSelector(state=>state.profile)
    let history = useHistory();
    const dispatch = useDispatch();

    const userProfile = ()=>{
        if(profiles.length>0){
            return profiles.find(profile=>profile.user==id); // use two equal signs for profile pic to appear
        }
    }

    const formData = new FormData();
    
    formData.append("image", image);
    formData.append("about", about);

    function sendProfile(e){
        e.preventDefault();
        // http://127.0.0.1:8000/user/profile
        axios.put(`/users/profile/${userProfile().id}/`, formData, {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`
            }
        })
        .then(
            //res=>console.log(res.data)
            dispatch(updateProfileSuccess())
        )
        .catch(
            //err=>console.log(err.response.data)
            dispatch(updateProfileFail())
        )
        setAbout('');
        setImage('')
        window.scrollTo(0,0);
    }

    const profile_post_success = useSelector(state=>state.profileUpdateResponses.profilePoststSuccess);
    const profile_post_fail = useSelector(state=>state.profileUpdateResponses.profilePoststFail);

    // function for alerting the user if the post was successful
    const profileSuccess = ()=>{
        if(profile_post_success){
            return(
                <div className="alert alert-success" role="alert">
                    Profile was successfully updated! Reload the page to see the changes
                </div>
            )
        }
    }

    // function fro alerting the user if the post was unsuccessful
    const profileFail = ()=>{
        if(profile_post_fail){
            return(
                <div className="alert alert-danger" role="alert">
                    There was an error updating profile!
                </div>
            )
        }
    }

    return (
        <div className="m-4">
            {profileSuccess()}
            {profileFail()}
            <p className="bg-dark text-white p-2 h5">Settings</p>
            <div className="profile mt-3">
                {userProfile() && <img className="profilepic" src={userProfile().image} alt={`${name}'s profile`}/>}
                <div className="bio ml-3">
                    <span style={{display:"flex"}} ><p>Name:</p> <p className="ml-2 text-muted">{name}</p></span>
                    <span style={{display:"flex"}} ><p>Email:</p> <p className="ml-2 text-muted">{email}</p></span>
                    {userProfile() && 
                        <div style={{display:"flex"}} >
                            <p>About: </p>
                            <p id="about" className="text-muted ml-2">{userProfile().about}</p>
                        </div>
                    }
                </div>
            </div>
            <form className="formd mt-4">
                <p className="h6">Upload a profile picture</p>
                <input onChange={e=>setImage(e.target.files[0])} type="file" id="img" name="img" accept="image/*" />
                <div className="mt-3 mb-3">
                    <label for="exampleFormControlTextarea1" className="form-label h6">Update about</label>
                    <textarea value={about} onChange={e=>setAbout(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="write something..."></textarea>
                </div>
                <button onClick={sendProfile} className="btn btn-primary mt-2">update</button>
            </form>
        </div>
    )
}

export default Profile
