import  React from 'react'
import { useSelector } from 'react-redux'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

function Users() {
    const users = useSelector(state=>state.users)
    return (
        <div className="m-4">
            <table class="table bg-white">
            <thead className="bg-primary text-white">
                <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Promote to Staff</th>
                <th scope="col">Staff Status</th>
                <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user,index)=>(
                    <tr key={user.id}>
                        <th scope="row">{index+1}</th>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            {user.is_staff ?
                                <>
                                {user.is_superuser?
                                null
                                :
                                <div className="form-check">
                                <input onClick={e=>{
                                    axios.put(user.url, {
                                        username:user.username,
                                        email:user.email,
                                        is_staff:false
                                    },
                                    {
                                        headers:{
                                            Authorization:`Token ${localStorage.getItem('token')}` //gettng token from localstorage
                                        }
                                    }
                                    )
                                    window.location.reload()
                                    }} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Remove from staff
                                </label>
                                </div>
                                
                                }
                                </>
                                :
                                <div className="form-check">
                                    <input onClick={e=>{
                                        axios.put(user.url, {
                                            username:user.username,
                                            email:user.email,
                                            is_staff:true
                                        },
                                        {
                                            headers:{
                                                Authorization:`Token ${localStorage.getItem('token')}` //gettng token from localstorage
                                            }
                                        }
                                        )
                                        window.location.reload()
                                        }} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        Promote to staff
                                    </label>
                                </div> //here
                            }
                        </td>
                        <td>{user.is_staff? <CheckCircleIcon style={{color:"#007E33"}} />:<CancelIcon style={{color:"#CC0000"}} />}</td>
                        <td>
                            {user.is_superuser?
                            null
                            :
                            <span
                            onClick={e=>{
                                axios.delete(user.url,
                                {
                                    headers:{
                                        Authorization:`Token ${localStorage.getItem('token')}` //gettng token from localstorage
                                    }
                                }
                                )
                                window.location.reload()
                                }}
                            ><DeleteIcon style={{color:"red", cursor:"pointer"}} /></span>
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    )
}

export default Users
