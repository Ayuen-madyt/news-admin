import React from 'react';
import Card from './common/Card.js';
import RecentArticles from './common/RecentArticles.js';
import SampleCalendar from './common/SampleCalendar.js';
import {useSelector} from 'react-redux';
import ListAltIcon from '@material-ui/icons/ListAlt';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";

function Dashboard() {
    const name = localStorage.getItem('username')
    const state = useSelector(state=>state.articles); //gettng articles from redux
    const userArticles = state.filter(article=>article.author===name); //filtering articles by author name
    const featuredArticles = userArticles.filter(article=>article.featured===true);
    const trendingArticles = userArticles.filter(article=>article.trending===true);

    const images = userArticles.map(article=><img key={article.key} alt="showcase" src={article.image}/>); //getting images from articles to be shown as a slide show by reactalicecarousel

    //ReactAlicecarousel settings
    const responsive = {
        0: { items: 1 },
        568:{items: 1 },
        1024: { items: 2 },
      }

    return (
        <div className="m-4">
            <div className="alert bg-dark text-white h4 border">
                Dashboard
            </div>
            {/* css of AliceCarousel coming from gallery.css */}
            {userArticles.length>0 &&
                <div>
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
                <p style={{marginTop:"-20px", index:"1000 !important"}} className="text-muted">view more photos in gallery</p>
                </div>
            }
            <div style={{justifyContent:"space-between"}} className="d-flex">
                <Card  icon={<ListAltIcon style={{fontSize:"50px"}} className="mr-3 mt-4"/>} bg="bg-info" number={userArticles.length} text="Total Articles Written"/>
                <Card  icon={<FeaturedPlayListIcon style={{fontSize:"50px"}} className="mr-3 mt-4" />} bg="bg-danger" number={featuredArticles.length} text="Articles featured"/>
                <Card  icon={<TrendingUpIcon style={{fontSize:"50px"}} className="mr-3 mt-4"/>} bg="bg-success" number={trendingArticles.length} text="Articles set as trending"/>
            </div>
            <div className="d-flex mt-3">
                <RecentArticles articles={userArticles.slice(0,5)} />
                <div style={{flex:"0.4", marginLeft:"20px"}}>
                    <SampleCalendar articles={userArticles} /> 
                </div>
            </div>
        </div>
    )
}

export default Dashboard