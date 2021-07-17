import React,{useState} from 'react'
import './Gallery.css';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import {useSelector} from 'react-redux'
import Pagination from './common/Pagination'

function Gallery() {
    const name = localStorage.getItem('username');
    const userId = localStorage.getItem('userId') 
    const state = useSelector(state=>state.articles);
    // const userArticles = state.filter(article=>article.author===name);

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

    const images = userArticles().map(article=><img key={article.key} alt="showcase" src={article.image}/>);

    // pagination code
    const [currentPage, setCurrentPage] = useState(1) 
    const [postsPerPage] = useState(20)

    //Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = userArticles().slice(indexOfFirstPost, indexOfLastPost)
    const howManyPages = Math.ceil(userArticles().length/postsPerPage)

    // react-alice-carousel
    const responsive = {
        0: { items: 1 },
        568:{items: 1 },
        1024: { items: 2 },
      }

    return (
        <div className="m-3">
            {userArticles().length>0 ? <h2 className="alert bg-dark h4 text-white">Gallery of photos you uploaded</h2> : <p className="ml-5 text-muted">No photos</p>}
            {userArticles().length>0 &&
                <AliceCarousel
                items={images.slice(0,10)}
                responsive={responsive}
                autoPlayInterval={4000}
                autoPlayDirection="ltr"
                autoPlay={true}
                infinite={true}
                fadeOutAnimation={true}
                mouseTrackingEnabled={false}
                disableAutoPlayOnAction={true}
                disableButtonsControls={false}
                disableDotsControls={true}
            />
            }
            <div className="gallery">
                {currentPosts.map(article=>(
                    <div className="mt-2" key={article.id}>
                        <img style={{height:"300px", width:"100%", objectFit:"cover"}} src={article.image} alt="..." />
                    </div>
                ))}
            </div>
            {userArticles().length>0 && 
                <Pagination pages = {howManyPages} setCurrentPage={setCurrentPage}/>
            }
        </div>
    )
}

export default Gallery
