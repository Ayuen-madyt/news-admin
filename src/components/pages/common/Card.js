import React from 'react'
function Card({ number, icon, text, bg}) {
    return (
        <div>
        <div className={`${bg} card text-white mr-2`} style={{width: '18rem', display:"flex", flexDirection:"row"}}>
            <div className="card-body">
                <h2 className="ml-5 card-title">{number}</h2>
                <h6 className="card-subtitle mb-2 text-white">{text}</h6>
            </div>  
            {icon}
        </div>  
        </div>
    )
}

export default Card
