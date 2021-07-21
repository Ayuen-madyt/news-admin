import React from 'react'
import './ArticleDetail.css'
import axios from 'axios'
import {useSelector, useDispatch } from 'react-redux'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import {deleteArticle} from '../../redux/actions'
import {useHistory} from 'react-router-dom';

function ArticleDetail(props) {
    const articleId = props.match.params.article_id;
    const userId = localStorage.getItem('userId') 
    const name = localStorage.getItem('username')
    const state = useSelector(state=>state.articles);

    const users = useSelector(state=>state.users) //getting users from store
    // filtering if a user is staff
    const userIsStaff = ()=>{
        if(users.length>0){
        const user = users.find(user=>user.id==userId); //use two equal signs here for it to work
        return user.is_staff
        }
    }
    // if a user is a staff, return all articles else return articles for a particular user
    const userArticles = ()=>{
        if(userIsStaff()){
            return state
        }
        else{
            return state.filter(article=>article.author===name)
        }
    }

    const article = userArticles().find(article=>article.id===articleId);
    let history = useHistory();
    let dispatch = useDispatch();

    // delete article
    const delete_article = (id)=>{
        dispatch(deleteArticle(id));
        // http://127.0.0.1:8000
        axios.delete(` http://127.0.0.1:8000/articles/article_detail/${id}`, {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>{
            console.log(error.response.data)
        })
        history.push('/control-admin-panel/articles')

    }

    const makeTrending = (id)=>{
        axios.put(`http://127.0.0.1:8000/articles/article_detail/${id}`, {
            trending:true,
            title: article.title,
            category:article.category,
            body:article.body
        },
        {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>{
            console.log(error.response.data)
        })
        history.push('/control-admin-panel/articles')
        window.location.reload()

    }

    const makeFeatured = (id)=>{
        axios.put(` http://127.0.0.1:8000/articles/article_detail/${id}`, {
            featured:true,
            title: article.title,
            category:article.category,
            body:article.body
        },
        {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}`,
            }
        })
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>{
            console.log(error.response.data)
        })
        history.push('/control-admin-panel/articles')
        window.location.reload()

    }
    
    const edit = ()=>{
        history.push(`/control-admin-panel/${articleId}/edit`);
    }

    return (
        <div className="m-4  d-flex">
            <div style={{flex:"0.7"}} >
                <div className="bg-white border" >
                    {article && <h3 className="p-2">{article.title}</h3>}
                    {article && <span style={{marginLeft:"10px"}}><span style={{fontWeight:"bold", fontSize:"12px"}}>By {article.author} ~</span> <span className="text-muted" style={{fontSize:"13px"}}>{article.time_added} ago</span></span>}

                    {article && 
                        <div className="card mt-2 mb-4" style={{border:"0px", maxWidth:"100%", textDecoration:"none",color:"#111"}}>
                        <img style={{objectFit:"cover",  maxWidth:"100%"}} src={article.image} className="card-img-top" alt="..." />
                            <div className="card-body body-content">
                                {<div style={{lineHeight:"30px", fontSize:"14px", color:"#222"}} className="card-text" dangerouslySetInnerHTML={{__html: article.body}} />}
                            </div>
                        </div>
                    }
                </div>
            </div>

            <div style={{flex:"0.3", marginLeft:"20px"}}>
                <div className="stickycomments">
                    <div className="border bg-white p-2">
                        <h2 className="h5 tex-muted">Actions</h2>
                        <hr />
                        <div className="edit d-flex">
                            <EditIcon style={{color:"#4285F4"}}/>
                            <p onClick={()=>edit(article)} style={{cursor:"pointer"}}  className="ml-2">Edit Article</p>
                        </div>
                        <form className="edit d-flex">
                            <DeleteIcon style={{color:"red"}} />
                            <p onClick={()=>delete_article(articleId)} style={{cursor:"pointer"}} className="ml-2">Delete Article</p>
                        </form>
                        {/* only shown if the user is a staff */}
                        {userIsStaff() &&
                            <>
                                <hr />
                                <div className="edit d-flex">
                                    <TrendingUpIcon style={{color:"#00C851"}}/>
                                    <p onClick={()=>makeTrending(articleId)} style={{cursor:"pointer"}}  className="ml-2">Mark as trending</p>
                                </div>
                                <div className="edit d-flex">
                                    <FeaturedPlayListIcon style={{color:"#ffbb33"}}/>
                                    <p onClick={()=>makeFeatured(articleId)} style={{cursor:"pointer"}}  className="ml-2">Mark as featured</p>
                                </div>
                            </>
                        }
                    </div>

                    <div className="mt-3">
                        <li className="list-group-item bg-light h5">Recent comments</li>
                        {article && 
                            <>
                            {article.comments.slice(0,5).map(comment=>(
                                <div className="list-group">
                                <li className="list-group-item">
                                    <p className="h6 text-muted">{comment.name} ~ {comment.email}</p>
                                    <p style={{fontSize:"13px"}}>{comment.comment}</p>
                                </li>
                                </div>
                            ))}
                            </>
                        }
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default ArticleDetail