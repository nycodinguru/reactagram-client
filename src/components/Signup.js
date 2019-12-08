import React, { useState } from 'react';
import Reactagram from './svgs/Reactagram';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

export default function Signup(props) {
    const [invalidAction, setInvalidAction] = useState({ attempt: false });
    const [renderWelcomeMessage, setRenderWelcomeMessage] = useState({ render: true });

    const closeWelcomeMessage = () => {
        setTimeout(() => { setRenderWelcomeMessage({ render: false }) }, 400)
    }

    const handleClick = (e) => {
        e.preventDefault()
        setInvalidAction({ attempt: true })
        setTimeout(() => {setInvalidAction({ attempt: false })}, 4200);
    }

    const initReRoute = setTimeout(function(){ 
        props.history.push('/rashad');
    }, 16000);

    const deviceGallery = () => {
        return (
            <div className="Device-gallery">
                <div className="Device-gallery-slideshow"></div>
            </div>
        )
    }

    const welcomeMessage = (cn) => {
        return (
            <React.Fragment>
                <div className={`Welcome-message-container ${cn ? cn : ''}`}>
                    <div className='Close-button' onClick={() => closeWelcomeMessage()}>×</div>
                    <div className='Logo'> </div>
                    <div className='Message-parent'>
                        <h4> Welcome to Reactagram!</h4>
                        <p> While auth is being implemented feel free to browse around. A directory containing a direct link to every profile is linked in the footer, however profiles can also be searched for in the navbar (when not on a mobile device). You'll be redirected shortly...</p>
                    </div>
                    <div className='Form-button' id='Button' onClick={() => closeWelcomeMessage()}>Got It</div>
                </div>
            </React.Fragment>
        )
    }

    const message = () => {
        return (
            <div>
                <center>
                    <p style={{ color: 'red' }}> Sorry this feature isn't available yet.</p>
                </center>
            </div>
        )
    }

    return (
        <React.Fragment>
            <Helmet>
                <meta charSet='utf-8' />
                <title> {props.location.pathname !== '/' ? 'Sign up • Reactagram' : 'Reactagram'}</title>
            </Helmet>
            <div className='Form-container' onLoad={ () => initReRoute()}>
                {
                    props.location.pathname === '/' && deviceGallery()
                }
                {
                    props.location.pathname === '/' && renderWelcomeMessage.render && welcomeMessage()
                }
                <div className='Form-panel-outer'>
                    <form className='Form-panel-upper Form-div'>
                        <h1 className='Form-title'>Reactagram</h1>
                        <Reactagram />
                        <p className='Form-blurb Signup'>Sign up to see photos from your friends.</p>
                        <input type='email' name='' id='' arialabel='email' placeholder='Email' className='Input-field' />
                        <input type='text' arialabel='name' placeholder='Name' className='Input-field' />
                        <input type='text' autoComplete='username' arialabel='username' placeholder='Username' className='Input-field' />
                        <input type='password' placeholder='Password' arialabel='password' autoComplete='current-password' className='Input-field' />
                        <button arialabel='Sign up' className={`Form-button Sign-up ${invalidAction.attempt ? 'Invalid-action' : ''}`} onClick={(e) => handleClick(e)}>Sign Up</button>
                        {
                            invalidAction.attempt ? message() : <p className='Lower-blurb'>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
                        }
                    </form>
                    <div className='Form-panel-lower Form-div'><p>Have an account? </p><Link to="/accounts/login"> Log In</Link></div>
                </div>
            </div>
        </React.Fragment>
    )
}