import "./SideBar.css";
import CreateIcon from '@material-ui/icons/Create';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PhotoIcon from '@material-ui/icons/Photo';
import GroupIcon from '@material-ui/icons/Group';
import { useSelector } from "react-redux";
import {
  LineStyle,
  MailOutline,
  DynamicFeed,
  WorkOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const userId = localStorage.getItem('userId') 
  const users = useSelector(state=>state.users)
  const userIsSuperUser = ()=>{
    if(users.length>0){
      const user = users.find(user=>user.id==userId);
      return user.is_superuser
    }
  }

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link style={{textDecoration:"none"}} to="/control-admin-panel" className="text-white link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to ="/control-admin-panel/add-article" style={{textDecoration:"none", color:"white"}} className="text-white sidebarListItem">
              <CreateIcon className="sidebarIcon" />
              Add article
            </Link>
            <a href="/control-admin-panel/articles" style={{textDecoration:"none"}}  className="text-white sidebarListItem">
              <ListAltIcon className="sidebarIcon" />
              Your articles
            </a>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            
            <Link style={{textDecoration:"none"}} to="/control-admin-panel/gallery" className="text-white link">
              <li className="sidebarListItem">
                <PhotoIcon className="sidebarIcon" />
                Gallery
              </li>
            </Link>
            {/* only shown if the user is a SuperUser */}
            {userIsSuperUser() &&
              <Link style={{textDecoration:"none"}} to="/control-admin-panel/users" className="sidebarListItem text-white">
                <GroupIcon className="sidebarIcon" />
                Users
            </Link>
            }
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Reach Out</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <Link style={{textDecoration:"none"}} to="/control-admin-panel/feedback" className="text-white sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Extras</h3>
          <ul className="sidebarList">
          <Link style={{textDecoration:"none"}} to="/control-admin-panel/termsandconditions" className="text-white sidebarListItem">
              <WorkOutline className="sidebarIcon" />
              Terms & Conditions
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}