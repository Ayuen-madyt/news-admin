import React from 'react'

function CheckEmail() {
    return (
        <div className="container">
            {<img style={{height:"90px", objectFit:"contain"}} alt="..." src={process.env.PUBLIC_URL + '/logo3.webp'} />}
            <div class="alert alert-info" role="alert">
            <p>check your email for signup confirmation</p>
            </div>
        </div>
    )
}

export default CheckEmail
