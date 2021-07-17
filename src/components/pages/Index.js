import React from 'react'
import TopBar from './topbar/TopBar'
import SideBar from './sidebar/SideBar'
import CreateArticle from './CreateArticle'
import Profile from './Profile'
import Gallery from './Gallery'
import EditArticle from './EditArticle'
import Articles from './Articles'
import ArticleDetail from './ArticleDetail'
import Dashboard from './Dashboard';
import Feedback from './Feedback'
import TermsAndConditions from './TermsAndConditions'
import Users from './Users'
import ScrollToTop from '../../ScrollToTop'
import {
    Switch,
    Route,
    useRouteMatch,
    useHistory,
  } from "react-router-dom";

function AdminIndex(props) {
    let { path} = useRouteMatch();
    let history = useHistory();
    const token = localStorage.getItem('token');

    const indexRender = ()=>{
        if(token){
            return (
                <ScrollToTop>
                    <div>
                <TopBar />
                <div className="con">
                    <SideBar />
                    <div style={{flex:"0.8"}} className="others">
                    <Switch>
                        <Route exact path="/control-admin-panel" component={Dashboard} />
                        <Route path={`${path}/add-article`} component={CreateArticle} />
                        <Route path={`${path}/profile`} component={Profile} />
                        <Route path={`${path}/articles`} component={Articles} />
                        <Route path={`${path}/gallery`} component={Gallery} />
                        <Route path={`${path}/termsandconditions`} component={TermsAndConditions} />
                        <Route path={`${path}/feedback`} component={Feedback} />
                        <Route path={`${path}/users`} component={Users} />
                        <Route path={`${path}/termsandconditins`} component={TermsAndConditions} />
                        <Route path={`${path}/:article_id/edit`} component={EditArticle} />
                        <Route path={`${path}/:article_id`} component={ArticleDetail} />
                    </Switch>
                    </div>
                </div>
                </div>
                </ScrollToTop> 
            )
        }
        // redirecting to login page if a user trys to access the above routes but is not authenticated
        if(!token){
            history.push('/');
            // return(
            //     <Redirect 
            //     to={{
            //         pathname:"/login",
            //         state:{
            //             from:props.location
            //         }
            //     }}
            //     />
            // )   
        }
    }
    return (
        <div>
        {indexRender()}
    </div>
    )
}

export default AdminIndex
