import React from 'react'
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

function Feedback() {
    return (
        <div className="m-3 p-2">
            <p className="h4 border-bottom">Feedback</p>
            <div className="bg-white p-2 border">
                <p className="h6">We value your feedback!</p>
                <p className="text-muted">Novas 101 being a news and content provider website, we highly recommend any feedback from our beloved users.
                    In order to continue to provide quality website, we will be pleased to get your opinion and view about what you think
                    should be done, improved or added to the website. For example if a certain feature is missing from the website which you think
                    should be added, do not hesitate to write to us about it. We will quickly add the feature right away.
                </p>
                <p className="text-muted">We strongly believe that by taking feedback and opinions from our users into consideration, we will greatly enhance the quality
                    of the site and also it will help us achieve Novas 101 goals which are the reasons for it very existance. To be able to send your
                    feedback to us, please write to us through the following contact info;
                </p>
                <div style={{lineHeight:"20px"}}>
                    <div className="d-flex">
                        <span className="d-flex mr-2"><EmailIcon /> <p className="ml-2">Email:</p></span>
                        <a href="mailto:south101.info@gmail.com">novas101@gmail.com</a>
                    </div>
                    <div className="d-flex">
                        <span className="d-flex mr-2"><PhoneIcon /> <p className="ml-2">Phone:</p></span>
                        <p>+254715238483</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback
