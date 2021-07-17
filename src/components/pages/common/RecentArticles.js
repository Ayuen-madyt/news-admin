import React from 'react'
import {Link} from 'react-router-dom'

function RecentArticles({articles}) {
    return (
        <div style={{flex:"0.6"}}>
            {articles.length>0 && 
                <div style={{backgroundColor:"white", borderRadius:"5px"}} className="border">
                <li className="list-group-item bg-light h5">Recent Articles</li>
                {articles.map((article,index)=>(
                    <Link style={{textDecoration:"none"}} to={`/control-admin-panel/${article.id}`} key={article.id} className="list-group">
                        <li className="list-group-item d-flex">
                            <img style={{height:"50px", width:"80px", objectFit:"cover", marginRight:"10px"}} src={article.image} alt="..."/>
                            {article.title}
                        </li>
                    </Link>
                ))}
            </div>
            }
        </div>
    )
}

export default RecentArticles
