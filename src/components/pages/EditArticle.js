import React, {useState} from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditArticle() {
    const articleId = localStorage.getItem('articleId') //getting article id from localstorage
    const name = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    const state = useSelector(state=>state.articles); //getting articles from redux state
    // const userArticles = state.filter(article=>article.author===name); //filtering articles according to each user who wrote them
    
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
    const article = userArticles().find(article=>article.id===articleId); //filtering user articles for article that match articleId

    const[title, setTitle] = useState(article && article.title);
    const[category, setCategory] = useState(article && article.category);
    const[body, setBody] = useState(article && article.body);  
    let history = useHistory();

    const formData = new FormData();
    
    formData.append("title", title);
    formData.append("category", category);
    formData.append("body", body);

    function sendData(e){
        e.preventDefault();
        // http://127.0.0.1:8000
        axios.put(`/articles/${articleId}/`, formData, {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}` //getting token from localstorage
            }
        })
        .then(
            //res=>console.log(res.data.updatedAt)
        )
        .catch(
            //err=>console.log(err.response.data)
        )
        setTitle('');
        setCategory('')
        setBody('')
        history.push('/control-admin-panel/articles') //sending user to articles pages after posting article successfully
        window.location.reload(); //reloading the articles pages to reflect the latest articles published
    }

    return (
        <div className="m-4">
            <div className="bg-primary text-white p-2">
                <h2 className="h5">Edit Article</h2>
            </div>
            <div className="bg-white p-3 border">
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                    <input value={title} onChange={e=>setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title here" required />
                </div>
                
                <select value={category} onChange={e=>setCategory(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example" required>
                    <option>NEWS</option>
                    <option>ENTERTAINMENT</option>
                    {/* <option>POLITICS</option> */}
                    <option>SPORTS</option>
                    <option>LIFESTYLE</option>
                    <option>TECHNOLOGY</option>
                    <option>BUSINESS</option>
                    <option>FASHION</option>
                </select>

                <div className="mb-3 mt-3">
                    <CKEditor
                        data={body}
                        editor={ClassicEditor}
                        onReady={ editor=>{
                           //initializes 
                        }}
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            setBody(data) //setting ckedior body content to body
                        } }
                     />
                </div>
                <button onClick={sendData} className="btn btn-primary">Update</button>
            </form>
            </div>
        </div>
    )
}

export default EditArticle
