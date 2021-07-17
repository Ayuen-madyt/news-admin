import React, { useState } from 'react'
import './Articles.css'
import { useSelector } from 'react-redux';
import SearchIcon from '@material-ui/icons/Search'
import {Link} from 'react-router-dom';
import Pagination from './common/Pagination';

function Articles() {
    const name = localStorage.getItem('username')
    const userId = localStorage.getItem('userId') 
    const allArticles = useSelector(state=>state.articles); //getting articles from redux state
    const users = useSelector(state=>state.users) //getting users from store
    // filtering if a user is staff
    const userIsStaff = ()=>{
        if(users.length>0){
        const user = users.find(user=>user.id==userId);
        return user.is_staff
        }
    }

    const userArticles = ()=>{
        if(userIsStaff()){
            return allArticles
        }
        else{
            return allArticles.filter(article=>article.author===name) //filtering articles according to author or name of the user
        }
    }

    // search funcationality
    const[input, setInput] = useState('');
    const[searchResults, setSearchResults] = useState([]);

    // implementing search functionality
    const searchHandler = (e)=>{
        setInput(e.target.value);
        if(userArticles().length>0){
            const newArticles = userArticles().filter(article=>{
                return Object.values(article).join(" ").toLowerCase().includes(input.toLowerCase())
            });
            setSearchResults(newArticles);
        }
        else{
            setSearchResults(userArticles());
        }
    }
   
    // pagination code
    const [currentPage, setCurrentPage] = useState(1) 
    const [postsPerPage] = useState(40)

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userArticles().slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(userArticles().length/postsPerPage)
    
    return (
        <div style={{margin:"20px"}}>
            {userArticles().length>0?
             <>
            <div className="mt-3 searcharticles border">
                <input value={input} onChange={searchHandler} style={{flex:"0.9", margin:"20px", border:"none"}} type="text" placeholder="Search Articles" />
                <SearchIcon className="text-muted" style={{flex:"0.1", marginTop:"20px", fontSize:"25px"}} />
            </div>

            <table className="table mt-3 bg-white">
                <thead>
                    <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Time Added</th>
                    </tr>
                </thead>
                <tbody>
                    {searchResults.length < 1? 
                        <>
                        {currentPosts.map(article=>(
                            <tr key={article.id}>
                                <td><img style={{height:"50px", width:"80px", objectFit:"cover"}} src={article.image} src={article.image} alt="..." /></td>
                                <td><Link to={`/control-admin-panel/${article.id}`} onClick={()=>localStorage.setItem("articleId", article.id)} style={{textDecoration:"none", color:"#555"}} >{article.title}</Link></td>
                                <td className="text-muted">{article.time_added}</td>
                            </tr>
                        ))}
                        </>
                        :
                        <>
                        {searchResults.map(article=>(
                            <tr key={article.id}>
                            <td><img alt="..." style={{height:"50px", width:"80px", objectFit:"cover"}} src={article.image} src={article.image} /></td>
                            <td><Link to={`/control-admin-panel/${article.id}`} onClick={()=>localStorage.setItem("articleId", article.id)} style={{textDecoration:"none", color:"#555"}} >{article.title}</Link></td>
                            <td className="text-muted">{article.time_added}</td>
                        </tr>
                        ))}
                        </>
                    }
                </tbody>
            </table>
            <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
            </>
            :
            <p className="h6 text-muted ml-5">No articles</p>
            }

        </div>
    )
}

export default Articles
