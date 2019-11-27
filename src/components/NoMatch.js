import React from 'react';
import ReactagramSVG from './svgs/Reactagram';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function NoMatch(props) {
    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Page  Not Found • Reactagram</title>
            </Helmet>
            <div className='Navbar-container Not-Found'>
            <div className={`Navbar-inner`} >
                    <Link to='/'>
                        <div className='Logo-div'>
                            <div className='Logo' ></div>
                            <div className='Vr' ></div>
                            <ReactagramSVG />
                        </div>
                    </Link>
                <div className='Buttons-div' style={{width: 'max-content'}}>
                    <div className='Login-button Button Not-Found'><Link to="/accounts/login">Log In</Link></div>
                </div>
            </div>
            </div>
            <div style={{textAlign: 'center', width: '80%', margin: '130px auto', minHeight: 'calc(100vh - 356px)'}}>
                <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '25px 0'}}>Sorry, this page isn't available.</p> 
                <p>The link you followed may be broken, or the page may have been removed. <Link to="/" style={{color: '#003569'}}>Go back to Reactagram.</Link></p>
            </div>
        </React.Fragment>
    )
}
