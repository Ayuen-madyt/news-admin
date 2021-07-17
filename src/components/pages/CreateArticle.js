import React, {useState} from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function CreateArticle() {
    const[title, setTitle] = useState('');
    const[image, setImage] = useState('');
    const[category, setCategory] = useState('');
    const[featured, setFeatured] = useState(null);
    const[trending, setTrending] = useState(null);
    const[body, setBody] = useState(''); 
    let history = useHistory();

    const formData = new FormData();

    formData.append("title", title);
    formData.append("image", image);
    formData.append("category", category);
    formData.append("featured", featured);
    formData.append("trending", trending);
    formData.append("body", body);

    function sendData(e){
        e.preventDefault();
        // http://127.0.0.1:8000
        axios.post(' http://127.0.0.1:8000/articles/', formData, {
            headers:{
                Authorization:`Token ${localStorage.getItem('token')}` //gettng token from localstorage
            }
        })
        .then(res=>{
            setTitle('');
            setCategory('')
            setImage('')
            setFeatured(null)
            setTrending(null)
            setBody('')
        })
        .catch(err=>console.log(err.response.data))

        history.push('/control-admin-panel/articles') //directing a user to articles after successfully posting article
        window.location.reload();
    }

    return (
        <div className="m-4"> 
            <div className="bg-primary text-white p-2">
                <h2 className="h5">Add an article</h2>
            </div>
            <div className="bg-white p-3 border">
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
                        <input value={title} onChange={e=>setTitle(e.target.value)} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title here" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image_id" className="form-label">Upload an image</label>
                        <input onChange={e=>setImage(e.target.files[0])} type="file" className="form-control" id="image_id" required />
                    </div>
                    <select value={category} onChange={e=>setCategory(e.target.value)} className="form-select form-select-lg" aria-label=".form-select-lg example" required>
                        <option defaultValue>Select category</option>
                        <option>NEWS</option>
                        <option>ENTERTAINMENT</option>
                        {/* <option>POLITICS</option> */}
                        <option>SPORTS</option>
                        <option>LIFESTYLE</option>
                        <option>TECHNOLOGY</option>
                        <option>BUSINESS</option>
                        <option>FASHION</option>
                    </select>

                    <div className="border mt-3 p-2">
                        <div className="form-check">
                            <input value={featured} onChange={e=>setFeatured(true)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Featured
                            </label>
                        </div>
                        <div className="form-check">
                            <input value={featured} onChange={e=>setFeatured(false)} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" required />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Not Featured
                            </label>
                        </div>
                        <p style={{fontSize:"13px"}} className="text-muted mb-0"><strong>N/B: </strong>Always mark <strong>Not Featured</strong> 
                        unless the article is of importance and affects most people.
                        you can only mark one choice, not both.
                        </p>
                    </div>
                    
                    <div className="border mt-3 p-2">
                        <div className="form-check">
                            <input value={trending} onChange={e=>setTrending(true)} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" required />
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                                Trending
                            </label>
                        </div>
                        <div className="form-check">
                            <input value={trending} onChange={e=>setTrending(false)} className="form-check-input" type="checkbox" defaultValue id="flexCheckDefault" required />
                            <label className="form-check-label" htmlFor="flexCheckChecked">
                            Not Trending
                            </label>
                        </div>
                        <p style={{fontSize:"13px"}} className="text-muted mb-0"><strong>N/B: </strong>Mark <strong>Trending</strong> if the topic is currently trending on the internet or 
                        is being talked about by many people other wise mark <strong>Not Trending.</strong> you can only mark one choice, not both.
                        </p>
                    </div>

                    <div className="mb-3 mt-3">
                        <CKEditor
                            editor={ClassicEditor}
                            onReady={ editor=>{
                            //initializes 
                            }}
                            onChange={ ( event, editor ) => {
                                const data = editor.getData();
                                setBody(data) //setting body to the ckeditor's content
                            } }
                        />
                    </div>
                    <button onClick={sendData} className="btn btn-primary">Publish</button>
                </form>
            </div>
        </div>
    )
}

export default CreateArticle
